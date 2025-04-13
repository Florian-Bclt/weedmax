import { ProductUpdateData } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateProduct = async (id: string, data: ProductUpdateData) => {
  try {
    const formattedSpecs = data.specs?.map(spec => `${spec.key}: ${spec.value}`);
    const formattedImages = data.images?.map(img => ({ url: img.url, public_id: img.public_id }));

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        images: formattedImages,
        specs: formattedSpecs,
        description: data.description,
        stock: data.stock,
        categoryId: data.categoryId,
        isNew: data.isNew ?? undefined,
        isPromo: data.isPromo ?? undefined,
        promoPercentage: data.promoPercentage ?? undefined,
        rating: data.rating ?? undefined,
        reviewCount: data.reviewCount ?? undefined,
        variants: {
          deleteMany: {},
          create: data.variants?.map(v => ({ quantity: v.quantity, price: v.price })) || [],
        },
      },
      include: {
        variants: true,
        category: true
      },
    });

    return updatedProduct;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    throw new Error("Impossible de mettre à jour le produit.");
  }
};
