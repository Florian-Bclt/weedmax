import { PrismaClient } from "@prisma/client";
import slugify from "slugify"

const prisma = new PrismaClient();

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
};

export const getCategoryById = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
  });
};

export const createCategory = async (name: string) => {
  const slug = slugify(name, { lower: true, strict: true })
  return await prisma.category.create({
    data: { name, slug },
  });
};

export const updateCategory = async (id: string, name: string) => {
  const slug = slugify(name, { lower: true, strict: true });
  return await prisma.category.update({
    where: { id },
    data: { name, slug },
  });
};

export const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  });
};
