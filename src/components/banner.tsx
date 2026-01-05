import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Banner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <div className="container px-4 py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Bienvenido a <span className="text-primary">ShopStore</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Descubre los mejores productos con ofertas exclusivas. Calidad garantizada y envío rápido.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="gap-2">
              Comprar Ahora
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Ver Ofertas
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
    </div>
  );
}
