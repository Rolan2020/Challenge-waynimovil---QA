import { test, expect } from '@playwright/test';
import { PrestamoPage } from '../pageObjects/PrestamoPage';

test.describe('Formulario de Préstamo - Casos de Prueba', () => {
  let prestamoPage: PrestamoPage;

  test.beforeEach(async ({ page }) => {
    prestamoPage = new PrestamoPage(page);
    await prestamoPage.navegarAFormulario();
  });

  test.describe('Casos Positivos', () => {
    test('TC001 - Completar formulario con datos válidos', async ({ page }) => {
      const datosValidos = {
        dni: '94065254',
        celular: '1165778873',
        banco: 'Santander',
        fechaNacimiento: '26/05/1995',
        email: 'rolo.tb@gmail.com'
      };

      await prestamoPage.completarFormularioCompleto(datosValidos);
      await prestamoPage.clickContinuar();

      // Verifica que no hay errores y se procesa correctamente
      await expect(prestamoPage.dniError).not.toBeVisible();
      await expect(prestamoPage.celularError).not.toBeVisible();
      await expect(prestamoPage.fechaError).not.toBeVisible();
      await expect(prestamoPage.emailError).not.toBeVisible();

    });


    test('TC002 - Validar funcionalidad de checkbox términos y condiciones', async ({ page }) => {
      // Verifica que inicialmente no está marcado
      await expect(prestamoPage.terminosCheckbox).not.toBeChecked();
      
      // Marcar checkbox
      await prestamoPage.aceptarTerminos();
      await expect(prestamoPage.terminosCheckbox).toBeChecked();
      
      // Verifica enlace de términos
      await expect(page.locator('text=He leído y acepto los términos y condiciones')).toBeVisible();
    });
  });

  test.describe('Casos Negativos - Validaciones de Campo', () => {
    test('TC003 - Enviar formulario vacío', async ({ page }) => {
      await prestamoPage.completarEmail('test'); // el sistema no muestra erores si no se completa mail
      await prestamoPage.clickContinuar();
      
      // Verificar que aparecen todos los errores individualmente
      await expect(prestamoPage.celularError).toBeVisible();
      await expect(prestamoPage.fechaError).toBeVisible();
      await expect(prestamoPage.dniError).toBeVisible();
      await expect(prestamoPage.emailError).toBeVisible();

    });


    test('TC004 - Email inválido y campos vacíos - se muestran todos los errores', async ({ page }) => {
      await prestamoPage.completarEmail('mailinvalido'); // Email sin formato válido
      await prestamoPage.clickContinuar();

      // Verifica que todos los errores estén visibles
      const errores = await prestamoPage.verificarErroresCamposObligatorios();
      console.log(errores); 
      expect(errores.every(error => error === true)).toBe(true);
    });


    test('TC005 - DNI inválido - formato incorrecto', async ({ page }) => {
      await prestamoPage.completarDNI('123abc');
      await prestamoPage.clickContinuar();
      
      await expect(prestamoPage.dniError).toBeVisible();
    });


    test('TC006 - Celular inválido - formato incorrecto', async ({ page }) => {
      await prestamoPage.completarCelular('123');
      await prestamoPage.clickContinuar();
      
      await expect(prestamoPage.celularError).toBeVisible(); // rompe por una falla de diseño en la validacion de datos
    });
    // casos negativos de email
    test('TC007 - Email inválido', async ({ page }) => {
      await prestamoPage.completarEmail('usuarioejemplo.com');
      await prestamoPage.clickContinuar();
      
      await expect(prestamoPage.emailError).toBeVisible();
    });

    test('TC008 - Email inválido - sin dominio', async ({ page }) => {
      await prestamoPage.completarEmail('usuario@');
      await prestamoPage.clickContinuar();
      
      await expect(prestamoPage.emailError).toBeVisible();
    });

    test('TC009 - Email inválido - formato incompleto', async ({ page }) => {
      await prestamoPage.completarEmail('usuario@ejemplo');
      await prestamoPage.clickContinuar();
      
      await expect(prestamoPage.emailError).toBeVisible();
    });

    test('TC010 - Fecha de nacimiento inválida - formato incorrecto', async ({ page }) => {
      await prestamoPage.completarFechaNacimiento('1990/03-15');
      await prestamoPage.clickContinuar();
      
      await expect(prestamoPage.fechaError).toBeVisible(); // rompe por una falla de diseño en la validacion de datos
    });

  });
});