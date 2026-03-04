import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Classe utilitária para validação de CPF.
 */
export class CpfValidator {

  /**
   * Retorna ValidatorFn para uso em Angular Forms.
   *
   * @static
   * @returns {ValidatorFn}
   */
  public static validator(control: AbstractControl): ValidationErrors | null {
    return this.isValid(control.value) ? null : { cpfInvalid: true };
  }

  /**
   * Valida CPF puro (com ou sem máscara).
   *
   * @static
   * @param {string} value
   * @returns {boolean}
   */
  public static isValid(value: string): boolean {

    if (!value) return false;

    const cpf = value.replace(/\D/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    const calculateDigit = (base: string, factor: number): number => {

      const total = base
        .split('')
        .reduce((sum, num) => {
          sum += Number(num) * factor--;
          return sum;
        }, 0);

      const remainder = total % 11;

      return remainder < 2 ? 0 : 11 - remainder;
    };

    const base9 = cpf.substring(0, 9);
    const digit1 = calculateDigit(base9, 10);

    const base10 = base9 + digit1;
    const digit2 = calculateDigit(base10, 11);

    return (
      digit1 === Number(cpf[9]) &&
      digit2 === Number(cpf[10])
    );
  }
}
