# Guía de Desarrollo - E-Shop

## Flujo de Usuario

### 1. Usuario sin autenticar
- Ve el banner de la tienda
- Debe hacer clic en "Iniciar Sesión"
- Es redirigido a `/login`

### 2. Inicio de Sesión
- Página: `/login`
- Credenciales: `admin@email.com` / `password123`
- Al iniciar sesión exitosamente, es redirigido a `/` (tienda)

### 3. Usuario Autenticado - Tienda
- Ve todos los productos disponibles (con stock > 0)
- Puede buscar productos por nombre/descripción
- Puede filtrar por categoría
- Puede agregar productos al carrito
- El carrito muestra un badge con la cantidad total
- El ícono de usuario permite acceder al panel admin (si es admin)

### 4. Carrito de Compras
- Se abre como sidebar desde el ícono del carrito
- Muestra todos los productos agregados
- Permite aumentar/disminuir cantidad
- Permite eliminar productos
- Muestra el total calculado
- Botón "Finalizar Compra" abre el modal de checkout

### 5. Checkout
- Modal que solicita datos del cliente:
  - Nombre completo (requerido)
  - Teléfono (requerido, con validación)
- Muestra resumen del pedido
- Al enviar, genera mensaje de WhatsApp y abre wa.me
- Limpia el carrito después de enviar

### 6. Panel de Administrador
- Accesible desde `/admin` o menú de usuario
- Protegido: solo usuarios con `isAdmin: true`
- Muestra estadísticas del inventario
- Tabla con todos los productos
- Botones para editar/eliminar productos
- Botón "Nuevo Producto" abre formulario

### 7. CRUD de Productos
- **Crear**: Modal con formulario completo
- **Leer**: Tabla en panel admin + grid en tienda
- **Actualizar**: Modal pre-llenado con datos del producto
- **Eliminar**: Confirmación antes de eliminar

## Estructura de Datos

### Product
```typescript
{
  id: string;           // Generado automáticamente
  name: string;         // Nombre del producto
  description: string;  // Descripción completa
  price: number;        // Precio en pesos (ej: 12999)
  image: string;        // URL de la imagen
  stock: number;        // Cantidad disponible
  category: string;     // Categoría del producto
}
```

### CartItem
```typescript
{
  ...Product,
  quantity: number;     // Cantidad en el carrito
}
```

### User
```typescript
{
  email: string;
  isAdmin: boolean;
}
```

## Persistencia (localStorage)

El estado se guarda automáticamente en localStorage con la key `ecommerce-storage`:

```json
{
  "state": {
    "user": { "email": "admin@email.com", "isAdmin": true },
    "products": [...],
    "cart": [...]
  },
  "version": 0
}
```

## Customización

### Agregar nueva categoría
Edita `components/product-form.tsx`:
```typescript
const categories = [
  "Electrónica",
  "Calzado",
  // ... agregar aquí
  "Nueva Categoría"
];
```

### Cambiar número de WhatsApp
Edita `components/checkout-modal.tsx`:
```typescript
const whatsappNumber = "5491112345678"; // Tu número
```

### Modificar productos iniciales
Edita `lib/mock-data.ts` y modifica el array `mockProducts`.

### Cambiar credenciales de admin
Edita `lib/store.ts`:
```typescript
login: (email: string, password: string) => {
  if (email === 'tu@email.com' && password === 'tupassword') {
    // ...
  }
}
```

### Personalizar colores
Edita `app/globals.css` y modifica las variables CSS en `:root` y `.dark`.

## Testing Local

```bash
# Desarrollo
npm run dev

# Verificar tipos
npx tsc --noEmit

# Lint
npm run lint

# Build
npm run build

# Preview de producción
npm start
```

## Debugging

### Limpiar localStorage
Abre la consola del navegador:
```javascript
localStorage.removeItem('ecommerce-storage');
location.reload();
```

### Ver estado actual
```javascript
const state = JSON.parse(localStorage.getItem('ecommerce-storage'));
console.log(state);
```

## Mejoras Futuras Sugeridas

1. **Backend real**: Reemplazar localStorage con una API
2. **Autenticación real**: Implementar JWT, OAuth, etc.
3. **Base de datos**: PostgreSQL, MongoDB, etc.
4. **Upload de imágenes**: Cloudinary, AWS S3, etc.
5. **Pasarela de pago**: Stripe, MercadoPago, etc.
6. **Gestión de pedidos**: Panel para ver historial de pedidos
7. **Notificaciones**: Email confirmación de pedido
8. **SEO**: Metadata dinámica por producto
9. **Analytics**: Google Analytics, Mixpanel, etc.
10. **Tests**: Jest, React Testing Library

## Solución de Problemas Comunes

### El carrito no persiste
- Verificar que el navegador permite localStorage
- Revisar la consola por errores
- Limpiar localStorage y reintentar

### Las imágenes no cargan
- Verificar que las URLs sean válidas
- Verificar la conexión a internet
- Usar imágenes de Unsplash como backup

### El build falla
- Ejecutar `npm install` nuevamente
- Borrar `.next` y `node_modules`, reinstalar
- Verificar versión de Node.js (>=18.17)

### WhatsApp no abre
- Verificar formato del número (sin + ni espacios)
- Probar desde un dispositivo móvil
- Verificar que el navegador permite pop-ups
