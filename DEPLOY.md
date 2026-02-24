# Guía de Despliegue a GitHub Pages

Esta guía te ayudará a desplegar GitFlix en GitHub Pages desde la rama `production/preview`.

## 📋 Requisitos Previos

- Repositorio en GitHub
- Acceso para modificar Settings del repositorio
- API Key de TMDB (opcional - la app funcionará con mock data si no la configuras)

## 🚀 Pasos para el Despliegue

### 1. Configurar GitHub Pages

1. Ve a la página de tu repositorio en GitHub
2. Navega a **Settings** → **Pages**
3. En la sección "Build and deployment":
   - Source: Selecciona **GitHub Actions**

### 2. Configurar Secrets (Opcional)

Si quieres usar la API real de TMDB:

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Crea un secret con:
   - Name: `VITE_TMDB_API_KEY`
   - Secret: Tu API Key de TMDB

> **Nota**: Si no configuras este secret, la aplicación usará automáticamente mock data y funcionará perfectamente.

### 3. Actualizar el Base Path

Antes de hacer el despliegue, actualiza el nombre del repositorio en los siguientes archivos:

#### package.json

```json
"build:gh-pages": "VITE_BASE_PATH=/<TU-REPO-NAME>/ react-router build",
```

#### .github/workflows/deploy.yml

```yaml
env:
  VITE_BASE_PATH: /<TU-REPO-NAME>/
```

Reemplaza `<TU-REPO-NAME>` con el nombre real de tu repositorio.

### 4. Crear y Push a la Rama production/preview

```bash
# Asegúrate de estar en la rama principal y tener todos los cambios
git add .
git commit -m "Preparar para deploy a GitHub Pages"

# Crear o cambiar a la rama production/preview
git checkout -b production/preview

# Push a GitHub
git push origin production/preview
```

### 5. Verificar el Despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Deberías ver un workflow "Deploy to GitHub Pages" en ejecución
3. Espera a que termine (toma 1-3 minutos)
4. Una vez completado, tu sitio estará disponible en:
   ```
   https://<tu-usuario>.github.io/<tu-repo-name>/
   ```

## 🔄 Despliegues Futuros

Una vez configurado, cada push a la rama `production/preview` desplegará automáticamente:

```bash
# Hacer cambios en tu código
git add .
git commit -m "Descripción de los cambios"

# Push a production/preview
git push origin production/preview
```

GitHub Actions se encargará automáticamente del build y deployment.

## 🛠️ Troubleshooting

### El sitio no carga correctamente

**Problema**: Las rutas de la app no funcionan o aparecen errores 404.

**Solución**: Verifica que el `VITE_BASE_PATH` esté configurado correctamente con el nombre de tu repositorio.

### Las imágenes no se cargan

**Problema**: No se ven los posters de películas.

**Solución**:

- Si usas la API de TMDB, verifica que el secret `VITE_TMDB_API_KEY` esté configurado
- Si usas mock data, este es el comportamiento esperado (no hay imágenes en el mock)

### El workflow falla

**Problema**: El workflow de GitHub Actions falla al ejecutarse.

**Soluciones comunes**:

1. Verifica que los permisos de GitHub Pages estén habilitados en Settings → Actions → General
2. Asegúrate de que el formato del workflow YAML sea correcto
3. Revisa los logs del workflow en la pestaña Actions para detalles

### La app no usa la API Key

**Problema**: A pesar de configurar el secret, la app usa mock data.

**Solución**: Verifica que:

1. El secret se llame exactamente `VITE_TMDB_API_KEY`
2. Hayas hecho push después de crear el secret
3. El workflow haya completado exitosamente

## ⚡ Modo Mock Data

Si decides no usar la API de TMDB, la aplicación funcionará perfectamente con datos mock. Esto es útil para:

- **Demos y presentaciones**: Sin preocuparte por límites de API
- **Desarrollo**: Probar sin configurar API Keys
- **Fallback automático**: Si la API alcanza su límite, la app seguirá funcionando

Los datos mock incluyen:

- ✅ Películas populares, mejor valoradas, en cartelera y próximos estrenos
- ✅ Detalles de películas
- ✅ Información de actores
- ✅ Géneros
- ✅ Búsqueda de películas

## 📝 Notas Adicionales

- El workflow solo se ejecuta en la rama `production/preview`
- Puedes ejecutar el workflow manualmente desde la pestaña Actions
- El despliegue típicamente toma 1-3 minutos
- GitHub Pages puede tardar algunos minutos adicionales en propagar los cambios

## 🔗 Enlaces Útiles

- [Documentación de GitHub Pages](https://docs.github.com/en/pages)
- [GitHub Actions para Pages](https://github.com/actions/deploy-pages)
- [TMDB API Documentation](https://developers.themoviedb.org/3)

---

¿Problemas? Abre un issue en el repositorio con los logs del workflow y descripción del problema.
