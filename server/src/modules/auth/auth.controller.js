import { registerUser, loginUser, getCurrentUser, updateCurrentUser } from "./auth.service.js";
import { validateRegister, validateLogin } from "./auth.validation.js";
import { ApiError } from "../../utils/ApiError.js";

export async function register(req, res, next) {
  try {
    const errors = validateRegister(req.body);
    if (errors.length > 0) {
      throw new ApiError(400, errors.join(" "));
    }

    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const errors = validateLogin(req.body);
    if (errors.length > 0) {
      throw new ApiError(400, errors.join(" "));
    }

    const data = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await getCurrentUser(req.user.userId);
    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateMe(req, res, next) {
  try {
    const user = await updateCurrentUser(req.user.userId, req.body);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
