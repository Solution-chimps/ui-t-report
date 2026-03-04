import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, DestroyRef, ElementRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent } from 'rxjs';


@Component({
  selector: '[ui-tooltip]',
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip implements AfterViewInit {

  public readonly message = input.required({
    alias: 'ui-tooltip',
  });
  public readonly placement = input<'top' | 'bottom' | 'left' | 'right'>('top');

  public readonly show = signal(false);

  private readonly elRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  public readonly styled = computed((): Partial<CSSStyleDeclaration> => {
    if (!this.show()) {
      return {}
    }
    const { left, top } = ({
      bottom: this.positionBottom.bind(this),
      left: this.positionLeft.bind(this),
      right: this.positionRight.bind(this),
      top: this.positionTop.bind(this),
    })[this.placement()]();
    return { transform: `translate(${left}px, ${top}px)` };
  })

  private root!: HTMLElement;

  public ngAfterViewInit(): void {
    this.root = this.elRef.nativeElement;
    this.root.tabIndex ??= -1;
    this.listenMouseOver();
    this.listenMouseLeave();
  }


  private listenMouseOver() {
    fromEvent(this.elRef.nativeElement, 'mouseover')
      .pipe(takeUntilDestroyed(this.destroyRef), filter(() => !!this.message()))
      .subscribe(() => {
        this.show.set(true)
      });
  }

  private listenMouseLeave() {
    fromEvent(this.elRef.nativeElement, 'mouseleave')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.show.set(false)
      });
  }

  private positionTop(): { top: number, left: number } {
    const { top, left, height, width } = this.root.getBoundingClientRect();
    return { left: left - (width / 2.5), top: top - height }
  }

  private positionBottom(): { top: number, left: number } {
    const { top, left, height, width } = this.root.getBoundingClientRect();
    return { left: left - (width * 2), top: top + (height - 28) }
  }

  private positionLeft(): { top: number, left: number } {
    const {} = this.root.getBoundingClientRect();
    return { left: 0, top: 0 }
  }

  private positionRight(): { top: number, left: number } {
    const { top, left, width } = this.root.getBoundingClientRect();
    return { left: left - (width * 2), top: top }
  }
}
