import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validator responsável por validar CNPJ.
 *
 * Pode ser utilizado diretamente em Reactive Forms.
 *
 * Exemplo:
 * form = this.fb.group({
 *   cnpj: ['', [CnpjValidator.validate]]
 * });
 */
export class CnpjValidator {

  /**
   * Valida se o valor do controle é um CNPJ válido.
   *
   * @param {AbstractControl} control
   * @returns {ValidationErrors | null}
   */
  public static validator(control: AbstractControl): ValidationErrors | null {

    const value = control.value;

    if (!value) {
      return null;
    }

    const cnpj = CnpjValidator.onlyNumbers(value);

    if (!CnpjValidator.isValidFormat(cnpj)) {
      return { cnpj: true };
    }

    if (!CnpjValidator.validateDigits(cnpj)) {
      return { cnpj: true };
    }

    return null;
  }

  /**
   * Remove qualquer caractere que não seja número.
   */
  private static onlyNumbers(value: string): string {
    return value.replace(/\D/g, '');
  }

  /**
   * Verifica formato básico do CNPJ.
   */
  private static isValidFormat(cnpj: string): boolean {
    if (cnpj.length !== 14) {
      return false;
    }

    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    return true;
  }

  /**
   * Valida dígitos verificadores do CNPJ.
   */
  private static validateDigits(cnpj: string): boolean {

    const calculateDigit = (base: string, weights: number[]) => {
      const sum = base
        .split('')
        .reduce((acc, digit, index) => {
          return acc + Number(digit) * weights[index];
        }, 0);

      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const base = cnpj.substring(0, 12);
    const firstDigit = calculateDigit(base, firstWeights);

    const baseWithFirst = base + firstDigit;
    const secondDigit = calculateDigit(baseWithFirst, secondWeights);

    return (
      firstDigit === Number(cnpj[12]) &&
      secondDigit === Number(cnpj[13])
    );
  }
}
