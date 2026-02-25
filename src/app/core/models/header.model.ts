/**
 * Representa um item de header utilizado para navegação ou execução de ação.
 *
 * Pode funcionar de duas formas:
 *  - Navegação via Angular Router (routerLink)
 *  - Execução de ação personalizada (onclick)
 *
 * ⚠️ Regra de precedência:
 * Caso {@link HeaderItem.onclick} seja informado,
 * {@link HeaderItem.routerLink} será ignorado.
 */
export class HeaderItem {

  /**
   * Nome exibido no header.
   */
  public name!: string;

  /**
   * Rota utilizada pelo Angular Router.
   *
   * ⚠️ Será ignorada caso {@link HeaderItem.onclick} esteja definido.
   */
  public routerLink?: string[];

  /**
   * Função executada ao clicar no item.
   *
   * Quando definida, tem prioridade sobre {@link HeaderItem.routerLink}.
   *
   * @param arg.item Item que disparou o evento.
   * @param arg.event Evento de clique do DOM.
   */
  public onclick?: (arg: { item: HeaderItem, event: MouseEvent }) => void;

  /**
   * Cria uma nova instância vazia.
   *
   * @overload
   */
  constructor();

  /**
   * Cria uma nova instância copiando os valores de outro HeaderItem.
   *
   * @param {HeaderItem} params Objeto base para cópia.
   * @overload
   */
  constructor(params: HeaderItem);

  /**
   * Cria uma nova instância informando nome, rota e ação.
   *
   * @param {string} name Nome do item.
   * @param {string[]} [routerLink] Rota de navegação.
   * @param {(arg: { item: HeaderItem, event: MouseEvent }) => void} [onclick]
   * Função executada ao clicar. Caso informada, a navegação será desabilitada.
   * @overload
   */
  constructor(
    name: string,
    routerLink?: string[],
    onclick?: (arg: { item: HeaderItem, event: MouseEvent }) => void
  );

  constructor(
    params?: HeaderItem | string,
    routerLink?: string[],
    onclick?: (arg: { item: HeaderItem, event: MouseEvent }) => void
  ) {
    if (typeof params === 'string') {
      this.name = params;
      this.routerLink = routerLink ?? [];
      this.onclick = onclick;
      return this;
    }
    Object.assign(this, params ?? {});
  }

  /**
   * Inicia a construção encadeada de múltiplos HeaderItem
   * utilizando o padrão Builder.
   *
   * @overload
   * @param {HeaderItem} params Item base.
   * @returns {HeaderItemBuilder}
   */
  public static append(params: HeaderItem): HeaderItemBuilder;

  /**
   * Inicia a construção encadeada informando nome, rota e ação.
   *
   * @overload
   * @param {string} name Nome do item.
   * @param {string[]} [routerLink] Rota de navegação.
   * @param {(arg: { item: HeaderItem, event: MouseEvent }) => void} [onclick]
   * Função executada ao clicar. Caso informada, a navegação será ignorada.
   * @returns {HeaderItemBuilder}
   */
  public static append(
    name: string,
    routerLink?: string[],
    onclick?: (arg: { item: HeaderItem, event: MouseEvent }) => void
  ): HeaderItemBuilder;

  public static append(
    params?: HeaderItem | string,
    routerLink?: string[],
    onclick?: (arg: { item: HeaderItem, event: MouseEvent }) => void
  ): HeaderItemBuilder {
    return new HeaderItemBuilder(
      new HeaderItem(params as string, routerLink, onclick)
    );
  }
}

/**
 * Builder responsável por criar uma lista encadeada de {@link HeaderItem}.
 *
 * Permite adicionar múltiplos itens de forma fluente:
 *
 * @example
 * const items = HeaderItem
 *   .append('Home', ['/home'])
 *   .append('Logout', undefined, ({ item }) => console.log(item))
 *   .build();
 */
class HeaderItemBuilder {

  /**
   * Lista interna de itens construídos.
   */
  private readonly items: HeaderItem[] = [];

  /**
   * Cria o builder iniciando com um primeiro item.
   *
   * @param {HeaderItem} item Item inicial da coleção.
   */
  constructor(item: HeaderItem) {
    this.items.push(item);
  }

  /**
   * Adiciona um novo HeaderItem à lista.
   *
   * @overload
   * @param {HeaderItem} params Objeto base para cópia.
   * @returns {this} Retorna a própria instância para encadeamento.
   */
  public append(params: HeaderItem): this;

  /**
   * Adiciona um novo HeaderItem informando nome, rota e ação.
   *
   * ⚠️ Caso onclick seja informado, routerLink será ignorado.
   *
   * @overload
   * @param {string} name Nome do item.
   * @param {string[]} [routerLink] Rota de navegação.
   * @param {(arg: { item: HeaderItem, event: MouseEvent }) => void} [onclick]
   * Função executada ao clicar.
   * @returns {this} Retorna a própria instância para encadeamento.
   */
  public append(
    name: string,
    routerLink?: string[],
    onclick?: (arg: { item: HeaderItem, event: MouseEvent }) => void
  ): this;

  public append(
    params?: HeaderItem | string,
    routerLink?: string[],
    onclick?: (arg: { item: HeaderItem, event: MouseEvent }) => void
  ): this {
    this.items.push(new HeaderItem(params as string, routerLink, onclick));
    return this;
  }

  /**
   * Finaliza a construção retornando a lista de HeaderItem.
   *
   * @returns {HeaderItem[]} Lista final de itens construídos.
   */
  public build(): HeaderItem[] {
    return this.items;
  }
}
