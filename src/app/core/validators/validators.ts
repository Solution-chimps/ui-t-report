import { ValidatorFn } from '@angular/forms';

import { CnpjValidator } from './cnpj.validator';
import { CpfValidator } from './cpf.validator';
import { PhoneValidators } from './phone.validator';

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

  /**
   *Valida automaticamente um número de telefone brasileiro sem DDD.
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
   * @static
   * @type {ValidatorFn}
   * @memberof UiValidators
   */
  public static phone: ValidatorFn = PhoneValidators.validate.bind(this)

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
   * @memberof UiValidators
   */
  public static ddd: ValidatorFn = PhoneValidators.ddd.bind(PhoneValidators)
}
