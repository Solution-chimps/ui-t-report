
/**
 * Representa a configuração de um botão de ação.
 *
 * @template T Tipo do item de contexto associado ao botão.
 */
export class TableButton<T = unknown> {

  /**
   * Ícone exibido no botão (ex: material symbols).
   */
  public icon?:
    | string
    | ((item: T) => string);

  /**
   * Tooltip do botão.
   */
  public tooltip?:
    | string
    | ((item: T) => string);

  /**
   * Controla se o botão será renderizado.
   */
  public conditional:
    | boolean
    | ((item: T) => boolean) = true;

  /**
   * Classe CSS aplicada ao botão.
   */
  public class?:
    | string
    | ((item: T) => string);

  /**
   * Estilos CSS aplicados ao botão.
   */
  public style?:
    | Partial<CSSStyleDeclaration>
    | ((item: T) => Partial<CSSStyleDeclaration>);

  /**
   * Evento de clique.
   */
  public click?: (item: T, event: PointerEvent) => void;

  constructor();

  constructor(config: Partial<TableButton<T>>);

  constructor(
    icon: string | ((item: T) => string)
  );

  constructor(
    icon?: any
  ) {
    if (typeof icon === 'object' && icon !== null) {
      Object.assign(this, icon);
      return;
    }

    if (icon) {
      this.icon = icon;
    }
  }

  // ================== RESOLVERS ==================

  public resolveIcon(item: T): string {
    return typeof this.icon === 'function'
      ? this.icon(item)
      : this.icon!;
  }

  public resolveTooltip(item: T): string | undefined {
    return typeof this.tooltip === 'function'
      ? this.tooltip(item)
      : this.tooltip;
  }

  public resolveConditional(item: T): boolean {
    return typeof this.conditional === 'function'
      ? this.conditional(item)
      : this.conditional;
  }

  public resolveClass(item: T): string | undefined {
    return typeof this.class === 'function'
      ? this.class(item)
      : this.class;
  }

  public resolveStyle(item: T): Partial<CSSStyleDeclaration> | undefined {
    return typeof this.style === 'function'
      ? this.style(item)
      : this.style;
  }

  /**
   * Retorna instancia do builder
   *
   * @static
   * @template T
   * @return {*}  {ButtonBuilder<T>}
   * @memberof TableButton
   */
  public static builder<T>(): ButtonBuilder<T> {
    return new ButtonBuilder();
  }
}

/**
 * Builder responsável por construir múltiplos TableButton
 * de forma fluente e encadeável.
 *
 * @template T Tipo do item associado aos botões.
 */
export class ButtonBuilder<T = unknown> {

  /**
   * Lista interna de botões construídos.
   *
   * @type {TableButton<T>[]}
   * @memberof ButtonBuilder
   */
  private buttons: TableButton<T>[] = [];

  /**
   * Botão atualmente em construção.
   *
   * @type {TableButton<T>}
   * @memberof ButtonBuilder
   */
  private current!: TableButton<T>;

  // =====================================================
  // ======================= APPEND ======================
  // =====================================================

  /**
   * Adiciona um TableButton já existente.
   *
   * @param {TableButton<T>} button
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public append(button: TableButton<T>): this;

  /**
   * Adiciona um botão com ícone estático.
   *
   * @param {string} icon
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public append(icon: string): this;

  /**
   * Adiciona um botão com ícone dinâmico baseado no item.
   *
   * @param {(item: T) => string} icon
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public append(icon: (item: T) => string): this;

  public append(
    value: TableButton<T> | string | ((item: T) => string)
  ): this {

    if (this.current) {
      this.buttons.push(this.current);
    }

    if (value instanceof TableButton) {
      this.current = value;
      return this;
    }

    this.current = new TableButton<T>();
    this.current.icon = value as any;

    return this;
  }

  // =====================================================
  // ======================== ICON =======================
  // =====================================================

  /**
   * Define um ícone estático para o botão atual.
   *
   * @param {string} icon
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withIcon(icon: string): this;

  /**
   * Define um ícone dinâmico baseado no item.
   *
   * @param {(item: T) => string} icon
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withIcon(icon: (item: T) => string): this;

  public withIcon(icon: string | ((item: T) => string)): this {
    this.ensureCurrent();
    this.current.icon = icon;
    return this;
  }

  // =====================================================
  // ====================== TOOLTIP ======================
  // =====================================================

  /**
   * Define tooltip estático.
   *
   * @param {string} text
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withTooltip(text: string): this;

  /**
   * Define tooltip dinâmico baseado no item.
   *
   * @param {(item: T) => string} text
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withTooltip(text: (item: T) => string): this;

  public withTooltip(text: string | ((item: T) => string)): this {
    this.ensureCurrent();
    this.current.tooltip = text;
    return this;
  }

  // =====================================================
  // ==================== CONDITIONAL ====================
  // =====================================================

  /**
   * Define condição estática de renderização.
   *
   * @param {boolean} value
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withConditional(value: boolean): this;

  /**
   * Define condição dinâmica baseada no item.
   *
   * @param {(item: T) => boolean} value
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withConditional(value: (item: T) => boolean): this;

  public withConditional(
    value: boolean | ((item: T) => boolean)
  ): this {
    this.ensureCurrent();
    this.current.conditional = value;
    return this;
  }

  // =====================================================
  // ======================== CLASS ======================
  // =====================================================

  /**
   * Define classe CSS estática.
   *
   * @param {string} className
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withClass(className: string): this;

  /**
   * Define classe CSS dinâmica baseada no item.
   *
   * @param {(item: T) => string} className
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withClass(className: (item: T) => string): this;

  public withClass(
    className: string | ((item: T) => string)
  ): this {
    this.ensureCurrent();
    this.current.class = className;
    return this;
  }

  // =====================================================
  // ======================== STYLE ======================
  // =====================================================

  /**
   * Define estilo CSS estático.
   *
   * @param {Partial<CSSStyleDeclaration>} style
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withStyle(style: Partial<CSSStyleDeclaration>): this;

  /**
   * Define estilo CSS dinâmico baseado no item.
   *
   * @param {(item: T) => Partial<CSSStyleDeclaration>} style
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withStyle(
    style: (item: T) => Partial<CSSStyleDeclaration>
  ): this;

  public withStyle(
    style:
      | Partial<CSSStyleDeclaration>
      | ((item: T) => Partial<CSSStyleDeclaration>)
  ): this {
    this.ensureCurrent();
    this.current.style = style;
    return this;
  }

  // =====================================================
  // ======================== CLICK ======================
  // =====================================================

  /**
   * Define o evento de clique do botão.
   *
   * @param {(item: T, event: PointerEvent) => void} handler
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withClick(
    handler: (item: T, event: PointerEvent) => void
  ): this {
    this.ensureCurrent();
    this.current.click = handler;
    return this;
  }

  // =====================================================
  // ======================== BUILD ======================
  // =====================================================

  /**
   * Finaliza o botão atual e retorna a lista de botões construídos.
   *
   * @returns {TableButton<T>[]}
   * @memberof ButtonBuilder
   */
  public build(): TableButton<T>[] {

    if (this.current) {
      this.buttons.push(this.current);
      this.current = undefined as any;
    }

    return this.buttons;
  }

  // =====================================================
  // ======================= PRIVATE =====================
  // =====================================================

  /**
   * Garante que exista um botão atual em construção.
   *
   * Caso não exista, cria um novo TableButton.
   *
   * @private
   * @memberof ButtonBuilder
   */
  private ensureCurrent(): void {
    if (!this.current) {
      this.current = new TableButton<T>();
    }
  }
}
