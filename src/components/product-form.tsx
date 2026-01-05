"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  price: z.string().min(0.01, "El precio debe ser mayor a 0"),
  image: z.string().url("URL de imagen inválida"),
  stock: z.string().min(0, "El stock debe ser un número positivo"),
  category: z.string().min(1, "Selecciona una categoría"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const router = useRouter();
  const { addProduct, updateProduct } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          image: product.image,
          stock: product.stock.toString(),
          category: product.category,
        }
      : {
          name: "",
          description: "",
          price: "",
          image: "",
          stock: "",
          category: "",
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    
    try {
      const productData = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        image: data.image,
        stock: parseInt(data.stock),
        category: data.category,
      };

      if (product) {
        updateProduct(product.id, productData);
      } else {
        addProduct(productData);
      }

      onSuccess?.();
      router.push("/admin");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del Producto *</Label>
        <Input
          id="name"
          placeholder="Ej: Auriculares Bluetooth"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción *</Label>
        <Textarea
          id="description"
          placeholder="Describe el producto en detalle..."
          className="min-h-[100px]"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Precio ($) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="99.99"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock Disponible *</Label>
          <Input
            id="stock"
            type="number"
            placeholder="10"
            {...register("stock")}
          />
          {errors.stock && (
            <p className="text-sm text-destructive">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoría *</Label>
        <Select
          value={watch("category")}
          onValueChange={(value) => setValue("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.filter((cat) => cat !== "Todos").map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL de Imagen *</Label>
        <Input
          id="image"
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
          {...register("image")}
        />
        {errors.image && (
          <p className="text-sm text-destructive">{errors.image.message}</p>
        )}
        {watch("image") && (
          <div className="mt-2">
            <img
              src={watch("image")}
              alt="Vista previa"
              className="h-32 w-32 rounded-md object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/128?text=Error";
              }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Guardando..." : product ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  );
}
