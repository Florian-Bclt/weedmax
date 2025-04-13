"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import SpinnerButtons from "@/app/components/SpinnerButtons/SpinnerButtons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageUploader from "@/app/dashboard/admin/components/ImageUploader";
import { UploadedImage } from "@/types";

const CreateProductPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    description: "",
    categoryId: "",
    isNew: false,
    isPromo: false,
    promoPercentage: "",
    rating: "",
    reviewCount: "",
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur chargement catégories :", error)
      }
    }
    fetchCategories();
  }, [])

  const [specs, setSpecs] = useState([
    { key: "Variété", value: "" },
    { key: "Taux CBD", value: "" },
    { key: "Taux THC", value: "" },
  ]);

  const [variants, setVariants] = useState([{ quantity: "1", price: "0" }]);

  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    const updatedSpecs = [...specs];
    updatedSpecs[index][field] = value;
    setSpecs(updatedSpecs);
  };

  const handleVariantChange = (index: number, field: "quantity" | "price", value: string) => {
    const updated = [...variants];
    // const parsed = field === "quantity" ? parseInt(value, 10) : parseFloat(value);
    updated[index][field] = value;
    setVariants(updated);
  };

  const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));

  const addVariant = () => setVariants([...variants, { quantity: "", price: "" }]);
  const removeVariant = (index: number) => setVariants(variants.filter((_, i) => i !== index));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createProduct = async () => {
    setLoading(true);
    try {
      if (!images.length) throw new Error("Aucune image n'a été uploadée");

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          stock: parseInt(formData.stock, 10),
          promoPercentage: formData.isPromo ? parseFloat(formData.promoPercentage) : null,
          rating: formData.rating ? parseFloat(formData.rating) : null,
          reviewCount: formData.reviewCount ? parseInt(formData.reviewCount, 10) : null,
          images,
          specs: specs.filter((spec) => spec.key && spec.value),
          variants: variants
            .filter((v) => v.quantity && v.price)
            .map((v) => ({
              quantity: parseInt(v.quantity, 10),
              price: parseFloat(v.price.replace(',', '.'))
            }))
            // Vérifie que les prix et la quantité sont bien des nombres valides
            .filter((v) => !isNaN(v.quantity) && !isNaN(v.price))
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");
      router.push("/dashboard/admin/products");
    } catch (error) {
      console.error("Erreur lors de la création :", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-2">Ajouter un produit</h2>

      <div className="mt-4">
        <label className="block mb-1 font-semibold">Catégorie</label>
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        >
          <option value="">-- Sélectionnez une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nom du produit"
        className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
      />

      <input
        type="text"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock disponible"
        className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description du produit"
        className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
      />

      <div className="flex items-center gap-8 mt-4">
      <div className="flex items-center gap-3">
        <label className="font-semibold">Nouveau produit</label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isNew}
            onChange={(e) =>
              setFormData({ ...formData, isNew: e.target.checked })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-500 transition-colors duration-300"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300"></div>
        </label>
      </div>

        {/* En promotion */}
        <div className="flex items-center gap-3">
          <label className="font-semibold">En promotion</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPromo}
              onChange={(e) =>
                setFormData({ ...formData, isPromo: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-500 transition-colors duration-300"></div>
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300"></div>
          </label>
        </div>

        <input
          type="text"
          inputMode="decimal"
          name="promoPercentage"
          id="promoPercentage"
          placeholder="% de réduction"
          value={formData.promoPercentage || ""}
          onChange={(e) => setFormData({...formData, promoPercentage: e.target.value.replace(',', '.') })}
          disabled={!formData.isPromo}
          className={`p-2 rounded bg-gray-800 border ${
            formData.isPromo ? "border-green-500" : "border-gray-700 opacity-50"
          } w-[180px]`}
        />
      </div>

      <div className="mt-4">
        <ImageUploader onUploadComplete={(uploaded) => setImages(uploaded)} />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {images.map((img, i) => (
              <div key={i} className="w-20 h-20 relative border border-gray-600 rounded overflow-hidden">
                <Image
                  src={img.url}
                  alt={`Image ${i}`}
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Specs */}
      <h3 className="text-lg font-semibold mt-4">Spécifications :</h3>
      {specs.map((spec, index) => (
        <div key={index} className="flex gap-2 items-center mt-2">
          <input
            type="text"
            placeholder="Clé (ex: Variété)"
            value={spec.key}
            onChange={(e) => handleSpecChange(index, "key", e.target.value)}
            className="w-1/3 p-2 rounded bg-gray-800 border border-gray-600"
          />
          <input
            type="text"
            placeholder="Valeur (ex: Amnesia, 15%)"
            value={spec.value}
            onChange={(e) => handleSpecChange(index, "value", e.target.value)}
            className="w-2/3 p-2 rounded bg-gray-800 border border-gray-600"
          />
          <button onClick={() => removeSpec(index)} className="text-red-400 hover:text-red-600">
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      <button onClick={addSpec} className="flex items-center gap-2 mt-3 text-blue-400 hover:text-blue-600">
        <PlusCircle size={20} /> Ajouter une spécification
      </button>

      {/* Variants */}
      <h3 className="text-lg font-semibold mt-4">Variantes (quantité/prix) :</h3>
      {variants.map((variant, index) => (
        <div key={index} className="flex gap-4 items-center mt-2">
          <input
            type="number"
            placeholder="Quantité (ex: 1g)"
            value={variant.quantity}
            onChange={(e) => handleVariantChange(index, "quantity", e.target.value)}
            className="w-1/2 p-2 rounded bg-gray-800 border border-gray-600"
          />
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            placeholder="Prix en €"
            value={variant.price}
            onChange={(e) => handleVariantChange(index, "price", e.target.value)}
            className="w-1/2 p-2 rounded bg-gray-800 border border-gray-600"
          />
          <button onClick={() => removeVariant(index)} className="text-red-400 hover:text-red-600">
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      <button onClick={addVariant} className="flex items-center gap-2 mt-3 text-blue-400 hover:text-blue-600">
        <PlusCircle size={20} /> Ajouter une variante
      </button>

      <div className="flex mt-6">
      <button 
          onClick={() => router.push("/dashboard/admin/products")}
          className="mt-6 mr-4 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded"
        >
          Annuler
        </button>

        <button onClick={createProduct} className="mt-6 bg-green-500 px-5 py-2 rounded" disabled={loading}>
          {loading ? <SpinnerButtons /> : "Créer le produit"}
        </button>
      </div>
    </div>
  );
};

export default CreateProductPage;
