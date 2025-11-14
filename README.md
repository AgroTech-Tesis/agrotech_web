# AgroTech - Sistema de Monitoreo Agrícola

Sistema de gestión y monitoreo agrícola inteligente desarrollado con Angular 17 y Ng-Zorro (Ant Design).

## 🚀 Características

- 📊 **Dashboard en Tiempo Real**: Visualización de datos de sensores (temperatura, humedad, caudal)
- 🌡️ **Integración Meteorológica**: Datos del clima en tiempo real
- 📱 **Gestión de Dispositivos**: Control de sensores y actuadores IoT
- 📈 **Gráficos Históricos**: Análisis de datos con filtros personalizables
- 🔔 **Sistema de Notificaciones**: Alertas y notificaciones en tiempo real
- 🎨 **UI Moderna**: Interfaz actualizada con Ng-Zorro (Ant Design)

## 🛠️ Tecnologías

- **Framework**: Angular 17.3.0
- **UI Library**: Ng-Zorro (Ant Design) 17.x
- **Gráficos**: ngx-charts 20.5.0
- **Estilos**: Tailwind CSS 3.4.3
- **Backend Mock**: JSON Server
- **IoT**: Arduino IoT Client 2.0.0

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio
cd agrotech_web

# Instalar dependencias
npm install

# Instalar dependencias específicas de Ng-Zorro (si no se instalaron automáticamente)
npm install ng-zorro-antd@^17.0.0 @ctrl/tinycolor --save
```

## 🎯 Scripts Disponibles

### Servidor de Desarrollo

```bash
npm start
# o
ng serve --proxy-config src/proxy.conf.json
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente al realizar cambios.

### API Falsa (Desarrollo)

```bash
npm run fake-api
```

Ejecuta el servidor JSON en `http://localhost:8080/`.

### Build

```bash
npm run build
```

Los archivos compilados se almacenarán en el directorio `dist/`.

### Tests

```bash
npm test
```

Ejecuta los tests unitarios via Karma.

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── devices/              # Gestión de dispositivos IoT
│   │   ├── model/
│   │   ├── pages/
│   │   └── services/
│   ├── iam/                  # Autenticación y seguridad
│   │   ├── model/
│   │   ├── services/
│   │   └── sign-in/
│   ├── irrigation/           # Gestión de riego
│   │   └── data-records/
│   ├── public/               # Componentes públicos
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── shared/               # Utilidades compartidas
├── assets/                   # Recursos estáticos
├── environments/             # Configuración de entornos
└── server/                   # Mock API data
```

## 🎨 Componentes Principales

### Header
- Reloj en tiempo real
- Información del usuario
- Botón de logout

### Side Navigation
- Menú de navegación principal
- Estados activos visuales
- Rutas: Dashboard, Devices, Charts

### Dashboard
- Widget de clima
- Gráficos de sensores (últimas 5 horas)
- Estado de dispositivos (PIE chart)
- Notificaciones del día

### Devices View
- Lista colapsable de dispositivos
- Estados visuales (ONLINE, OFFLINE, FAIL)
- Información de sensores y actuadores

### Charts View
- Filtros por zona
- Filtros por fecha (today, last week, last month)
- Gráficos de línea interactivos
- 4 tipos de sensores

## 🔧 Configuración

### Proxy Configuration

El proyecto usa un proxy para desarrollo. Configuración en `src/proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false
  }
}
```

### Variables de Entorno

Configurar en `environments/enviroment.conts.ts`:

```typescript
export const HOST = {
  host1: 'http://localhost:8080',
  host2: 'http://localhost:8080'
};
```

### Tema de Colores

Personalizar en `src/styles.css`:

```css
:root {
  --ant-primary-color: #274c77;
  --ant-success-color: #297739;
  --ant-error-color: #9b4343;
  --ant-warning-color: #ff7a00;
}
```

## 📝 Migración desde Angular Material

Este proyecto fue recientemente migrado de Angular Material a Ng-Zorro. Para más detalles, consultar:

- [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Resumen completo de cambios
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Guía de migración paso a paso

## 🔐 Autenticación

El sistema usa autenticación basada en localStorage:

```typescript
// Login exitoso
localStorage.setItem('user', JSON.stringify(email));
localStorage.setItem('farmer', JSON.stringify(farmerId));
localStorage.setItem('riceCrops', JSON.stringify(riceCropsId));

// Logout
localStorage.removeItem('user');
```

## 📊 Integración con IoT

El proyecto se integra con dispositivos Arduino IoT:

```typescript
import { ArduinoIotService } from './services/arduino-iot';
```

## 🌐 API Endpoints (Mock)

- `GET /accounts` - Lista de cuentas
- `POST /sign-in` - Autenticación
- `GET /farmers` - Información de agricultores
- `GET /rice-crops` - Cultivos de arroz
- `GET /devices` - Dispositivos IoT
- `GET /sensor-data-records` - Registros de sensores
- `GET /notifications` - Notificaciones

## 🎯 Características de Ng-Zorro Utilizadas

- **NzIconModule** - Iconos vectoriales
- **NzMenuModule** - Menú de navegación
- **NzFormModule** - Formularios
- **NzInputModule** - Inputs
- **NzButtonModule** - Botones
- **NzMessageService** - Notificaciones toast
- **NzCardModule** - Tarjetas
- **NzCollapseModule** - Paneles colapsables
- **NzRadioModule** - Radio buttons
- **NzTagModule** - Tags/Etiquetas
- **NzListModule** - Listas
- **NzDividerModule** - Divisores

## 🐛 Solución de Problemas

### Build Errors

Si encuentras errores de build relacionados con el budget:

```json
// angular.json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "2mb",
    "maximumError": "3mb"
  }
]
```

### Estilos no se aplican

Asegúrate de que `src/styles.css` incluya:

```css
@import "ng-zorro-antd/ng-zorro-antd.min.css";
```

## 📚 Recursos Adicionales

- [Angular Documentation](https://angular.io/docs)
- [Ng-Zorro Documentation](https://ng.ant.design/)
- [ngx-charts Documentation](https://swimlane.gitbook.io/ngx-charts/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 👥 Contribución

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🔄 Historial de Versiones

### v2.0.0 - Noviembre 2025
- ✨ Migración completa a Ng-Zorro (Ant Design)
- 🎨 UI/UX mejorada
- 🗑️ Removido Angular Material
- ♻️ Código refactorizado y optimizado

### v1.0.0 - Versión Inicial
- 🎉 Versión inicial con Angular Material

## 📞 Contacto

Para más información, consultas o soporte, contactar al equipo de desarrollo.

---

**Desarrollado con ❤️ para la agricultura inteligente**
