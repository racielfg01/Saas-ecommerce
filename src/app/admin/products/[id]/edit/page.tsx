"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "@/components/product-form";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const products = useStore((state) => state.products);
  const product = products.find((p) => p.id === params.id);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user || !user.isAdmin) {
    return null;
  }

  if (!product) {
    return (
      <div className="container px-4 py-8 sm:px-6 lg:px-8">
        <p>Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/admin">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Panel
          </Button>
        </Link>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Editar Producto
          </CardTitle>
          <CardDescription>
            Actualiza la información del producto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} onSuccess={() => router.push("/admin")} />
        </CardContent>
      </Card>
    </div>
  );
}

import { Button } from "@/components/ui/button";
