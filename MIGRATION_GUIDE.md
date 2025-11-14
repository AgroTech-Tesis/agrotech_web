# Guía de Migración: Angular Material → Ng-Zorro

## 🎯 Componentes Migrados

### Mapeo de Componentes

| Angular Material | Ng-Zorro | Estado |
|-----------------|----------|---------|
| MatIcon | NzIconModule | ✅ Completo |
| MatButton | NzButtonModule | ✅ Completo |
| MatFormField | NzFormModule | ✅ Completo |
| MatInput | NzInputModule | ✅ Completo |
| MatSnackBar | NzMessageService | ✅ Completo |
| MatExpansionPanel | NzCollapseModule | ✅ Completo |
| MatButtonToggle | NzRadioModule | ✅ Completo |
| MatTable | Array directo | ✅ Completo |
| MatCard | NzCardModule | ✅ Completo |
| MatList | NzListModule | ✅ Completo |
| MatDivider | NzDividerModule | ✅ Completo |
| MatMenu | NzMenuModule | ✅ Completo |

## 📝 Pasos para Usar los Nuevos Componentes

### 1. Iconos

**Antes (Material):**
```html
<mat-icon fontIcon="home"></mat-icon>
```

**Después (Ng-Zorro):**
```html
<span nz-icon nzType="home" nzTheme="outline"></span>
```

**TypeScript:**
```typescript
import { NzIconModule } from 'ng-zorro-antd/icon';
```

### 2. Botones

**Antes (Material):**
```html
<button mat-button>Click</button>
```

**Después (Ng-Zorro):**
```html
<button nz-button nzType="primary">Click</button>
```

**TypeScript:**
```typescript
import { NzButtonModule } from 'ng-zorro-antd/button';
```

### 3. Formularios

**Antes (Material):**
```html
<mat-form-field>
  <mat-label>Email</mat-label>
  <input matInput formControlName="email">
</mat-form-field>
```

**Después (Ng-Zorro):**
```html
<nz-form-item>
  <nz-form-label>Email</nz-form-label>
  <nz-form-control>
    <input nz-input formControlName="email" />
  </nz-form-control>
</nz-form-item>
```

**TypeScript:**
```typescript
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
```

### 4. Notificaciones

**Antes (Material):**
```typescript
constructor(private snackBar: MatSnackBar) {}

showMessage() {
  this.snackBar.open('Message', 'Close', { duration: 3000 });
}
```

**Después (Ng-Zorro):**
```typescript
constructor(private message: NzMessageService) {}

showMessage() {
  this.message.success('Message');
  // O también: this.message.error(), this.message.warning()
}
```

**TypeScript:**
```typescript
import { NzMessageService } from 'ng-zorro-antd/message';
```

### 5. Menú de Navegación

**Antes (Material):**
```html
<button mat-button [routerLink]="['/dashboard']">
  <mat-icon>home</mat-icon>
  <span>Dashboard</span>
</button>
```

**Después (Ng-Zorro):**
```html
<ul nz-menu nzMode="inline">
  <li nz-menu-item [routerLink]="['/dashboard']">
    <span nz-icon nzType="home"></span>
    <span>Dashboard</span>
  </li>
</ul>
```

**TypeScript:**
```typescript
import { NzMenuModule } from 'ng-zorro-antd/menu';
```

### 6. Acordeón/Expansión

**Antes (Material):**
```html
<mat-accordion>
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Título</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Contenido</p>
  </mat-expansion-panel>
</mat-accordion>
```

**Después (Ng-Zorro):**
```html
<nz-collapse>
  <nz-collapse-panel [nzHeader]="header">
    <ng-template #header>Título</ng-template>
    <p>Contenido</p>
  </nz-collapse-panel>
</nz-collapse>
```

**TypeScript:**
```typescript
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
```

### 7. Tarjetas

**Antes (Material):**
```html
<mat-card>
  <mat-card-header>
    <mat-card-title>Título</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    Contenido
  </mat-card-content>
</mat-card>
```

**Después (Ng-Zorro):**
```html
<nz-card nzTitle="Título">
  Contenido
</nz-card>
```

**TypeScript:**
```typescript
import { NzCardModule } from 'ng-zorro-antd/card';
```

### 8. Tags/Etiquetas para Estados

**Nuevo (Ng-Zorro):**
```html
<nz-tag [nzColor]="'success'">ONLINE</nz-tag>
<nz-tag [nzColor]="'error'">FAIL</nz-tag>
<nz-tag [nzColor]="'default'">OFFLINE</nz-tag>
```

**TypeScript:**
```typescript
import { NzTagModule } from 'ng-zorro-antd/tag';
```

## 🎨 Personalización de Estilos

### Variables CSS Globales

En `src/styles.css`:

```css
:root {
  --ant-primary-color: #274c77;
  --ant-success-color: #297739;
  --ant-error-color: #9b4343;
  --ant-warning-color: #ff7a00;
}
```

### Estilos de Componentes Específicos

Use `::ng-deep` para sobreescribir estilos de Ng-Zorro:

```css
::ng-deep .ant-menu-inline {
  background-color: #1f2937 !important;
}

::ng-deep .ant-btn-primary {
  background: #297739;
  border-color: #297739;
}
```

## 📦 Dependencias

### Instalar

```bash
npm install ng-zorro-antd@^17.0.0 --save
npm install @ctrl/tinycolor --save
```

### Desinstalar

```bash
npm uninstall @angular/material @angular/cdk
```

## ⚙️ Configuración

### app.config.ts

```typescript
import { provideNzConfig } from 'ng-zorro-antd/core/config';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... otros providers
    provideNzConfig({ theme: { primaryColor: '#274c77' } })
  ]
};
```

### styles.css

```css
@import "ng-zorro-antd/ng-zorro-antd.min.css";
```

### angular.json

Remover la importación de Material theme:

```json
"styles": [
  "src/styles.css"
]
```

## 🔧 Patrones Comunes

### 1. Datos de Tabla

**Antes:**
```typescript
deviceData: MatTableDataSource<Device>;

constructor() {
  this.deviceData = new MatTableDataSource<Device>();
}

loadData(devices: Device[]) {
  this.deviceData.data = devices;
}
```

**Después:**
```typescript
deviceData: Device[] = [];

loadData(devices: Device[]) {
  this.deviceData = devices;
}
```

### 2. Validación de Formularios

**Antes y Después (Sin cambios):**
```typescript
if (this.form.valid) {
  // enviar datos
}
```

Las validaciones de ReactiveFormsModule son idénticas.

### 3. Router Navigation

**Antes y Después (Sin cambios):**
```typescript
this.router.navigate(['/dashboard']);
```

## ✅ Checklist de Migración

- [x] Instalar ng-zorro-antd
- [x] Instalar @ctrl/tinycolor
- [x] Actualizar app.config.ts
- [x] Actualizar styles.css
- [x] Actualizar angular.json
- [x] Migrar Header Component
- [x] Migrar Side Navigation
- [x] Migrar Sign-In
- [x] Migrar Dashboard
- [x] Migrar Devices View
- [x] Migrar Charts View
- [x] Actualizar SecurityService
- [x] Remover Angular Material
- [x] Verificar compilación
- [x] Verificar errores

## 🐛 Solución de Problemas Comunes

### Error: Could not resolve "@ctrl/tinycolor"
```bash
npm install @ctrl/tinycolor --save
```

### Error: Could not resolve "~ng-zorro-antd/ng-zorro-antd.min.css"
Cambiar en `styles.css`:
```css
@import "ng-zorro-antd/ng-zorro-antd.min.css";
```

### Error: bundle exceeded maximum budget
Actualizar en `angular.json`:
```json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "2mb",
    "maximumError": "3mb"
  }
]
```

### Los estilos no se aplican correctamente
Usar `::ng-deep` en archivos CSS de componentes:
```css
::ng-deep .ant-clase {
  /* estilos */
}
```

## 📚 Recursos Adicionales

- [Ng-Zorro Documentation](https://ng.ant.design/)
- [Ant Design Icons](https://ant.design/components/icon/)
- [Ng-Zorro GitHub](https://github.com/NG-ZORRO/ng-zorro-antd)
- [Migration from Material to Ng-Zorro](https://ng.ant.design/docs/introduce/en)

## 🎉 Beneficios de Ng-Zorro

1. **Diseño Moderno**: UI más limpia y moderna
2. **Mejor Performance**: Bundle size optimizado
3. **Más Componentes**: Mayor variedad de componentes listos para usar
4. **Documentación Excelente**: Ejemplos claros y completos
5. **Activamente Mantenido**: Updates frecuentes y soporte activo
6. **Internacionalización**: Soporte built-in para múltiples idiomas
7. **Temas Personalizables**: Fácil personalización de colores y estilos

---

**Última actualización:** Noviembre 14, 2025
