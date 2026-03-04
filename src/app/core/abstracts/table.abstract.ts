import {
  AfterViewInit,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  inject,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';

import { Table } from '../../shared/components/table/table';
import { Noop } from '../decorators/noop.decorator';
import { Button } from '../models/components/button.model';
import { TableButton } from '../models/table/buttons.model';
import { TableDataBuilderContent } from '../models/table/table-builder-content.model';

type UnwrapInputSignal<T> =
  T extends { (): infer R } ? R : T;

@Noop()
export abstract class AbstractTable<T = unknown> implements AfterViewInit {


  protected abstract readonly items: WritableSignal<T[]>;

  protected readonly viewContainerRef = inject(ViewContainerRef);
  protected readonly elRef: ElementRef<HTMLElement> = inject(ElementRef);
  protected readonly router = inject(Router);

  private ref?: ComponentRef<Table<T>>;
  public ngAfterViewInit(): void {
    this.ref = this.viewContainerRef.createComponent(Table<T>);
    const domElem = (this.ref.hostView as EmbeddedViewRef<HTMLElement>)
      .rootNodes[0] as HTMLElement;
    this.setInput('items', this.items());
    this.setInput('buttons', this.tableButtons());
    this.setInput('topButtons', this.buttons());
    this.setInput('content', this.buildContent())
    this.setInput('title', this.title())
    this.elRef.nativeElement.appendChild(domElem);
  }

  public abstract title(): string;

  protected abstract buildContent(): TableDataBuilderContent<T>[];

  protected tableButtons(): TableButton<T>[] {
    return []
  }

  protected buttons(): Button[] {
    return []
  }

  private setInput<K extends keyof Table>(key: K, value: UnwrapInputSignal<Table<T>[K]>): void {
    this.ref?.setInput(key, value);
  }

}
