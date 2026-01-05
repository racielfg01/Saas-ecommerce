"use client";

import { Truck, Shield, CreditCard } from "lucide-react";

export function Banner() {
  return (
    <div className="w-full">
      <div className="relative h-[400px] overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            Bienvenido a E-Shop
          </h1>
          <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
            Descubre los mejores productos con ofertas increíbles
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Truck className="h-5 w-5" />
              <span className="text-sm">Envío Gratis</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Compra Segura</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm">Pagos Flexibles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
