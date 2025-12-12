# Sistema de Almacenamiento para E-commerce

Este módulo proporciona una capa de abstracción para el manejo del almacenamiento en el navegador, ofreciendo servicios específicos para diferentes aspectos de un e-commerce.

## Estructura de Archivos

```
storage/
├── auth.storage.js     # Manejo de autenticación
├── cart.storage.js     # Gestión del carrito de compras
├── preferences.storage.js # Preferencias del usuario
├── storage.service.js  # Servicio base de almacenamiento
└── index.js           # Punto de entrada unificado
```

## Servicios Disponibles

### 1. Storage Service Base (`storage.service.js`)

**Propósito**: Clase base que encapsula las operaciones de `localStorage` y `sessionStorage`.

**Características**:
- Serialización/deserialización automática de datos JSON
- Manejo de errores integrado
- Interfaz consistente para ambos tipos de almacenamiento

**Uso básico**:
```javascript
import { localStorageService, sessionStorageService } from '@core/infrastructure/storage';

// Guardar datos
localStorageService.setItem('clave', { dato: 'valor' });

// Leer datos
const datos = localStorageService.getItem('clave');
```

### 2. Autenticación (`auth.storage.js`)

**Propósito**: Maneja el estado de autenticación del usuario.

**Características**:
- Soporte para "recordar sesión"
- Almacenamiento seguro de tokens
- Métodos para verificar autenticación

**Uso**:
```javascript
import { authStorage } from '@core/infrastructure/storage';

// Establecer datos de autenticación
authStorage.setAuthData({
  accessToken: 'token-jwt',
  user: { id: 1, name: 'Usuario' }
}, true); // true para recordar sesión

// Verificar autenticación
const isAuthenticated = authStorage.isAuthenticated();

// Obtener usuario actual
const user = authStorage.getUser();
```

### 3. Carrito de Compras (`cart.storage.js`)

**Propósito**: Gestiona el carrito de compras del usuario.

**Características**:
- Manejo de productos con cantidades
- Cálculo de subtotal
- Persistencia automática

**Uso**:
```javascript
import { cartStorage } from '@core/infrastructure/storage';

// Agregar producto
cartStorage.addItem({
  id: 'prod123',
  name: 'Producto',
  price: 99.99
}, 2); // cantidad 2

// Obtener carrito
const cart = cartStorage.getCart();

// Calcular subtotal
const subtotal = cartStorage.getSubtotal();
```

### 4. Preferencias de Usuario (`preferences.storage.js`)

**Propósito**: Almacena las preferencias del usuario.

**Características**:
- Tema (claro/oscuro)
- Idioma
- Moneda
- Configuración de notificaciones
- Historial de productos vistos

**Uso**:
```javascript
import { preferencesStorage } from '@core/infrastructure/storage';

// Establecer tema
preferencesStorage.setTheme('dark');

// Obtener preferencias
const prefs = preferencesStorage.getPreferences();

// Agregar a recién vistos
preferencesStorage.addToRecentlyViewed({
  id: 'prod123',
  name: 'Producto',
  image: 'url'
});
```

## Escalabilidad

### 1. Añadir Nuevos Servicios

1. Crea un nuevo archivo en la carpeta `storage` (ej: `wishlist.storage.js`)
2. Implementa la lógica específica del dominio
3. Expórtalo en `index.js`

### 2. Migración a Backend

Para migrar a un backend:

1. **Capa de API**: Crea servicios que llamen a tu API
2. **Adaptador**: Implementa el patrón adaptador:

```javascript
// api/cart.api.js
export const cartApi = {
  async getCart() {
    const response = await fetch('/api/cart');
    return response.json();
  },
  // ...otros métodos
};

// storage/cart.storage.js
import { cartApi } from '@/api/cart.api';
import { cartCache } from './cache.strategy';

export const cartStorage = {
  async getCart() {
    if (isOnline()) {
      const cart = await cartApi.getCart();
      cartCache.save(cart);
      return cart;
    }
    return cartCache.get();
  },
  // ...otros métodos
};
```

### 3. Estrategias de Caché Avanzadas

Implementa estrategias como:
- Cache First
- Network First
- Stale While Revalidate

### 4. Tipado con TypeScript

Para mejorar la seguridad de tipos:

1. Crea interfaces para cada tipo de dato
2. Añade tipos a los métodos
3. Usa genéricos para mayor flexibilidad

## Mejoras Futuras

1. **Encriptación**: Añadir cifrado para datos sensibles
2. **Soporte para IndexedDB**: Para almacenamiento de mayor tamaño
3. **Sincronización en segundo plano**: Para mantener datos actualizados
4. **Logging**: Para depuración de problemas
5. **Métricas**: Para analizar el uso del almacenamiento

## Consideraciones de Seguridad

- No almacenes información sensible como contraseñas
- Usa `httpOnly` y `secure` para cookies cuando sea posible
- Implementa CSRF protection para operaciones sensibles
- Valida y sanitiza todos los datos antes de guardarlos

## Contribución

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
