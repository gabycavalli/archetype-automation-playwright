# Usa una imagen base de Playwright
FROM mcr.microsoft.com/playwright:v1.47.2-focal

# Establece el directorio de trabajo en /tests
WORKDIR /tests

# Copia los archivos de tu proyecto al directorio de trabajo
COPY . .

# Instala las dependencias de Node.js
RUN npm install

# Asegura que el entrypoint script tiene permisos de ejecución
RUN chmod +x /tests/scripts/main-entrypoint

# Define el entrypoint
ENTRYPOINT ["/tests/scripts/main-entrypoint"]
