# 🤝 Contribuyendo a IFI Seguridad

## 📋 Código de Conducta

Este proyecto es un Proyecto Final de **Sistemas Microinformáticos en Red (SMR)** y se compromete a mantener un entorno respectuoso y profesional.

### Nuestros Valores
- 🎓 **Aprendizaje**: Espacio seguro para aprender y crecer
- 🤝 **Colaboración**: Trabajo en equipo respectuoso
- 💡 **Innovación**: Ideas nuevas son bienvenidas
- 📚 **Documentación**: Documentar el conocimiento es importante

---

## 🚀 Cómo Contribuir

### Tipos de Contribuciones

1. **Reportar Bugs** 🐛
2. **Sugerir Features** ✨
3. **Corregir código** 🔧
4. **Mejorar documentación** 📖
5. **Tests** ✅

### Proceso de Contribución

#### Paso 1: Crear un Issue
Antes de hacer cambios importantes:

```markdown
**Descripción**
Descripción clara del problema/feature

**Contexto**
Por qué es necesario este cambio

**Solución Propuesta**
Cómo lo resolverías (si aplica)

**Tareas** (si es feature)
- [ ] Tarea 1
- [ ] Tarea 2
```

#### Paso 2: Fork y Clonar
```bash
# Fork en GitHub
# Clonar tu fork
git clone https://github.com/tu-usuario/ifiseguridad.git
cd ifiseguridad

# Agregar upstream
git remote add upstream https://github.com/ifiseguridad/ifiseguridad.git
```

#### Paso 3: Crear Rama
```bash
# Actualizar main
git fetch upstream
git checkout main
git rebase upstream/main

# Crear rama de feature
git checkout -b feature/descripcion-corta

# Ejemplo
git checkout -b feature/agregar-validacion-emails
```

#### Paso 4: Hacer Cambios
```bash
# Editar archivos
# Verificar cambios
git status

# Formatear código
pnpm run lint --fix

# Validar TypeScript
tsc --noEmit

# Ejecutar tests
pnpm run test
```

#### Paso 5: Commit
```bash
# Staged changes
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar validación de emails"
```

**Formato de Commit (Conventional Commits)**:
```
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[pie opcional]
```

**Tipos permitidos**:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formateo (sin cambios funcionales)
- `refactor`: Refactorización de código
- `perf`: Mejoras de performance
- `test`: Agregar/modificar tests
- `chore`: Cambios de build, deps, etc

**Ejemplos válidos**:
```
feat(auth): agregar autenticación con JWT
fix(media): corregir permisos de carpeta
docs(readme): actualizar instrucciones
refactor(api): simplificar lógica de queries
test(users): agregar tests para modelo User
```

#### Paso 6: Push y Pull Request
```bash
# Push a tu fork
git push origin feature/descripcion-corta

# En GitHub: Crear Pull Request

# En PR, vincular issue
Closes #123
```

**Descripción de PR**:
```markdown
## 🎯 Descripción
Qué cambios hace este PR

## 🔗 Relacionado
Closes #123

## ✅ Checklist
- [ ] Código formateado (`pnpm run lint --fix`)
- [ ] Tipos validados (`tsc --noEmit`)
- [ ] Tests pasan (`pnpm run test`)
- [ ] Documentación actualizada
- [ ] Mensaje de commit descriptivo

## 📸 Screenshots (si aplica)
Capturas del cambio visual
```

---

## 🧹 Guía de Calidad de Código

### Formateo
```bash
# Antes de commit, SIEMPRE ejecutar:
pnpm run lint --fix
```

### Validación de Tipos
```bash
# Verificar no hay errores TypeScript
tsc --noEmit
```

### Tests
```bash
# Tests deben pasar
pnpm run test
pnpm run test:int
pnpm run test:e2e  # Si modificas UI
```

### Documentación
- Comentar código complejo
- Actualizar README si agrega features
- Documentar nuevas funciones

### Standards
- **Indentación**: 2 espacios (Prettier)
- **Longitud línea**: 100 caracteres (Prettier)
- **Nombrado**: camelCase funciones, PascalCase componentes
- **Tipos**: TypeScript siempre (no usar `any`)

---

## 📝 Estructura de Commits

### Commit Inicial (Bueno)
```
feat(users): agregar endpoint de listar usuarios

- Nuevo endpoint GET /api/users
- Soporte para paginación
- Validación de parámetros
- Tests unitarios incluidos

Closes #42
```

### Commit Final (Después del feedback)
```
feat(users): agregar endpoint de listar usuarios

- Nuevo endpoint GET /api/users con paginación
- Validación de límites (1-100 items)
- Control de acceso basado en rol
- Tests: 95% de cobertura
- Documentación en OpenAPI

Closes #42
```

---

## 🧪 Escribiendo Tests

### Estructura Recomendada
```typescript
// src/utils/__tests__/myFunction.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { myFunction } from '../myFunction'

describe('myFunction', () => {
  let data: any

  beforeEach(() => {
    data = {
      /* setup */
    }
  })

  it('should return true when input is valid', () => {
    const result = myFunction(data)
    expect(result).toBe(true)
  })

  it('should throw error when input is invalid', () => {
    expect(() => myFunction(null)).toThrow()
  })
})
```

### E2E Test Ejemplo
```typescript
// tests/admin-login.spec.ts
import { test, expect } from '@playwright/test'

test('admin puede loguearse', async ({ page }) => {
  // Navegar
  await page.goto('http://localhost:3000/admin')

  // Llenar form
  await page.fill('input[name="email"]', 'admin@example.com')
  await page.fill('input[name="password"]', 'password123')

  // Submit
  await page.click('button[type="submit"]')

  // Verificar
  await expect(page).toHaveURL(/.*dashboard/)
})
```

---

## 🐛 Reportando Bugs

### Template de Issue
```markdown
### 📋 Descripción
Descripción clara y concisa del problema

### 🔄 Pasos para Reproducir
1. Ir a...
2. Hacer clic en...
3. Ver error

### ❌ Comportamiento Actual
Qué está pasando mal

### ✅ Comportamiento Esperado 
Qué debería pasar

### 📸 Screenshots
Capturas del problema (si aplica)

### 🌍 Contexto
- **OS**: Windows/Mac/Linux
- **Node.js**: v18.12.0
- **pnpm**: v8.0.0
- **Rama**: main/develop/feature-xyz
```

---

## ✨ Sugerencias de Features

### Template
```markdown
### 🎯 Descripción General
Qué feature propones

### 🤔 Problema que Resuelve
Cuál es el problema actual

### 💡 Solución Propuesta
Cómo resolvería esta feature

### 📋 Casos de Uso
Ejemplos de cómo se usaría

### 📚 Contexto Adicional
Links, referencias, etc
```

---

## 🎓 Aprovechar para Aprender

### Áreas para Contribuir (Principiantes)
- 📖 Documentación
- 🧪 Tests
- 🎨 Mejoras UI/UX
- ♿ Accesibilidad

### Áreas para Intermedios
- 🔧 Mejoras de rendimiento
- 🐛 Bug fixes
- ♻️ Refactoring
- 📊 Monitoring

### Áreas para Avanzados
- 🏗️ Arquitectura
- 🔐 Seguridad
- 📈 Escalabilidad
- 💻 DevOps/Docker

---

## 👥 Reconocimiento

Todos los contribuyentes son reconocidos en:
- Git commits y pull requests
- Sección de Contributors en GitHub
- Archivo CONTRIBUTORS.md

---

## ⚠️ Cosas a Evitar

- ❌ No editar `.env` en commits
- ❌ No usar `any` en TypeScript
- ❌ No commits sin tests
- ❌ No pushear a `main` directamente
- ❌ No ignorar linting errors
- ❌ No hacer PRS muy grandes (>500 líneas)

---

## 🆘 Pedir Ayuda

- **Discord/Chat**: [Crear discussion en GitHub]
- **Issues**: Abrir issue con tag `[HELP]`
- **Email**: Contactar a autores del proyecto

---

## 📚 Recursos Útiles

### Versionado
- **Semantic Versioning**: https://semver.org/
- **Conventional Commits**: https://www.conventionalcommits.org/

### Git
- **Pro Git Book**: https://git-scm.com/book/
- **Oh My Git**: https://ohmygit.org/

### Testing
- **Vitest Docs**: https://vitest.dev/
- **Playwright Docs**: https://playwright.dev/

### Código
- **TypeScript Handbook**: https://www.typescriptlang.org/
- **Payload CMS Docs**: https://payloadcms.com/docs

---

## 📊 Proceso de Review

Los PRs serán revisados considerando:

- ✅ Código funciona y sigue standards
- ✅ Tests incluidos y pasan
- ✅ Documentación actualizada
- ✅ Sin conflictos con `main`
- ✅ Commits descriptivos

### Tiempo de Review
- Bugs urgentes: 24 horas
- Features: 48-72 horas
- Documentación: 24 horas

---

## 🎉 Después de Merge

Tu contribución:
1. ✅ Se mergea a `main`
2. 📢 Se menciona en versión
3. 🏆 Te reconocemos públicamente
4. ⭐ Ganas experiencia valiosa

---

## 📄 Licencia

Al contribuir aceptas que tu trabajo está bajo licencia MIT.

---

**¡Gracias por contribuir a IFI Seguridad!** 🙏

Para preguntas u otras dudas, abre un GitHub Discussion.

---

*Última actualización: Mayo 2024*

*Documento de Contribuciones - Proyecto Final SMR*
