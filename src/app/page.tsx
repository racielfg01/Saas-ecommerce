"use client";

import { useState, useMemo } from "react";
import { Banner } from "@/components/banner";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const products = useStore((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const hasStock = product.stock > 0;
      return matchesCategory && matchesSearch && hasStock;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-8 pb-16">
      <Banner />

      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "Todos" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("Todos")}
            >
              Todos
            </Button>
            {CATEGORIES.filter((cat) => cat !== "Todos").map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold">
            {selectedCategory === "Todos" ? "Todos los Productos" : selectedCategory}
          </h2>
          <p className="text-muted-foreground">{filteredProducts.length} productos disponibles</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center text-center">
            <div>
              <p className="text-lg font-medium">No se encontraron productos</p>
              <p className="text-muted-foreground">
                Intenta con otra categoría o término de búsqueda
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
