import { ElementRef, inject, Renderer2, SecurityContext } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { ERROR_MESSAGES } from '../constants/error-message.constants';

export abstract class AbstractErrorMessage {

  protected readonly renderable = inject(Renderer2);
  protected readonly sanitizer = inject(DomSanitizer);
  protected readonly elRef: ElementRef<HTMLElement> = inject(ElementRef);
  protected getMainElement(): HTMLElement | null {
    return this.elRef?.nativeElement?.querySelector('[mainelement]') || this.elRef?.nativeElement?.querySelector('[class^="ng-"]');
  };

  private messageContainer?: HTMLSpanElement;

  protected generate(error: Record<string, unknown> | ValidationErrors | null | undefined): void {
    const key = Object.keys(error || {}).at(0);
    const message = ERROR_MESSAGES.get(key || 'pattern') ?? ERROR_MESSAGES.get('pattern');
    const root = this.getMainElement();
    this.destroyMessage();
    if (!key || !message || !root) {
      return;
    }
    this.messageContainer = document.createElement('span');
    Object.assign(this.messageContainer.style, this.getStyleElement());
    this.messageContainer.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, message)!;
    root.after(this.messageContainer)
  }

  private getStyleElement(): Partial<CSSStyleDeclaration> {
    return {
      position: 'absolute',
      top: '100%',
      fontSize: '10px',
      left: '2px',
      fontWeight: '500',
      color: 'var(--ui-feedback-danger-500)',
      textAlign: 'start'
    }
  }

  protected destroyMessage() {
    this.messageContainer?.remove();
    this.messageContainer = undefined;
  }
}
