import { TableContent } from './content.model';
import { TableHeader } from './header.model';

/**
 * Representa uma coluna completa da tabela
 * composta por Header + Content.
 *
 * @template T Tipo do item da linha
 */
export class TableDataBuilderContent<T> {

  /**
   * Header da coluna.
   *
   * @type {TableHeader}
   * @memberof TableDataBuilderContent
   */
  public header: TableHeader;

  /**
   * Conteúdo da célula.
   *
   * @type {TableContent<T>}
   * @memberof TableDataBuilderContent
   */
  public content: TableContent<T>;

  constructor(header: TableHeader, content: TableContent<T>) {
    this.header = header;
    this.content = content;
  }

  /**
   * Inicia o processo de construção.
   *
   * @static
   * @template T
   * @return {TableDataContentBuilder<T>}
   * @memberof TableDataBuilderContent
   */
  public static builder<T>(): TableDataContentBuilder<T> {
    return new TableDataContentBuilder<T>();
  }
}

/**
 * Builder raiz que controla o fluxo da DSL.
 *
 * @template T
 */
class TableDataContentBuilder<T> {

  protected columns: TableDataBuilderContent<T>[] = [];

  /**
   * Inicia construção de um Header.
   */
  public appendHeader(text: string): TableBuilderHeaderBuilder<T>;
  public appendHeader(text: () => string): TableBuilderHeaderBuilder<T>;
  public appendHeader(text: TableHeader): TableBuilderHeaderBuilder<T>;
  public appendHeader(
    text: string | (() => string) | TableHeader
  ): TableBuilderHeaderBuilder<T> {
    return TableBuilderHeaderBuilder.builder(text, this);
  }

  /**
   * Retorna todas as colunas construídas.
   */
  public build(): TableDataBuilderContent<T>[] {
    return this.columns;
  }
}

/**
 * Builder responsável pela configuração do Header da coluna.
 *
 * Essa etapa da DSL permite configurar todas as propriedades
 * do cabeçalho antes de obrigatoriamente avançar para a
 * construção do Content da coluna.
 *
 * Não é possível finalizar a coluna nesta etapa — a DSL
 * força a transição para o ContentBuilder.
 *
 * @template T Tipo do item da linha
 */
class TableBuilderHeaderBuilder<T> {

  /**
   * Instância interna do Header em construção.
   *
   * @private
   * @type {TableHeader}
   * @memberof TableBuilderHeaderBuilder
   */
  private header: TableHeader;

  /**
   * Cria uma instância do builder de Header.
   *
   * Caso o parâmetro recebido seja uma instância de TableHeader,
   * ela será utilizada diretamente. Caso contrário, um novo
   * TableHeader será criado.
   *
   * @param {string | (() => string) | TableHeader} text
   * Texto inicial ou instância de Header
   *
   * @param {TableDataContentBuilder<T>} context
   * Contexto raiz da DSL
   *
   * @memberof TableBuilderHeaderBuilder
   */
  constructor(
    text: string | (() => string) | TableHeader,
    private context: TableDataContentBuilder<T>
  ) {
    this.header =
      text instanceof TableHeader
        ? text
        : new TableHeader(text as any);
  }

  /**
   * Define texto estático para o Header.
   *
   * @param {string} text
   * @returns {this}
   * @memberof TableBuilderHeaderBuilder
   */
  public withText(text: string): this;

  /**
   * Define texto dinâmico para o Header.
   *
   * @param {() => string} text
   * @returns {this}
   * @memberof TableBuilderHeaderBuilder
   */
  public withText(text: () => string): this;

  public withText(text: string | (() => string)): this {
    this.header.text = text;
    return this;
  }

  /**
   * Define condição estática de renderização.
   *
   * @param {boolean} conditional
   * @returns {this}
   * @memberof TableBuilderHeaderBuilder
   */
  public withConditional(conditional: boolean): this;

  /**
   * Define condição dinâmica de renderização.
   *
   * @param {() => boolean} conditional
   * @returns {this}
   * @memberof TableBuilderHeaderBuilder
   */
  public withConditional(conditional: () => boolean): this;

  public withConditional(
    conditional: boolean | (() => boolean)
  ): this {
    this.header.conditional = conditional;
    return this;
  }

  /**
   * Define o alinhamento do Header.
   *
   * @param {'left' | 'right' | 'center'} alignment
   * @returns {this}
   * @memberof TableBuilderHeaderBuilder
   */
  public withAlignment(
    alignment: 'left' | 'right' | 'center'
  ): this {
    this.header.alignment = alignment;
    return this;
  }

  /**
   * Define classe CSS estática.
   *
   * @param {string} className
   * @returns {this}
   * @memberof TableBuilderHeaderBuilder
   */
  public withClass(className: string): this;

  /**
   * Define classe CSS dinâmica.
   *
   * @param {() => string} className
   * @returns {this}
   * @memberof TableBuilderHeaderBuilder
   */
  public withClass(className: () => string): this;

  public withClass(className: string | (() => string)): this {
    this.header.class = className;
    return this;
  }

  /**
   * Define estilos CSS estáticos.
   *
   * @param {Partial<CSSStyleDeclaration>} style
   * @returns {this}
   * @memberof TableBuilderHeaderBuilder
   */
  public withStyle(style: Partial<CSSStyleDeclaration>): this;

  /**
   * Define estilos CSS dinâmicos.
   *
   * @param {() => Partial<CSSStyleDeclaration>} style
   * @returns {this}
   * @memberof TableBuilderHeaderBuilder
   */
  public withStyle(style: () => Partial<CSSStyleDeclaration>): this;

  public withStyle(
    style:
      | Partial<CSSStyleDeclaration>
      | (() => Partial<CSSStyleDeclaration>)
  ): this {
    this.header.style = style;
    return this;
  }

  /**
   * Define se a coluna é ordenável (estático).
   *
   * @param {boolean} sortable
   * @returns {this}
   * @memberof TableBuilderHeaderBuilder
   */
  public withSortable(sortable: boolean): this;

  /**
   * Define se a coluna é ordenável (dinâmico).
   *
   * @param {() => boolean} sortable
   * @returns {this}
   * @memberof TableBuilderHeaderBuilder
   */
  public withSortable(sortable: () => boolean): this;

  public withSortable(
    sortable: boolean | (() => boolean)
  ): this {
    this.header.sortable = sortable;
    return this;
  }

  /**
   * Avança obrigatoriamente para a construção do Content.
   *
   * Essa transição garante que uma coluna só pode ser
   * registrada após possuir Header e Content.
   *
   * @param {string} content Conteúdo estático
   * @returns {TableBuilderContentBuilder<T>}
   * @memberof TableBuilderHeaderBuilder
   */
  public content(content: string): TableBuilderContentBuilder<T>;

  /**
   * Avança para construção do Content com valor dinâmico.
   *
   * @param {(item: T) => string} content Função baseada no item
   * @returns {TableBuilderContentBuilder<T>}
   * @memberof TableBuilderHeaderBuilder
   */
  public content(content: (item: T) => unknown): TableBuilderContentBuilder<T>;

  /**
   * Avança utilizando instância existente de TableContent.
   *
   * @param {TableContent<T>} content
   * @returns {TableBuilderContentBuilder<T>}
   * @memberof TableBuilderHeaderBuilder
   */
  public content(content: TableContent<T>): TableBuilderContentBuilder<T>;

  public content(
    content: string | ((item: T) => unknown) | TableContent<T>
  ): TableBuilderContentBuilder<T> {

    const resolved =
      content instanceof TableContent
        ? content
        : new TableContent<T>(content as any);

    return TableBuilderContentBuilder.builder(
      this.header,
      resolved,
      this.context
    );
  }

  /**
   * Factory interna utilizada pela DSL
   * para criação controlada do builder.
   *
   * @static
   * @template T
   * @param {string | (() => string) | TableHeader} text
   * @param {TableDataContentBuilder<T>} context
   * @returns {TableBuilderHeaderBuilder<T>}
   * @memberof TableBuilderHeaderBuilder
   */
  public static builder<T>(
    text: string | (() => string) | TableHeader,
    context: TableDataContentBuilder<T>
  ): TableBuilderHeaderBuilder<T> {
    return new TableBuilderHeaderBuilder(text, context);
  }
}

/**
 * Builder responsável pela configuração do Content da coluna.
 *
 * Essa etapa da DSL é obrigatória após a definição do Header.
 * A coluna só é efetivamente registrada no contexto quando:
 *
 * - appendHeader(...) é chamado (inicia nova coluna)
 * - build() é chamado (finaliza construção)
 *
 * @template T Tipo do item da linha
 */
class TableBuilderContentBuilder<T> {

  /**
   * Cria uma instância do builder de Content.
   *
   * @param {TableHeader} header Header previamente configurado
   * @param {TableContent<T>} content Instância do conteúdo da célula
   * @param {TableDataContentBuilder<T>} context Contexto raiz da DSL
   * @memberof TableBuilderContentBuilder
   */
  constructor(
    private header: TableHeader,
    private content: TableContent<T>,
    private context: TableDataContentBuilder<T>
  ) {}

  /**
   * Finaliza a coluna atual registrando-a no contexto.
   *
   * @private
   * @return {void}
   * @memberof TableBuilderContentBuilder
   */
  private finalize(): void {
    this.context['columns'].push(
      new TableDataBuilderContent<T>(
        this.header,
        this.content
      )
    );
  }

  /**
   * Define a condição de renderização do conteúdo.
   *
   * @param {boolean} conditional Valor estático
   * @returns {this}
   * @memberof TableBuilderContentBuilder
   */
  public withConditional(conditional: boolean): this;

  /**
   * Define a condição de renderização do conteúdo
   * de forma dinâmica.
   *
   * @param {() => boolean} conditional Função condicional
   * @returns {this}
   * @memberof TableBuilderContentBuilder
   */
  public withConditional(conditional: () => boolean): this;

  public withConditional(
    conditional: boolean | (() => boolean)
  ): this {
    this.content.conditional = conditional;
    return this;
  }

  /**
   * Define a classe CSS aplicada ao conteúdo.
   *
   * @param {string} className Classe estática
   * @returns {this}
   * @memberof TableBuilderContentBuilder
   */
  public withClass(className: string): this;

  /**
   * Define a classe CSS de forma dinâmica.
   *
   * @param {() => string} className Função que resolve a classe
   * @returns {this}
   * @memberof TableBuilderContentBuilder
   */
  public withClass(className: () => string): this;

  public withClass(className: string | (() => string)): this {
    this.content.class = className;
    return this;
  }

  /**
   * Define estilos CSS estáticos para o conteúdo.
   *
   * @param {Partial<CSSStyleDeclaration>} style Objeto de estilo
   * @returns {this}
   * @memberof TableBuilderContentBuilder
   */
  public withStyle(style: Partial<CSSStyleDeclaration>): this;

  /**
   * Define estilos CSS dinâmicos para o conteúdo.
   *
   * @param {() => Partial<CSSStyleDeclaration>} style Função que resolve estilo
   * @returns {this}
   * @memberof TableBuilderContentBuilder
   */
  public withStyle(style: () => Partial<CSSStyleDeclaration>): this;

  public withStyle(
    style:
      | Partial<CSSStyleDeclaration>
      | (() => Partial<CSSStyleDeclaration>)
  ): this {
    this.content.style = style;
    return this;
  }

  /**
   * Define o handler de clique do conteúdo.
   *
   * @param {(item: T, event: PointerEvent) => void} handler
   * Função executada ao clicar na célula
   *
   * @returns {this}
   * @memberof TableBuilderContentBuilder
   */
  public withClick(
    handler: (item: T, event: PointerEvent) => void
  ): this {
    this.content.click = handler;
    return this;
  }

  /**
   * Finaliza a coluna atual e inicia a construção
   * de um novo Header.
   *
   * Essa chamada registra automaticamente a coluna
   * anterior no contexto.
   *
   * @param {string} text Texto estático
   * @returns {TableBuilderHeaderBuilder<T>}
   * @memberof TableBuilderContentBuilder
   */
  public appendHeader(text: string): TableBuilderHeaderBuilder<T>;

  /**
   * Finaliza a coluna atual e inicia novo Header
   * com texto dinâmico.
   *
   * @param {() => string} text Função que resolve texto
   * @returns {TableBuilderHeaderBuilder<T>}
   * @memberof TableBuilderContentBuilder
   */
  public appendHeader(text: () => string): TableBuilderHeaderBuilder<T>;

  /**
   * Finaliza a coluna atual e inicia novo Header
   * utilizando instância existente.
   *
   * @param {TableHeader} text Instância de TableHeader
   * @returns {TableBuilderHeaderBuilder<T>}
   * @memberof TableBuilderContentBuilder
   */
  public appendHeader(text: TableHeader): TableBuilderHeaderBuilder<T>;

  public appendHeader(
    text: string | (() => string) | TableHeader
  ): TableBuilderHeaderBuilder<T> {

    this.finalize();
    return TableBuilderHeaderBuilder.builder(text, this.context);
  }

  /**
   * Finaliza a última coluna e retorna todas
   * as colunas construídas.
   *
   * @returns {TableDataBuilderContent<T>[]}
   * @memberof TableBuilderContentBuilder
   */
  public build(): TableDataBuilderContent<T>[] {
    this.finalize();
    return this.context.build();
  }

  /**
   * Factory interna para criação do builder.
   *
   * @static
   * @template T
   * @param {TableHeader} header
   * @param {TableContent<T>} content
   * @param {TableDataContentBuilder<T>} context
   * @returns {TableBuilderContentBuilder<T>}
   * @memberof TableBuilderContentBuilder
   */
  public static builder<T>(
    header: TableHeader,
    content: TableContent<T>,
    context: TableDataContentBuilder<T>
  ): TableBuilderContentBuilder<T> {
    return new TableBuilderContentBuilder(
      header,
      content,
      context
    );
  }
}
