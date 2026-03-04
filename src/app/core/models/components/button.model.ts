
/**
 * Representa a configuração de um botão de ação.
 *
 */
export class Button {

  /**
   * Ícone exibido no botão (ex: material symbols).
   */
  public icon?:
    | string
    | (() => string);

  /**
   * Text exibido no botão
   */
  public text?:
    | string
    | (() => string);

  /**
   * Tooltip do botão.
   */
  public tooltip?:
    | string
    | (() => string);

  /**
   * Controla se o botão será renderizado.
   */
  public conditional:
    | boolean
    | (() => boolean) = true;

  /**
   * Classe CSS aplicada ao botão.
   */
  public class?:
    | string
    | (() => string);

  /**
   * Estilos CSS aplicados ao botão.
   */
  public style?:
    | Partial<CSSStyleDeclaration>
    | (() => Partial<CSSStyleDeclaration>);

  /**
   * Evento de clique.
   */
  public click?: (event: PointerEvent) => void;

  constructor();

  constructor(config: Partial<Button>);

  constructor(
    text: string | (() => string)
  );

  constructor(
    text?: any
  ) {
    if (typeof text === 'object' && text !== null) {
      Object.assign(this, text);
      return;
    }

    if (text) {
      this.text = text;
    }
  }

  // ================== RESOLVERS ==================

  public resolveIcon(): string {
    return typeof this.icon === 'function'
      ? this.icon()
      : this.icon!;
  }

  public resolveTooltip(): string | undefined {
    return typeof this.tooltip === 'function'
      ? this.tooltip()
      : this.tooltip;
  }

  public resolveText(): string | undefined {
    return typeof this.text === 'function'
      ? this.text()
      : this.text;
  }

  public resolveConditional(): boolean {
    return typeof this.conditional === 'function'
      ? this.conditional()
      : this.conditional;
  }

  public resolveClass(): string | undefined {
    return typeof this.class === 'function'
      ? this.class()
      : this.class;
  }

  public resolveStyle(): Partial<CSSStyleDeclaration> | undefined {
    return typeof this.style === 'function'
      ? this.style()
      : this.style;
  }

  /**
   * Retorna instancia do builder
   *
   * @static
   * @return {*}  {ButtonBuilder}
   * @memberof Button
   */
  public static builder(): ButtonBuilder {
    return new ButtonBuilder();
  }
}

/**
 * Builder responsável por construir múltiplos Button
 * de forma fluente e encadeável.
 *
 */
export class ButtonBuilder {

  /**
   * Lista interna de botões construídos.
   *
   * @type {Button[]}
   * @memberof ButtonBuilder
   */
  private buttons: Button[] = [];

  /**
   * Botão atualmente em construção.
   *
   * @type {Button}
   * @memberof ButtonBuilder
   */
  private current!: Button;

  // =====================================================
  // ======================= APPEND ======================
  // =====================================================

  /**
   * Adiciona um Button já existente.
   *
   * @param {Button} button
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public append(button: Button): this;

  /**
   * Adiciona um botão com texo estático.
   *
   * @param {string} text
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public append(text: string): this;

  /**
   * Adiciona um botão com ícone dinâmico baseado no item.
   *
   * @param {() => string} text
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public append(text: () => string): this;

  public append(
    value: Button | string | (() => string)
  ): this {

    if (this.current) {
      this.buttons.push(this.current);
    }

    if (value instanceof Button) {
      this.current = value;
      return this;
    }

    this.current = new Button();
    const text = value.toString();
    if (text?.at(0) === text.at(0)?.toLocaleLowerCase()) {
      this.current.icon = text;
    } else {
      this.current.text = text;
    }

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
   * @param {() => string} icon
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withIcon(icon: () => string): this;

  public withIcon(icon: string | (() => string)): this {
    this.ensureCurrent();
    this.current.icon = icon;
    return this;
  }

  // =====================================================
  // ======================  TEXTO  ======================
  // =====================================================

  /**
   * Define um texto estático para o botão atual.
   *
   * @param {string} text
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withText(text: string): this;

  /**
   * Define um texto dinâmico baseado no item.
   *
   * @param {() => string} text
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withText(text: () => string): this;

  public withText(text: string | (() => string)): this {
    this.ensureCurrent();
    this.current.text = text;
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
   * @param {() => string} text
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withTooltip(text: () => string): this;

  public withTooltip(text: string | (() => string)): this {
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
   * @param {() => boolean} value
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withConditional(value: () => boolean): this;

  public withConditional(
    value: boolean | (() => boolean)
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
   * @param {() => string} className
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withClass(className: () => string): this;

  public withClass(
    className: string | (() => string)
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
   * @param {() => Partial<CSSStyleDeclaration>} style
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withStyle(
    style: () => Partial<CSSStyleDeclaration>
  ): this;

  public withStyle(
    style:
      | Partial<CSSStyleDeclaration>
      | (() => Partial<CSSStyleDeclaration>)
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
   * @param {(, event: PointerEvent) => void} handler
   * @returns {this}
   * @memberof ButtonBuilder
   */
  public withClick(
    handler: (event: PointerEvent) => void
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
   * @returns {Button[]}
   * @memberof ButtonBuilder
   */
  public build(): Button[] {

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
   * Caso não exista, cria um novo Button.
   *
   * @private
   * @memberof ButtonBuilder
   */
  private ensureCurrent(): void {
    if (!this.current) {
      this.current = new Button();
    }
  }
}
