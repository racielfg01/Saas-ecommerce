"use client";

import { ShoppingBag, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useStore } from "@/lib/store";
import Link from "next/link";
import { CheckoutForm } from "./checkout-modal";

export function Navbar() {
  const { cart, user, logout } = useStore();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            🛍️ ShopStore
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {user && user.isAdmin && (
            <Link href="/admin" className="text-sm font-medium hover:text-primary">
              Admin
            </Link>
          )}

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <CartSidebar />
            </DrawerContent>
          </Drawer>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm sm:inline">{user.name}</span>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="sm:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

function CartSidebar() {
  const { cart, updateCartQuantity, removeFromCart } = useStore();
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Carrito de Compras</h2>
        <p className="text-sm text-muted-foreground">{cart.length} productos</p>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-center">
          <div>
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">Tu carrito está vacío</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 space-y-4 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 rounded-lg border p-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">${item.product.price}</p>
                  <div className="mt-auto flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto h-8 w-8 text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="mb-4 flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <CheckoutButton />
          </div>
        </>
      )}
    </div>
  );
}

function CheckoutButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          Proceder al Pago
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar Compra</DialogTitle>
        </DialogHeader>
        <CheckoutForm />
      </DialogContent>
    </Dialog>
  );
}
