# E-Shop - E-commerce Completo

E-commerce completo con Next.js 13+, shadcn/ui, autenticación, panel de administrador, carrito de compras y integración con WhatsApp.

## 🚀 Características

### ✅ Autenticación y Login
- Página de login con email y contraseña
- Validación de credenciales
- Sesión persistente (localStorage)
- Rutas protegidas para el panel de administrador
- **Credencial de prueba**: `admin@email.com` / `password123`

### ✅ Panel de Administrador
- Dashboard privado para gestionar productos
- CRUD completo para productos (crear, leer, actualizar, eliminar)
- Formulario para agregar/editar productos con:
  - Nombre del producto
  - Descripción
  - Precio
  - Imagen (URL)
  - Stock/Cantidad disponible
  - Categoría
- Estadísticas del inventario
- Almacenamiento persistente
- 10 productos de ejemplo precargados

### ✅ Página de Store/Tienda
- Banner destacado en la parte superior
- Grid de productos responsive
- Búsqueda/filtro de productos por categoría
- Solo muestra productos con stock disponible
- Diseño mobile-first y responsive

### ✅ Carrito de Compras
- Visualización del carrito con productos agregados
- Opción de aumentar/disminuir cantidad
- Opción de eliminar productos
- Cálculo automático del total
- Persistencia del carrito

### ✅ Checkout y Formulario de Pago
- Modal de checkout que solicita:
  - Nombre completo del cliente
  - Número de teléfono (con validación)
- Resumen del pedido con productos, cantidades, precios y total
- Botón para completar la compra

### ✅ Integración con WhatsApp
- Al completar la compra, genera mensaje con:
  - Nombre del cliente
  - Teléfono del cliente
  - Lista de productos (nombre, cantidad, precio unitario)
  - Total de la orden
  - Fecha/hora del pedido
- Link de WhatsApp clickeable (wa.me) que pre-rellena el mensaje
- Número de WhatsApp ajustable en `components/checkout-modal.tsx`

## 🛠️ Stack Técnico

- **Framework**: Next.js 13+ con App Router
- **UI Components**: shadcn/ui
- **Estado**: Zustand con persistencia
- **Estilos**: Tailwind CSS
- **Iconos**: lucide-react
- **TypeScript**: Para seguridad de tipos

## 📁 Estructura del Proyecto

```
├── app/
│   ├── layout.tsx           # Layout principal con Toaster
│   ├── page.tsx             # Página de la tienda
│   ├── login/
│   │   └── page.tsx         # Página de login
│   └── admin/
│       └── page.tsx         # Panel de administrador
├── components/
│   ├── navbar.tsx           # Navegación principal
│   ├── banner.tsx           # Banner de la tienda
│   ├── product-card.tsx     # Card de producto
│   ├── cart-sidebar.tsx     # Sidebar del carrito
│   ├── login-form.tsx       # Formulario de login
│   ├── product-form.tsx     # Formulario de productos
│   ├── checkout-modal.tsx   # Modal de checkout
│   └── ui/                  # Componentes de shadcn/ui
├── lib/
│   ├── store.ts             # Estado global con Zustand
│   ├── mock-data.ts         # Datos de prueba
│   └── utils.ts             # Utilidades
└── types/
    └── index.ts             # Tipos TypeScript
```

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🔑 Credenciales de Acceso

Para acceder al panel de administrador:
- **Email**: `admin@email.com`
- **Password**: `password123`

## 📱 Configurar WhatsApp

Para cambiar el número de WhatsApp del negocio, edita el archivo `components/checkout-modal.tsx` y modifica la variable `whatsappNumber`:

```typescript
const whatsappNumber = "5491112345678"; // Cambiar por tu número
```

El número debe estar en formato internacional sin signos (ej: 5491112345678 para Argentina).

## ✨ Características Destacadas

- **Mobile-First**: Diseño completamente responsivo
- **Persistencia**: Los datos se guardan en localStorage
- **Animaciones**: Transiciones suaves con Tailwind
- **Validaciones**: Formularios con validación de datos
- **UX Optimizada**: Notificaciones toast, estados de carga, etc.
- **Type Safety**: TypeScript en todo el proyecto
- **Sin errores**: Build limpio sin warnings ni errors

## 🎨 Personalización

### Colores
Los colores se pueden ajustar en `app/globals.css` modificando las variables CSS.

### Categorías
Para agregar nuevas categorías, edita el array `categories` en `components/product-form.tsx`.

### Productos
Los productos de ejemplo están en `lib/mock-data.ts`.

## 📝 Notas

- Los datos se almacenan en localStorage, lo que significa que son específicos del navegador
- La autenticación es simulada (solo verifica credenciales hardcodeadas)
- Las imágenes de ejemplo provienen de Unsplash
- El sistema de pagos real NO está implementado (solo se genera el mensaje de WhatsApp)

## 🎯 Criterios de Aceptación Completados

- ✅ Login funcional con protección de rutas
- ✅ Admin panel con CRUD de productos
- ✅ Store responsiva y mobile-first
- ✅ Carrito con persistencia
- ✅ Checkout con formulario de datos
- ✅ Integración funcional con WhatsApp
- ✅ Todos los componentes usan shadcn/ui
- ✅ Datos mockup cargados por defecto
- ✅ Sin errores en consola
- ✅ Interfaz pulida y profesional

## 📄 Licencia

MIT
