# 🚀 Quick Start - E-Shop

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 🔑 Credenciales de Prueba

**Email:** `admin@email.com`  
**Password:** `password123`

## 📋 Flujo de Uso Rápido

1. **Abrir** [http://localhost:3000](http://localhost:3000)
2. **Hacer clic** en "Iniciar Sesión"
3. **Ingresar** credenciales de prueba
4. **Explorar** los productos en la tienda
5. **Agregar** productos al carrito (ícono arriba derecha)
6. **Abrir** el carrito y hacer clic en "Finalizar Compra"
7. **Completar** formulario de checkout
8. **Enviar** pedido por WhatsApp
9. **Acceder** al panel admin desde el menú de usuario
10. **Gestionar** productos (crear, editar, eliminar)

## 📱 Configurar WhatsApp

Editar `components/checkout-modal.tsx` línea 65:

```typescript
const whatsappNumber = "5491112345678"; // Cambiar por tu número
```

Formato: código de país + número sin espacios (ej: 5491112345678)

## 🎨 Características Destacadas

- ✅ 10 productos de ejemplo precargados
- ✅ Búsqueda y filtros por categoría
- ✅ Carrito persistente
- ✅ Panel de administración completo
- ✅ Integración con WhatsApp
- ✅ Diseño responsive y mobile-first
- ✅ Interfaz moderna con shadcn/ui

## 📚 Documentación Completa

- `README.md` - Documentación completa del proyecto
- `DEVELOPMENT.md` - Guía de desarrollo y customización

## 🆘 Problemas Comunes

**¿No persiste el carrito?**  
→ Verificar que el navegador permite localStorage

**¿No abre WhatsApp?**  
→ Verificar formato del número (sin + ni espacios)

**¿Build falla?**  
→ Ejecutar `rm -rf node_modules .next && npm install`

## 🎯 Próximos Pasos

1. Cambiar el número de WhatsApp por el tuyo
2. Personalizar colores en `app/globals.css`
3. Modificar productos en `lib/mock-data.ts`
4. Agregar más categorías en `components/product-form.tsx`
5. Desplegar en Vercel: `vercel deploy`

---

**¡Listo para usar!** 🎉
