import { ValidatorFn } from '@angular/forms';

import { CnpjValidator } from './cnpj.validator';
import { CpfValidator } from './cpf.validator';

/**
 * Classe utilitária centralizadora de validadores
 * reutilizáveis do sistema.
 *
 * Essa classe funciona como um ponto único de acesso
 * para os ValidatorFn utilizados nos formulários Angular,
 * promovendo:
 *
 * - Padronização de uso
 * - Encapsulamento das implementações
 * - Facilidade de importação
 * - Organização arquitetural
 *
 * Exemplo de uso:
 *
 * ```ts
 * this.form = this.fb.group({
 *   cpf: ['', [UiValidators.cpf]],
 *   cnpj: ['', [UiValidators.cnpj]]
 * });
 * ```
 *
 * @export
 * @class UiValidators
 */
export class UiValidators {

  /**
   * Validator de CNPJ.
   *
   * Valida:
   * - Tamanho (14 dígitos)
   * - Sequências inválidas
   * - Dígitos verificadores oficiais
   * - Aceita valor com ou sem máscara
   *
   * Retorna erro:
   * ```ts
   * { cnpjInvalid: true }
   * ```
   *
   * @static
   * @type {ValidatorFn}
   * @memberof UiValidators
   */
  public static cnpj: ValidatorFn = CnpjValidator.validator.bind(CnpjValidator);

  /**
   * Validator de CPF.
   *
   * Valida:
   * - Tamanho (11 dígitos)
   * - Sequências inválidas
   * - Dígitos verificadores oficiais
   * - Aceita valor com ou sem máscara
   *
   * Retorna erro:
   * ```ts
   * { cpfInvalid: true }
   * ```
   *
   * @static
   * @type {ValidatorFn}
   * @memberof UiValidators
   */
  public static cpf: ValidatorFn = CpfValidator.validator.bind(CpfValidator);
}
