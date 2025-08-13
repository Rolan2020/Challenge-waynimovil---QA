import { Page, Locator } from '@playwright/test';

export class PrestamoPage {
  readonly page: Page;
  readonly dniInput: Locator;
  readonly celularInput: Locator;
  readonly bancoSelect: Locator;
  readonly fechaNacimientoInput: Locator;
  readonly emailInput: Locator;
  readonly terminosCheckbox: Locator;
  readonly continuarButton: Locator;
  readonly dniError: Locator;
  readonly celularError: Locator;
  readonly fechaError: Locator;
  readonly emailError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dniInput = page.locator('div').filter({ hasText: /^DNI\*$/ }).getByRole('textbox');
    this.celularInput = page.locator('div').filter({ hasText: /^Ingresá tu celular\*$/ }).getByRole('textbox');
    this.bancoSelect =  page.locator('[id="headlessui-combobox-button-:Rt1eqlbm:"]');
    this.fechaNacimientoInput = page.locator('div').filter({ hasText: /^Fecha de nacimiento\*$/ }).getByRole('textbox');
    this.emailInput = page.locator('div').filter({ hasText: /^Ingresá tu email\*$/ }).getByRole('textbox');
    this.terminosCheckbox = page.getByRole('checkbox', { name: 'He leído y acepto los té' });
    this.continuarButton = page.getByRole('button', { name: 'Continuar' });
    this.dniError = page.getByText('Ingresá un DNI');
    this.celularError = page.getByText('Ingresá un celular');
    this.fechaError = page.getByText('Ingresá un fecha de nacimiento');
    this.emailError = page.getByText('El email no es válido o está');
  }

  async navegarAFormulario() {
    await this.page.goto('https://app.waynimovil.ar/prestamos');
  }

  async completarDNI(dni: string) {
    await this.dniInput.fill(dni);
  }

  async completarCelular(celular: string) {
    await this.celularInput.fill(celular);
  }

  async seleccionarBanco(banco: string) {
    await this.bancoSelect.click();
    await this.page.getByText(banco).click();
  }

  async completarFechaNacimiento(fecha: string) {
    await this.fechaNacimientoInput.fill(fecha);
  }

  async completarEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async aceptarTerminos() {
    await this.terminosCheckbox.check();
  }

  async clickContinuar() {
    await this.continuarButton.click();
  }

  async completarFormularioCompleto(datos: {
    dni: string;
    celular: string;
    banco: string;
    fechaNacimiento: string;
    email: string;
  }) {
    await this.completarDNI(datos.dni);
    await this.completarCelular(datos.celular);
    await this.seleccionarBanco(datos.banco);
    await this.completarFechaNacimiento(datos.fechaNacimiento);
    await this.completarEmail(datos.email);
    await this.aceptarTerminos();
  }

  async verificarErroresCamposObligatorios() {
    const errores = await Promise.all([
      this.dniError.isVisible(),
      this.celularError.isVisible(),
      this.fechaError.isVisible(),
      this.emailError.isVisible()
    ]);
    return errores;
  }
}