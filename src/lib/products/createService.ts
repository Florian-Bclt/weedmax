import { ProductData } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (productData: ProductData) => {
  try {
    const { name, images, specs, description, stock, variants, categoryId, isNew, isPromo, promoPercentage, rating, reviewCount} = productData;

    if (!categoryId) {
      throw new Error("La catégorie est obligatoire")
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      throw new Error("Les images sont obligatoires");
    }

    if (!variants || !Array.isArray(variants) || variants.length === 0) {
      throw new Error('Au moins une variante (quantité/prix) est requise.')
    }

    const formattedSpecs = specs.map(spec => `${spec.key}: ${spec.value}`);

    const newProduct = await prisma.product.create({
      data: {
        name,
        images: images.map((img) => ({url: img.url, public_id: img.public_id})),
        specs: formattedSpecs,
        description,
        stock,
        isNew: isNew ?? null,
        isPromo: isPromo ?? null,
        promoPercentage: promoPercentage ?? null,
        rating: rating ?? null,
        reviewCount: reviewCount ?? null,
        category: { connect: {id: categoryId} },
        variants: {
          create: variants.map(v => ({
            quantity: v.quantity,
            price: v.price
          }))
        }
      },
      include: {
        variants: true,
        category: true,
      }
    });

    return newProduct;
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    throw new Error("Impossible de créer le produit");
  }
};
