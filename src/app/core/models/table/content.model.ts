import { Type } from '@angular/core';


/**
 * Builder responsável por construir múltiplos TableContent
 * de forma fluente e encadeável.
 *
 * @export
 * @class TableContentBuilder
 * @template T
 */
export class TableContentBuilder<T = unknown> {

  /**
   * Lista interna de conteúdos construídos.
   *
   * @type {TableContent<T>[]}
   * @memberof TableContentBuilder
   */
  private contents: TableContent<T>[] = [];

  /**
   * Conteúdo atualmente em construção.
   *
   * @type {TableContent<T>}
   * @memberof TableContentBuilder
   */
  private current!: TableContent<T>;

  // =====================================================
  // ===================== APPEND ========================
  // =====================================================

  /**
   * Adiciona um TableContent já existente.
   *
   * @param {TableContent<T>} content
   * @memberof TableContentBuilder
   */
  public append(content: TableContent<T>): this;

  /**
   * Adiciona conteúdo estático.
   *
   * @param {string} content
   * @memberof TableContentBuilder
   */
  public append(content: string): this;

  /**
   * Adiciona conteúdo dinâmico baseado no item.
   *
   * @param {(item: T) => string} content
   * @memberof TableContentBuilder
   */
  public append(content: (item: T) => string): this;

  /**
   * Adiciona componente estático.
   *
   * @param {Type<unknown>} component
   * @memberof TableContentBuilder
   */
  public append(component: Type<unknown>): this;

  /**
   * Adiciona componente dinâmico baseado no item.
   *
   * @param {(item: T) => Type<unknown>} componentFactory
   * @memberof TableContentBuilder
   */
  public append(componentFactory: (item: T) => Type<unknown>): this;

  public append(
    value:
      | TableContent<T>
      | string
      | ((item: T) => string)
      | Type<unknown>
      | ((item: T) => Type<unknown>)
  ): this {

    if (this.current) {
      this.contents.push(this.current);
    }

    if (value instanceof TableContent) {
      this.current = value;
      return this;
    }

    this.current = new TableContent<T>(value as any);
    return this;
  }

  // =====================================================
  // ===================== CONDITIONAL ===================
  // =====================================================

  /**
   * Define condição estática.
   *
   * @param {boolean} conditional
   * @memberof TableContentBuilder
   */
  public withConditional(conditional: boolean): this;

  /**
   * Define condição dinâmica.
   *
   * @param {() => boolean} conditional
   * @memberof TableContentBuilder
   */
  public withConditional(conditional: () => boolean): this;

  public withConditional(conditional: boolean | (() => boolean)): this {
    this.ensureCurrent();
    this.current.conditional = conditional;
    return this;
  }

  // =====================================================
  // ======================= CLASS =======================
  // =====================================================

  /**
   * Define classe CSS estática.
   *
   * @param {string} className
   * @memberof TableContentBuilder
   */
  public withClass(className: string): this;

  /**
   * Define classe CSS dinâmica.
   *
   * @param {() => string} className
   * @memberof TableContentBuilder
   */
  public withClass(className: () => string): this;

  public withClass(className: string | (() => string)): this {
    this.ensureCurrent();
    this.current.class = className;
    return this;
  }

  // =====================================================
  // ======================= STYLE =======================
  // =====================================================

  /**
   * Define estilo estático.
   *
   * @param {Partial<CSSStyleDeclaration>} style
   * @memberof TableContentBuilder
   */
  public withStyle(style: Partial<CSSStyleDeclaration>): this;

  /**
   * Define estilo dinâmico.
   *
   * @param {() => Partial<CSSStyleDeclaration>} style
   * @memberof TableContentBuilder
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
  // ======================= CLICK =======================
  // =====================================================

  /**
   * Define evento de clique da célula.
   *
   * @param {(item: T, event: PointerEvent) => void} handler
   * @memberof TableContentBuilder
   */
  public withClick(handler: (item: T, event: PointerEvent) => void): this {
    this.ensureCurrent();
    this.current.click = handler;
    return this;
  }

  // =====================================================
  // ======================= BUILD =======================
  // =====================================================

  /**
   * Finaliza e retorna a lista de conteúdos construídos.
   *
   * @returns {TableContent<T>[]}
   * @memberof TableContentBuilder
   */
  public build(): TableContent<T>[] {

    if (this.current) {
      this.contents.push(this.current);
      this.current = undefined as any;
    }

    return this.contents;
  }

  /**
   * Garante que exista um conteúdo atual.
   *
   * @private
   * @memberof TableContentBuilder
   */
  private ensureCurrent(): void {
    if (!this.current) {
      this.current = new TableContent<T>();
    }
  }
}


/**
 * Representa a configuração de conteúdo de uma célula da tabela.
 *
 * Permite conteúdo estático, dinâmico, baseado em componente
 * ou resolvido via factory baseada no item.
 *
 * @export
 * @class TableContent
 * @template T
 */
export class TableContent<T = unknown> {

  /**
   * Conteúdo da célula.
   *
   * Pode ser:
   * - string estática
   * - função que retorna string baseada no item
   * - um Component Type
   * - uma função que resolve dinamicamente um Component Type
   *
   * @type {string | ((item: T) => string) | Type<unknown> | ((item: T) => Type<unknown>)}
   * @memberof TableContent
   */
  public content!:
    | string
    | ((item: T) => string)
    | Type<unknown>
    | ((item: T) => Type<unknown>);

  /**
   * Define se a célula deve ser renderizada.
   *
   * @type {boolean | (() => boolean)}
   * @memberof TableContent
   */
  public conditional: boolean | ((item: T) => boolean) = true;

  /**
   * Classe CSS aplicada à célula.
   *
   * @type {string | (() => string) | undefined}
   * @memberof TableContent
   */
  public class?: string | (() => string);

  /**
   * Estilos CSS aplicados à célula.
   *
   * @type {Partial<CSSStyleDeclaration> | (() => Partial<CSSStyleDeclaration>) | undefined}
   * @memberof TableContent
   */
  public style?: Partial<CSSStyleDeclaration> | (() => Partial<CSSStyleDeclaration>);

  /**
   * Evento de clique associado à célula.
   *
   * @type {((item: T, event: PointerEvent) => void) | undefined}
   * @memberof TableContent
   */
  public click?: (item: T, event: PointerEvent) => void;

  // =====================================================
  // ================== OVERLOADS ========================
  // =====================================================

  constructor();

  constructor(config: Partial<TableContent<T>>);

  constructor(
    content:
      | string
      | ((item: T) => string)
      | Type<unknown>
      | ((item: T) => Type<unknown>)
  );

  constructor(
    content:
      | string
      | ((item: T) => string)
      | Type<unknown>
      | ((item: T) => Type<unknown>),
    conditional: boolean | (() => boolean)
  );

  constructor(
    content:
      | string
      | ((item: T) => string)
      | Type<unknown>
      | ((item: T) => Type<unknown>),
    conditional: boolean | (() => boolean),
    classText: string | (() => string)
  );

  constructor(
    content:
      | string
      | ((item: T) => string)
      | Type<unknown>
      | ((item: T) => Type<unknown>),
    conditional: boolean | (() => boolean),
    classText: string | (() => string),
    style: Partial<CSSStyleDeclaration> | (() => Partial<CSSStyleDeclaration>)
  );

  constructor(
    content:
      | string
      | ((item: T) => string)
      | Type<unknown>
      | ((item: T) => Type<unknown>),
    conditional: boolean | (() => boolean),
    classText: string | (() => string),
    style: Partial<CSSStyleDeclaration> | (() => Partial<CSSStyleDeclaration>),
    click: (item: T, event: PointerEvent) => void
  );

  // =====================================================
  // ================= IMPLEMENTAÇÃO =====================
  // =====================================================

  constructor(
    contentOrConfig?:
      | Partial<TableContent<T>>
      | string
      | ((item: T) => string)
      | Type<unknown>
      | ((item: T) => Type<unknown>),
    conditional: boolean | (() => boolean) = true,
    classText?: string | (() => string),
    style?: Partial<CSSStyleDeclaration> | (() => Partial<CSSStyleDeclaration>),
    click?: (item: T, event: PointerEvent) => void
  ) {

    if (typeof contentOrConfig === 'object'
      && contentOrConfig !== null
      && !(contentOrConfig instanceof Function)) {

      Object.assign(this, contentOrConfig);
      return;
    }

    if (contentOrConfig !== undefined) {
      this.content = contentOrConfig as any;
      this.conditional = conditional;
      this.class = classText;
      this.style = style;
      this.click = click;
    }
  }

  // =====================================================
  // ================== RESOLVERS ========================
  // =====================================================

  /**
   * Resolve o conteúdo final baseado no item.
   *
   * @param {T} item
   * @return {*}
   * @memberof TableContent
   */
  public resolveContent(item: T): string {
    if (typeof this.content === 'function') {
      return (this.content as any)(item);
    }
    return this.content;
  }

  /**
   * Resolve a condição final.
   *
   * @return {boolean}
   * @memberof TableContent
   */
  public resolveConditional(item: T): boolean {
    return typeof this.conditional === 'function'
      ? this.conditional(item)
      : this.conditional;
  }

  /**
   * Resolve a classe final.
   *
   * @return {(string | undefined)}
   * @memberof TableContent
   */
  public resolveClass(): string | undefined {
    return typeof this.class === 'function'
      ? this.class()
      : this.class;
  }

  /**
   * Resolve o estilo final.
   *
   * @return {(Partial<CSSStyleDeclaration> | undefined)}
   * @memberof TableContent
   */
  public resolveStyle(): Partial<CSSStyleDeclaration> | undefined {
    return typeof this.style === 'function'
      ? this.style()
      : this.style;
  }

  /**
   * Retorna a instancia do TableContentBuilder
   *
   * @static
   * @template T
   * @return {*}  {TableContentBuilder<T>}
   * @memberof TableContent
   */
  public static builder<T>(): TableContentBuilder<T> {
    return new TableContentBuilder();
  }

  /**
   * Retorna a classe Builder
   *
   * @static
   * @memberof TableContent
   */
  public static Builder = TableContentBuilder;
}
