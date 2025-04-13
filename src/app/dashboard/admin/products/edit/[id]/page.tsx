"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ImageUploader from "@/app/dashboard/admin/components/ImageUploader";
import { UploadedImage } from "@/types";
import SpinnerButtons from "@/app/components/SpinnerButtons/SpinnerButtons";
import { PlusCircle, Trash2 } from "lucide-react";

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    images: [] as UploadedImage[],
    specs: [] as { key: string; value: string }[],
    description: "",
    stock: "",
    categoryId: "",
    variants: [] as { quantity: string; price: string }[],
    isPromo: false,
    isNew: false,
    promoPercentage: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        setFormData({
          name: data.name,
          images: Array.isArray(data.images) ? data.images : [],
          specs: data.specs?.map((spec: string) => {
            const [key, ...rest] = spec.split(":");
            return { key: key.trim(), value: rest.join(":").trim() };
          }) || [],
          description: data.description,
          stock: data.stock.toString(),
          categoryId: data.categoryId || "",
          variants: data.variants?.map((v: any) => ({
            quantity: v.quantity.toString(),
            price: v.price.toString(),
          })) || [],
          isNew: data.isNew ?? false,
          isPromo: data.isPromo ?? false,
          promoPercentage: data.promoPercentage?.toString() ?? "",
        });
      } catch (err) {
        console.error("Erreur lors du chargement du produit", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const cats = await res.json();
      setCategories(cats);
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    const updatedSpecs = [...formData.specs];
    updatedSpecs[index][field] = value;
    setFormData((prev) => ({ ...prev, specs: updatedSpecs }));
  };

  const handleVariantChange = (index: number, field: "quantity" | "price", value: string) => {
    const updated = [...formData.variants];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, variants: updated }));
  };

  const addSpec = () => {
    setFormData((prev) => ({
      ...prev,
      specs: [...prev.specs, { key: "", value: "" }],
    }));
  };

  const removeSpec = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { quantity: "", price: "" }],
    }));
  };

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formattedSpecs = formData.specs
        .filter((s) => s.key && s.value)
        .map((s) => `${s.key}: ${s.value}`);

      const formattedVariants = formData.variants
        .filter((v) => v.quantity && v.price)
        .map((v) => ({
          quantity: parseInt(v.quantity, 10),
          price: parseFloat(v.price.replace(",", ".")),
        }));

      const payload = {
        ...formData,
        stock: parseInt(formData.stock, 10),
        specs: formattedSpecs,
        variants: formattedVariants,
        promoPercentage: formData.promoPercentage 
          ? parseFloat(formData.promoPercentage.toString().replace(",", "."))
          : null,
      };

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      router.push("/dashboard/admin/products");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white p-6">Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Modifier le produit</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nom du produit"
        className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-3"
      />

      <select
        value={formData.categoryId}
        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
        className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-3"
      >
        <option value="">-- Catégorie --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-3"
      />

      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-3"
      />

      {/* Indicateurs de nouveauté */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-3">
          <label className="font-semibold">Nouveau produit</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!!formData.isNew}
              onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-500 transition-colors duration-300"></div>
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300"></div>
          </label>
        </div>

        {/* Indicateurs de promotion */}
        <div className="flex items-center gap-3">
          <label className="font-semibold">En promotion</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!!formData.isPromo}
              onChange={(e) => setFormData({ ...formData, isPromo: e.target.checked })}
              className="sr-only peer"
            />
          <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-500 transition-colors duration-300"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300"></div>
          </label>
        </div>

        <input
          type="text"
          inputMode="decimal"
          step="0.01"
          placeholder="% de réduction"
          disabled={!formData.isPromo}
          value={formData.promoPercentage ?? ""}
          onChange={(e) => setFormData({ ...formData, promoPercentage: e.target.value })}
          className={`p-2 rounded bg-gray-800 border ${
            formData.isPromo ? "border-green-500" : "border-gray-700 opacity-50"
          } w-[180px]`}
        />
      </div>


      {/* Specs */}
      <h3 className="text-lg font-semibold mt-4">Spécifications :</h3>
      {formData.specs.map((spec, index) => (
        <div key={index} className="flex gap-2 items-center mt-2">
          <input
            type="text"
            placeholder="Clé"
            value={spec.key}
            onChange={(e) => handleSpecChange(index, "key", e.target.value)}
            className="w-1/3 p-2 rounded bg-gray-800 border border-gray-600"
          />
          <input
            type="text"
            placeholder="Valeur"
            value={spec.value}
            onChange={(e) => handleSpecChange(index, "value", e.target.value)}
            className="w-2/3 p-2 rounded bg-gray-800 border border-gray-600"
          />
          <button onClick={() => removeSpec(index)} className="text-red-400 hover:text-red-600">
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      <button onClick={addSpec} className="text-blue-400 mt-2 hover:text-blue-600 flex items-center gap-2">
        <PlusCircle size={18} /> Ajouter une spécification
      </button>

      {/* Variants */}
      <h3 className="text-lg font-semibold mt-6">Variantes (quantité/prix) :</h3>
      {formData.variants.map((variant, index) => (
        <div key={index} className="flex gap-4 items-center mt-2">
          <input
            type="number"
            placeholder="Quantité"
            value={variant.quantity}
            onChange={(e) => handleVariantChange(index, "quantity", e.target.value)}
            className="w-1/2 p-2 rounded bg-gray-800 border border-gray-600"
          />
          <input
            type="text"
            placeholder="Prix"
            value={variant.price}
            onChange={(e) => handleVariantChange(index, "price", e.target.value)}
            className="w-1/2 p-2 rounded bg-gray-800 border border-gray-600"
          />
          <button onClick={() => removeVariant(index)} className="text-red-400 hover:text-red-600">
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      <button onClick={addVariant} className="text-blue-400 mt-2 hover:text-blue-600 flex items-center gap-2">
        <PlusCircle size={18} /> Ajouter une variante
      </button>

      <div className="mt-6">
        <ImageUploader onUploadComplete={(imgs) => setFormData({ ...formData, images: imgs })} />
        {formData.images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {formData.images.map((img, index) => (
              <Image key={index} src={img.url} alt="preview" width={120} height={80} className="rounded" />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex">
        <button 
          onClick={() => router.push("/dashboard/admin/products")}
          className="mt-6 mr-4 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded"
        >
          Annuler
        </button>
        <button
          onClick={handleSave}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded"
          disabled={saving}
        >
          {saving ? <SpinnerButtons /> : "Enregistrer les modifications"}
        </button>
      </div>
    </div>
  );
};

export default EditProductPage;
