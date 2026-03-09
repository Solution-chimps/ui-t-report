import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { DDDS_CODES } from '../../shared/constants/ddds.constants';

export const TEL_LENTGH = 8;

export class PhoneValidators {

  /**
 * Valida automaticamente um número de telefone brasileiro sem DDD.
 *
 * Este método decide dinamicamente qual validação aplicar com base
 * na quantidade de caracteres informados no controle.
 *
 * Regras aplicadas:
 *
 * - Se o valor possuir mais caracteres que `TEL_LENGTH`, será considerado
 *   um número de **celular** e a validação será delegada para
 *   {@link PhoneValidators.mobile}.
 *
 * - Caso contrário, será considerado um **telefone fixo** e a validação
 *   será delegada para {@link PhoneValidators.landline}.
 *
 * O valor recebido é esperado **sem DDD** e contendo apenas os dígitos
 * do número telefônico.
 *
 * Exemplos:
 *
 * Celular válido:
 * ```
 * 998765432
 * ```
 *
 * Telefone fixo válido:
 * ```
 * 34567890
 * ```
 *
 * @static
 * @param {AbstractControl} control Controle do formulário contendo o número de telefone.
 * @returns {ValidationErrors | null}
 *
 * Retorna:
 * - `null` quando o número é válido.
 * - `ValidationErrors` quando o número não atende às regras definidas
 *   para telefone fixo ou celular.
 *
 * @memberof PhoneValidators
 */
  public static validate(control: AbstractControl): ValidationErrors | null {
    if (control?.value?.length > TEL_LENTGH) {
      return PhoneValidators.mobile(control);
    }
    return PhoneValidators.landline(control);
  }

  /**
   * Valida se o valor informado corresponde a um DDD válido no Brasil.
   *
   * Este método verifica se o valor presente no controle do formulário
   * está contido na lista de códigos de DDD definidos em `DDDS_CODES`.
   *
   * A validação funciona comparando o valor informado com os códigos
   * disponíveis no array de DDDs, retornando sucesso quando o código
   * existe na lista e erro quando não é encontrado.
   *
   * Exemplos de DDDs válidos:
   * ```
   * 11
   * 21
   * 31
   * 41
   * ```
   *
   * @param {AbstractControl} control Controle do formulário contendo o DDD a ser validado.
   * @returns {ValidationErrors | null}
   * @static
   *
   * Retorna:
   * - `null` quando o DDD é válido.
   * - `{ ddd: true }` quando o DDD informado não existe na lista de códigos válidos.
   *
   * @memberof PhoneValidators
   */
  public static ddd(control: AbstractControl): ValidationErrors | null {
    return DDDS_CODES.map(codes => codes.ddd).includes(control.value + '') ? null : { ddd: true }
  }

  /**
   * Valida telefone fixo brasileiro sem DDD.
   *
   * Regras:
   * - 8 dígitos
   * - primeiro número entre 2 e 5
   *
   * Exemplo válido:
   * 23456789
   *
   * @returns {ValidatorFn}
   */
  private static landline(control: AbstractControl): ValidationErrors | null {
    const regex = /^[2-5]\d{7}$/;

    const value = (control.value ?? '').replace(/\D/g, '');

    if (!value) return null;

    return regex.test(value)
      ? null
      : { phone: true };
  }

  /**
   * Valida número de celular brasileiro sem DDD.
   *
   * Regras:
   * - 9 dígitos
   * - começa com 9
   * - segundo dígito entre 6 e 9
   *
   * Exemplo válido:
   * 998765432
   *
   * @returns {ValidationErrors | null}
   */
  private static mobile(control: AbstractControl): ValidationErrors | null {
    const regex = /^9[6-9]\d{7}$/;

    const value = (control.value ?? '').replace(/\D/g, '');

    if (!value) return null;

    return regex.test(value)
      ? null
      : { phone: true };
  }

}
