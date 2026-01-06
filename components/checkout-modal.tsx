"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckoutData } from "@/types";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { cart, getCartTotal, clearCart } = useStore();
  const [formData, setFormData] = useState<CheckoutData>({
    fullName: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<CheckoutData>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const validateForm = () => {
    const newErrors: Partial<CheckoutData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre es requerido";
    }

    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!phoneRegex.test(formData.phone) || formData.phone.replace(/\D/g, "").length < 8) {
      newErrors.phone = "Ingresa un número de teléfono válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const date = new Date().toLocaleString("es-AR");
    let message = `🛒 *Nuevo Pedido* 🛒\n\n`;
    message += `👤 *Cliente:* ${formData.fullName}\n`;
    message += `📱 *Teléfono:* ${formData.phone}\n`;
    message += `📅 *Fecha:* ${date}\n\n`;
    message += `📦 *Productos:*\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio unitario: ${formatPrice(item.price)}\n`;
      message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;
    });

    message += `💰 *Total: ${formatPrice(getCartTotal())}*`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const whatsappNumber = "+5352013998"; // Número de WhatsApp del negocio (ajustable)
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");

    toast.success("¡Pedido enviado! Te redirigimos a WhatsApp");
    
    clearCart();
    setFormData({ fullName: "", phone: "" });
    setErrors({});
    onClose();
  };

  const handleChange = (field: keyof CheckoutData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Finalizar Compra</DialogTitle>
          <DialogDescription>
            Completa tus datos para confirmar el pedido por WhatsApp
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre Completo *</Label>
            <Input
              id="fullName"
              placeholder="Juan Pérez"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className={errors.fullName ? "border-destructive" : ""}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Número de Teléfono *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+54 9 11 1234-5678"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold">Resumen del Pedido</h4>
            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <MessageSquare className="mr-2 h-5 w-5" />
            Enviar Pedido por WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
