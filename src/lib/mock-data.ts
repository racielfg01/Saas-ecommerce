import { Product } from "@/types";

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Auriculares Bluetooth Premium",
    description: "Auriculares inalámbricos con cancelación de ruido activa y 30 horas de batería.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    stock: 15,
    category: "Audio"
  },
  {
    id: "2",
    name: "Smartwatch Pro",
    description: "Reloj inteligente con monitor de salud, GPS y resistencia al agua.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    stock: 20,
    category: "Electrónica"
  },
  {
    id: "3",
    name: "Mochila Urban Shield",
    description: "Mochila impermeable con compartimento para laptop y carga USB.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 25,
    category: "Accesorios"
  },
  {
    id: "4",
    name: "Cámara Mirrorless X",
    description: "Cámara profesional de 24MP con video 4K y lente kit incluido.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
    stock: 8,
    category: "Fotografía"
  },
  {
    id: "5",
    name: "Teclado Mecánico RGB",
    description: "Teclado gaming con switches Cherry MX y retroiluminación personalizable.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=500&h=500&fit=crop",
    stock: 30,
    category: "Computación"
  },
  {
    id: "6",
    name: "Lente Telephoto 85mm",
    description: "Lente profesional para retratos con apertura f/1.8.",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&h=500&fit=crop",
    stock: 12,
    category: "Fotografía"
  },
  {
    id: "7",
    name: "Speaker Bluetooth Portable",
    description: "Altavoz portátil con 360° de sonido y 12 horas de batería.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    stock: 35,
    category: "Audio"
  },
  {
    id: "8",
    name: "Gafas de Sol Aviator",
    description: "Gafas clásicas con protección UV400 y diseño atemporal.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    stock: 40,
    category: "Accesorios"
  },
  {
    id: "9",
    name: "Monitor UltraWide 34\"",
    description: "Monitor de alta resolución para productividad y gaming.",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop",
    stock: 10,
    category: "Computación"
  },
  {
    id: "10",
    name: "Mouse Gaming Wireless",
    description: "Ratón inalámbrico con sensor óptico de 16000 DPI.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    stock: 45,
    category: "Computación"
  }
];

export const CATEGORIES = ["Todos", "Audio", "Electrónica", "Accesorios", "Fotografía", "Computación"];

export const WHATSAPP_NUMBER = "1234567890"; // Change this to your WhatsApp number
