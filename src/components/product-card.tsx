import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useStore } from "@/lib/store";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.stock < 5 && product.stock > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-white">
            ¡Últimas {product.stock} unidades!
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-lg font-bold text-white">Agotado</span>
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
          {product.category}
        </span>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-2">{product.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price}</span>
          <span className="text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
