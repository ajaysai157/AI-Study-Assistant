import prisma from "../../config/prisma.js";

export async function uploadNote(data) {
  return await prisma.note.create({
    data,
    select: {
      id: true,
      title: true,
      originalFileName: true,
      fileType: true,
      fileSize: true,
      status: true,
      createdAt: true,
    },
  });
}

export async function getAllNotes(userId, search) {
  const where = { userId };
  if (search) {
    where.title = { contains: search, mode: "insensitive" };
  }
  return await prisma.note.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      originalFileName: true,
      fileType: true,
      fileSize: true,
      pageCount: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getNoteById(id, userId) {
  return await prisma.note.findFirst({
    where: {
      id,
      userId,
    },
  });
}

export async function updateNoteTitle(id, title) {
  return await prisma.note.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });
}

export async function deleteNote(id) {
  return await prisma.note.delete({
    where: {
      id,
    },
  });
}

export async function updateExtractedText(
  id,
  extractedText,
  pageCount,
  status,
  summary = null
) {
  return await prisma.note.update({
    where: {
      id,
    },
    data: {
      extractedText,
      pageCount,
      status,
      summary,
    },
  });
}