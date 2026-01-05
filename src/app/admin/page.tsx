"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const { user, products, deleteProduct, logout } = useStore();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user || !user.isAdmin) {
    return null;
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      deleteProduct(id);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a la Tienda
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestiona tus productos y catálogo</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventario de Productos</CardTitle>
          <CardDescription>
            Total: {products.length} productos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left font-medium">Producto</th>
                  <th className="pb-3 text-left font-medium">Categoría</th>
                  <th className="pb-3 text-left font-medium">Precio</th>
                  <th className="pb-3 text-left font-medium">Stock</th>
                  <th className="pb-3 text-right font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 font-medium">${product.price}</td>
                    <td className="py-4">
                      <span className={product.stock < 5 ? "text-destructive" : ""}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
