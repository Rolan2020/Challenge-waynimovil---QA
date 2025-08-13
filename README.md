# Wayni Challenge - Automatización QA

## 📌 Prerrequisitos
- Node.js >= 18.x
- npm >= 9.x
- Git

## Pasos de instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/wayni-challenge-automation.git
   cd wayni-challenge-automation
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Comando de ejecución
Para correr todos los tests automatizados:
```bash
npx playwright test
```

Para abrir el reporte interactivo:
```bash
npx playwright show-report
```

## Descripción del flujo cubierto
El flujo automatizado cubre el formulario de solicitud de préstamo en https://app.waynimovil.ar/prestamos, validando:
- Casos positivos: envío exitoso con datos válidos y aceptación de términos
- Casos negativos: validaciones de campos obligatorios (DNI, celular, fecha de nacimiento, email), formatos inválidos y errores esperados

## Justificación de las decisiones tomadas
- Se utilizó Playwright por su robustez, velocidad y facilidad de integración con TypeScript
- Se implementó el patrón Page Object para mantener el código escalable y fácil de mantener
- Los selectores se definieron de forma explícita para mayor estabilidad ante cambios menores en la UI
- Los tests cubren tanto flujos exitosos como validaciones negativas, asegurando la calidad del formulario
- El proyecto es fácilmente extensible para agregar más casos o flujos en el futuro