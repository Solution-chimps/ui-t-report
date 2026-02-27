/**
 * Builder responsável por construir múltiplos TableHeader
 * de forma fluente e encadeável.
 *
 * @class TableHeaderBuilder
 */
class TableHeaderBuilder {

  /**
   * Lista interna de headers construídos.
   *
   * @type {TableHeader[]}
   * @memberof TableHeaderBuilder
   */
  private headers: TableHeader[] = [];

  /**
   * Header atualmente em construção.
   *
   * @type {TableHeader}
   * @memberof TableHeaderBuilder
   */
  private current!: TableHeader;

  // =====================================================
  // ===================== APPEND ========================
  // =====================================================

  /**
   * Adiciona um TableHeader já existente.
   *
   * @param {TableHeader} header
   * @memberof TableHeaderBuilder
   */
  public append(header: TableHeader): this;

  /**
   * Adiciona um header com texto estático.
   *
   * @param {string} text
   * @memberof TableHeaderBuilder
   */
  public append(text: string): this;

  /**
   * Adiciona um header com texto dinâmico.
   *
   * @param {() => string} text
   * @memberof TableHeaderBuilder
   */
  public append(text: () => string): this;

  public append(value: TableHeader | string | (() => string)): this {

    if (this.current) {
      this.headers.push(this.current);
    }

    if (value instanceof TableHeader) {
      this.current = value;
      return this;
    }

    this.current = new TableHeader(value as string);
    return this;
  }

  // =====================================================
  // ===================== TEXT ==========================
  // =====================================================

  /**
   * Define texto estático.
   *
   * @param {string} text
   * @memberof TableHeaderBuilder
   */
  public withText(text: string): this;

  /**
   * Define texto dinâmico.
   *
   * @param {() => string} text
   * @memberof TableHeaderBuilder
   */
  public withText(text: () => string): this;

  public withText(text: string | (() => string)): this {
    this.ensureCurrent();
    this.current.text = text;
    return this;
  }

  // =====================================================
  // ================== CONDITIONAL ======================
  // =====================================================

  /**
   * Define condição estática.
   *
   * @param {boolean} conditional
   * @memberof TableHeaderBuilder
   */
  public withConditional(conditional: boolean): this;

  /**
   * Define condição dinâmica.
   *
   * @param {() => boolean} conditional
   * @memberof TableHeaderBuilder
   */
  public withConditional(conditional: () => boolean): this;

  public withConditional(conditional: boolean | (() => boolean)): this {
    this.ensureCurrent();
    this.current.conditional = conditional;
    return this;
  }

  // =====================================================
  // ==================== ALIGNMENT ======================
  // =====================================================

  /**
   * Define alinhamento do header.
   *
   * @param {'left' | 'right' | 'center'} alignment
   * @memberof TableHeaderBuilder
   */
  public withAlignment(alignment: 'left' | 'right' | 'center'): this {
    this.ensureCurrent();
    this.current.alignment = alignment;
    return this;
  }

  // =====================================================
  // ====================== CLASS ========================
  // =====================================================

  /**
   * Define classe CSS estática.
   *
   * @param {string} className
   * @memberof TableHeaderBuilder
   */
  public withClass(className: string): this;

  /**
   * Define classe CSS dinâmica.
   *
   * @param {() => string} className
   * @memberof TableHeaderBuilder
   */
  public withClass(className: () => string): this;

  public withClass(className: string | (() => string)): this {
    this.ensureCurrent();
    this.current.class = className;
    return this;
  }

  // =====================================================
  // ====================== STYLE ========================
  // =====================================================

  /**
   * Define estilo estático.
   *
   * @param {Partial<CSSStyleDeclaration>} style
   * @memberof TableHeaderBuilder
   */
  public withStyle(style: Partial<CSSStyleDeclaration>): this;

  /**
   * Define estilo dinâmico.
   *
   * @param {() => Partial<CSSStyleDeclaration>} style
   * @memberof TableHeaderBuilder
   */
  public withStyle(style: () => Partial<CSSStyleDeclaration>): this;

  public withStyle(
    style: Partial<CSSStyleDeclaration> | (() => Partial<CSSStyleDeclaration>)
  ): this {
    this.ensureCurrent();
    this.current.style = style;
    return this;
  }

  // =====================================================
  // ==================== SORTABLE =======================
  // =====================================================

  /**
   * Define ordenação estática.
   *
   * @param {boolean} sortable
   * @memberof TableHeaderBuilder
   */
  public withSortable(sortable: boolean): this;

  /**
   * Define ordenação dinâmica.
   *
   * @param {() => boolean} sortable
   * @memberof TableHeaderBuilder
   */
  public withSortable(sortable: () => boolean): this;

  public withSortable(sortable: boolean | (() => boolean)): this {
    this.ensureCurrent();
    this.current.sortable = sortable;
    return this;
  }

  // =====================================================
  // ====================== CLICK ========================
  // =====================================================

  /**
   * Define evento de clique.
   *
   * @param {(event: MouseEvent) => void} handler
   * @memberof TableHeaderBuilder
   */
  public withClick(handler: (event: MouseEvent) => void): this {
    this.ensureCurrent();
    this.current.click = handler;
    return this;
  }

  // =====================================================
  // ======================= BUILD =======================
  // =====================================================

  /**
   * Finaliza e retorna a lista de headers construídos.
   *
   * @returns {TableHeader[]}
   * @memberof TableHeaderBuilder
   */
  public build(): TableHeader[] {

    if (this.current) {
      this.headers.push(this.current);
      this.current = undefined as any;
    }

    return this.headers;
  }

  /**
   * Garante que exista um header atual.
   *
   * @private
   * @memberof TableHeaderBuilder
   */
  private ensureCurrent(): void {
    if (!this.current) {
      this.current = new TableHeader();
    }
  }
}



/**
 * Representa a configuração de um cabeçalho de tabela.
 *
 * Permite valores estáticos ou dinâmicos (via função),
 * ideal para engines low-code onde propriedades podem
 * ser avaliadas sob demanda.
 */
export class TableHeader {

  /**
   * Texto exibido no cabeçalho.
   * Pode ser uma string estática ou uma função que retorna string.
   */
  public text?: string | (() => string);

  /**
   * Define se o cabeçalho deve ser renderizado.
   * Pode ser boolean estático ou função condicional.
   * @default true
   */
  public conditional: boolean | (() => boolean) = true;

  /**
   * Define o alinhamento do conteudo da coluna
   *
   * @type {('left' | 'right' | 'center')}
   * @memberof TableHeader
   */
  public alignment?: 'left' | 'right' | 'center' = 'left';

  /**
   * Evento chamado ao clicar na header
   *
   * @memberof TableHeader
   */
  public click?: (event: MouseEvent) => void;

  /**
   * Estilos CSS aplicados ao cabeçalho.
   * Pode ser um objeto parcial de CSSStyleDeclaration
   * ou uma função que retorna esse objeto.
   */
  public style?: Partial<CSSStyleDeclaration> | (() => Partial<CSSStyleDeclaration>);

  /**
   * Classe CSS aplicada ao cabeçalho.
   * Pode ser estática ou dinâmica.
   */
  public class?: string | (() => string);

  /**
   * Define se a coluna é ordenável.
   * Pode ser estático ou dinâmico.
   */
  public sortable?: boolean | (() => boolean);

  // =====================================================
  // ================== OVERLOADS ========================
  // =====================================================

  /**
   * Cria um TableHeader vazio.
   */
  constructor();

  /**
   * Cria um TableHeader a partir de um objeto de configuração.
   * @param config Objeto parcial de configuração
   */
  constructor(config: TableHeader);

  /**
   * Cria um TableHeader com texto apenas.
   * @param text Texto do cabeçalho
   */
  constructor(text: string);

  /**
   * Cria um TableHeader com um callback que retorna um texto
   *
   * @param {() => string} text
   * @memberof TableHeader
   */
  constructor(text: () => string);

  /**
   * Cria um TableHeader com texto e condição.
   * @param text Texto do cabeçalho
   * @param conditional Condição de renderização
   */
  constructor(text: string, conditional: boolean | (() => boolean));

  /**
   * Cria um TableHeader com texto, condição e estilo.
   */
  constructor(
    text: string,
    conditional: boolean | (() => boolean),
    style: Partial<CSSStyleDeclaration> | (() => Partial<CSSStyleDeclaration>)
  );

  /**
   * Cria um TableHeader com texto, condição, estilo e classe CSS.
   */
  constructor(
    text: string,
    conditional: boolean | (() => boolean),
    style: Partial<CSSStyleDeclaration> | (() => Partial<CSSStyleDeclaration>),
    classText: string | (() => string)
  );

  /**
   * Cria um TableHeader completo com todas as propriedades.
   */
  constructor(
    text: string,
    conditional: boolean | (() => boolean),
    style: Partial<CSSStyleDeclaration> | (() => Partial<CSSStyleDeclaration>),
    classText: string | (() => string),
    sortable: boolean | (() => boolean)
  );

  // =====================================================
  // ============== IMPLEMENTAÇÃO REAL ===================
  // =====================================================

  constructor(
    textOrConfig?: string | Partial<TableHeader> | (() => string),
    conditional: boolean | (() => boolean) = true,
    style?: Partial<CSSStyleDeclaration> | (() => Partial<CSSStyleDeclaration>),
    classText?: string | (() => string),
    sortable?: boolean | (() => boolean)
  ) {

    if (typeof textOrConfig === 'object' && textOrConfig !== null) {
      Object.assign(this, textOrConfig);
      return;
    }
    this.text = textOrConfig;
    this.conditional = conditional;
    this.style = style;
    this.class = classText;
    this.sortable = sortable;
  }

  // =====================================================
  // ========= MÉTODOS UTILITÁRIOS OPCIONAIS ============
  // =====================================================

  /**
   * Resolve o valor final do texto.
   */
  public resolveText(): string | undefined {
    return typeof this.text === 'function' ? this.text() : this.text;
  }

  /**
   * Resolve a condição final.
   */
  public resolveConditional(): boolean {
    return typeof this.conditional === 'function'
      ? this.conditional()
      : this.conditional;
  }

  /**
   * Resolve o estilo final.
   */
  public resolveStyle(): Partial<CSSStyleDeclaration> {
    return typeof this.style === 'function'
      ? this.style()
      : this.style || {};
  }

  /**
   * Resolve a classe final.
   */
  public resolveClass(): string | undefined {
    return typeof this.class === 'function'
      ? this.class()
      : this.class;
  }

  /**
   * Resolve o valor de ordenação.
   */
  public resolveSortable(): boolean | undefined {
    return typeof this.sortable === 'function'
      ? this.sortable()
      : this.sortable;
  }
  /**
   * Retorna a instancia do builder do TableHeader
   *
   * @static
   * @return {*}  {Pick<TableHeaderBuilder, 'append'>}
   * @memberof TableHeader
   */
  public static builder(): Pick<TableHeaderBuilder, 'append'> {
    return new TableHeaderBuilder();
  }

  /**
   * Referencia da classe builder
   *
   * @static
   * @memberof TableHeader
   */
  public static Builder = TableHeaderBuilder;
}
