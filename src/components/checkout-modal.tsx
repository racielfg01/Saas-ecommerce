"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";
import { WHATSAPP_NUMBER } from "@/lib/mock-data";
import { CheckoutFormData } from "@/types";
import { ShoppingBag, Send } from "lucide-react";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, "Número de teléfono inválido"),
});

export function CheckoutForm() {
  const { cart, clearCart } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const onSubmit = (data: CheckoutFormData) => {
    setIsSubmitting(true);

    const orderDetails = cart
      .map(
        (item) =>
          `• ${item.product.name} x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    const date = new Date().toLocaleString("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const message = `🛒 *NUEVA ORDEN DE COMPRA*\n\n` +
      `👤 *Cliente:* ${data.fullName}\n` +
      `📱 *Teléfono:* ${data.phone}\n\n` +
      `📦 *Productos:*\n${orderDetails}\n\n` +
      `💰 *Total:* $${total.toFixed(2)}\n` +
      `📅 *Fecha:* ${date}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    clearCart();
    window.open(whatsappUrl, "_blank");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4 max-h-60 overflow-y-auto border rounded-lg p-4">
        <h3 className="font-semibold flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" />
          Resumen del Pedido
        </h3>
        {cart.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {item.product.name} x{item.quantity}
            </span>
            <span className="font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre Completo *</Label>
          <Input
            id="fullName"
            placeholder="Juan Pérez"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Número de Teléfono *</Label>
          <Input
            id="phone"
            placeholder="+1 234 567 890"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        <Send className="mr-2 h-4 w-4" />
        {isSubmitting ? "Procesando..." : "Enviar Pedido por WhatsApp"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Al hacer clic, serás redirigido a WhatsApp para completar tu pedido
      </p>
    </form>
  );
}
