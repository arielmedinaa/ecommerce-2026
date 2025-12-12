# CentralShop E-commerce

Bienvenido al repositorio de CentralShop, una plataforma de comercio electrónico moderna y escalable construida con React, Vite y Tailwind CSS.

## 🚀 Estructura del Proyecto

El proyecto sigue una arquitectura modular basada en características (Feature-based) con una clara separación de responsabilidades:

```
src/
├── core/                        # Código central de la aplicación
│   ├── domain/                  # Lógica de negocio pura
│   │   ├── entities/            # Entidades del dominio (Producto, Usuario, etc.)
│   │   ├── repositories/        # Interfaces de repositorios
│   │   └── services/            # Servicios de dominio
│   │
│   ├── application/             # Casos de uso y servicios de aplicación
│   │   ├── use-cases/          # Casos de uso específicos
│   │   └── services/           # Servicios de aplicación
│   │
│   ├── infrastructure/         # Implementaciones concretas
│   │   ├── api/               # Llamadas a APIs
│   │   ├── storage/           # Almacenamiento local/cache
│   │   └── repositories/      # Implementaciones de repositorios
│   │
│   ├── ui/                    # Componentes UI reutilizables
│   │   ├── components/       # Componentes genéricos
│   │   ├── layouts/          # Layouts de la aplicación
│   │   └── theme/            # Temas y estilos globales
│   │
│   └── shared/               # Utilidades compartidas
│       ├── constants/       # Constantes globales
│       ├── hooks/           # Hooks personalizados
│       ├── utils/           # Funciones de utilidad
│       └── types/           # Tipos/Interfaces globales
│
└── features/                  # Características del negocio
    ├── auth/                 # Autenticación
    ├── cart/                 # Carrito de compras
    ├── catalog/             # Catálogo de productos
    └── home/                # Página de inicio
```

## 🛠️ Configuración de Alias

Se han configurado los siguientes alias para importaciones absolutas:

- `@core/*` - Acceso directo a la carpeta `src/core`
- `@features/*` - Acceso directo a la carpeta `src/features`
- `@shared/*` - Acceso directo a `src/core/shared`
- `@ui/*` - Acceso directo a `src/core/ui`

Ejemplo de uso:
```javascript
import { Button } from '@ui/components/Button';
import { useAuth } from '@features/auth/hooks/useAuth';
```

## 🚀 Iniciar el Proyecto

1. Instalar dependencias:
   ```bash
   yarn install
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   yarn dev
   ```

3. Construir para producción:
   ```bash
   yarn build
   ```

## 🧪 Testing

Para ejecutar los tests:
```bash
yarn test
```

## 🧩 Características

- [x] Arquitectura escalable y mantenible
- [x] Diseño responsive con Tailwind CSS
- [x] Navegación fluida
- [ ] Carrito de compras
- [ ] Sistema de autenticación
- [ ] Integración con pasarela de pago

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
