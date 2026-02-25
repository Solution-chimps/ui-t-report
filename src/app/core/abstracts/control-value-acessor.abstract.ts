import { AfterViewInit, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { auditTime } from 'rxjs';

import { Noop } from '../decorators/noop.decorator';
import { AbstractErrorMessage } from './error-message.abstract';

@Noop()
export abstract class AbstractControlValueAcessor<T> extends AbstractErrorMessage implements ControlValueAccessor, AfterViewInit {

  public value?: T = undefined;

  protected readonly ngControl = inject(NgControl, {
    optional: true,
    self: true
  });
  protected readonly destroyRef = inject(DestroyRef);
  public readonly disabled = signal(false);

  protected onTouched?: (...args: unknown[]) => void;
  protected onChange?: (...args: unknown[]) => void;


  constructor() {
    super();
    this.ngControl && (this.ngControl.valueAccessor = this);
  }
  public ngAfterViewInit(): void {
    this.ngControl?.control?.events.pipe(takeUntilDestroyed(this.destroyRef), auditTime(90)).subscribe(this.generate.bind(this))
  }

  public writeValue(obj: T): void {
    this.value = obj;
    this.onChange?.(obj);
    this.onTouched?.(obj)
    this.generate();
  }
  public registerOnChange(fn: (...args: unknown[]) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: (...args: unknown[]) => void): void {
    this.onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  public override generate(): void {
    if (!this.ngControl?.control || this.ngControl.control.untouched || !this.ngControl.control.errors) {
      this.destroyMessage();
      return;
    }
    super.generate(this.ngControl.control.errors)
  }

}

