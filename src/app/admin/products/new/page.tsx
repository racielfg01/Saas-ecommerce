"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "@/components/product-form";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user || !user.isAdmin) {
    return null;
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
            <Plus className="h-5 w-5" />
            Nuevo Producto
          </CardTitle>
          <CardDescription>
            Completa el formulario para agregar un nuevo producto al catálogo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm onSuccess={() => router.push("/admin")} />
        </CardContent>
      </Card>
    </div>
  );
}

import { Button } from "@/components/ui/button";
