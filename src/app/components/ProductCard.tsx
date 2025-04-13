"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductWithVariants } from "@/types";
import { Star } from "lucide-react";
import { BiSolidBadge } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import RatingModal from "./RatingModal";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {
  product: ProductWithVariants;
};

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [localRating, setLocalRating] = useState<number | null>(product.rating || null);
  const [localReviewCount, setLocalReviewCount] = useState<number>(product.reviewCount || 0);

  
  // Gestion des images
  const imageUrl =
    Array.isArray(product.images) && typeof product.images[0] === "object" && "url" in product.images[0]
      ? (product.images[0] as { url: string }).url
      : "/images/logo.jpg";


  // Logique pour le panier
  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addToCart({
      id: product.id,
      name: product.name,
      image: imageUrl,
      quantity: 1,
      variantId: selectedVariant.id,
      variantQuantity: selectedVariant.quantity,
      price: Number(selectedVariant.price),
      promoPercentage: product.isPromo ? product.promoPercentage || 0 : 0,
    })
  }

  // Logique d'affichage des unités en fonction du produit
  const getUnit = () => {
    const cat = product.category?.name?.toLowerCase() || "";
    if (cat.includes("huile")) return "ml";
    if (cat.includes("vape")) return null; // pas d'unité
    return "g";
  }

  const unit = getUnit();

  // Logique d'avis produits
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Fonction à appeler quand l’utilisateur clique sur une étoile
  const handleRatingClick = async (rating: number) => {
    const alreadyReviewed = localStorage.getItem(`reviewed_${product.id}`);
    if (alreadyReviewed) {
      toast.error("Vous avez déjà noté ce produit.")
      return;
    }
    setSelectedRating(rating);
    setShowRatingModal(true);
  };


  return (
    <div className="bg-white text-gray-600 p-4 rounded-lg shadow-lg border-none text-center">
      <Link href={`/products/details/${product.id}`} className="block" prefetch={false}>
        <div className="relative w-full h-48 rounded overflow-hidden">

          {/* Badge dynamique */}
          {product.isNew && (
            <span className="absolute top-6 -right-10 bg-red-500 text-white text-xs font-bold px-12 py-1 transform rotate-45 shadow-md z-10">
              Nouveau
            </span>
          )}
          {product.isPromo && (
            <span className="absolute top-6 -right-10 bg-red-500 text-white text-xs font-bold px-12 py-1 transform rotate-45 shadow-md z-10">
              Promo
            </span>
          )}

          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        <h3 className="text-xl font-semibold mt-3 min-h-16 flex justify-center items-center">{product.name}</h3>
      </Link>

      {/* Prix */}
      <div className="text-red-400 mt-2 font-semibold">
        {product.isPromo && product.promoPercentage ? (
          <div className="flex justify-center items-center">
            <span className="line-through text-gray-400 mr-2">
              {Number(selectedVariant.price).toFixed(2)} €
            </span>
            <div className="flex items-center">
              <span>
                {(
                  Number(selectedVariant.price) -
                  (Number(selectedVariant.price) * product.promoPercentage) / 100
                ).toFixed(2)} €
              </span>
              <div className="relative w-9 h-6 ml-1 flex items-center justify-center">
                <BiSolidBadge className="w-9 h-9 text-red-500" />
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">
                  -{product.promoPercentage}%
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">{Number(selectedVariant.price).toFixed(2)} €</div>
        )}
      </div>

      {/* Rating */}
      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => {
            const starIndex = i + 1;
            const isFilled = hoveredRating !== null
              ? starIndex <= hoveredRating
              : starIndex <= (selectedRating || localRating || 0);

            return (
              <Star
                key={i}
                size={18}
                className="cursor-pointer transition"
                fill={isFilled ? "#facc15" : "none"}
                stroke="#facc15"
                onMouseEnter={() => setHoveredRating(starIndex)}
                onMouseLeave={() => setHoveredRating(null)}
                onClick={() => handleRatingClick(starIndex)}
              />
            );
          })}
          <span className="text-sm text-gray-500 ml-2">
            ({localReviewCount || 0} avis)
          </span>
        </div>
      </div>

      {/* Variants */}
      <div className="flex justify-between items-center gap-2 mt-6">
        <select
          className="text-gray-800 w-full p-2 rounded border text-sm" 
          value={selectedVariant?.quantity}
          onChange={(e) => setSelectedVariant(
            product.variants.find(v => v.quantity === Number(e.target.value))!
          )}
        >
          {product.variants.map((variant) => (
            <option key={variant.id} value={variant.quantity}>
                {unit ? `${variant.quantity} ${unit} - ` : ""}
                {product.isPromo && product.promoPercentage
                  ? (Number(variant.price) - (Number(variant.price) * product.promoPercentage) / 100).toFixed(2)
                  : Number(variant.price).toFixed(2)} €
            </option>
          ))}
        </select>
        <button 
          className="px-6 py-3 bg-red-500 cursor-pointer text-white rounded-lg hover:scale-105 transition"
          onClick={handleAddToCart}
        >
          <FaCartPlus size={18}/>
        </button>
      </div>
      {showRatingModal && (
        <RatingModal
          productId={product.id}
          initialRating={selectedRating}
          onClose={() => setShowRatingModal(false)}
          onReviewSubmitted={(newRating, newCount) => {
            setLocalRating(newRating);
            setLocalReviewCount(newCount);
          }}
        />
      )}
    </div>
  );
};

export default ProductCard;
