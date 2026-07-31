import prisma from "../../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../../utils/ApiError.js";
import { config } from "../../config/env.js";

export async function getCurrentUser(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      language: true,
      timezone: true,
      notificationsEnabled: true,
      studyPreferences: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
}

export async function registerUser(userData) {
  const { name, email, password } = userData;
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = name.trim();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
}

export async function loginUser({ email, password }) {
  if (!config.jwtSecret) {
    throw new ApiError(500, "Authentication is not configured.");
  }

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      language: user.language,
      timezone: user.timezone,
      notificationsEnabled: user.notificationsEnabled,
      studyPreferences: user.studyPreferences,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
}

export async function updateCurrentUser(userId, data) {
  const updates = {};

  if (typeof data?.name === "string") {
    const name = data.name.trim();
    if (!name) throw new ApiError(400, "Name is required.");
    updates.name = name;
  }

  if (typeof data?.email === "string") {
    const email = data.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ApiError(400, "Invalid email format.");
    }

    const existingUser = await prisma.user.findFirst({
      where: { email, NOT: { id: userId } },
    });

    if (existingUser) {
      throw new ApiError(409, "An account with this email already exists.");
    }

    updates.email = email;
  }

  if (typeof data?.language === "string") {
    updates.language = data.language;
  }

  if (typeof data?.timezone === "string") {
    updates.timezone = data.timezone;
  }

  if (typeof data?.notificationsEnabled === "boolean") {
    updates.notificationsEnabled = data.notificationsEnabled;
  }

  if (data?.studyPreferences && typeof data.studyPreferences === "object") {
    updates.studyPreferences = data.studyPreferences;
  }

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "No valid profile fields were provided.");
  }

  return prisma.user.update({
    where: { id: userId },
    data: updates,
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      language: true,
      timezone: true,
      notificationsEnabled: true,
      studyPreferences: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
