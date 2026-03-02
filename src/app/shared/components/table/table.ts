import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { TableButton } from '../../../core/models/table/buttons.model';
import { TableDataBuilderContent } from '../../../core/models/table/table-builder-content.model';
import { Tooltip } from '../tooltip/tooltip';

@Component({
  imports: [CommonModule, Tooltip],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<T = unknown> {

  public readonly items = input<T[]>([]);
  public readonly buttons = input<TableButton<T>[]>([]);
  public readonly title = input('');
  public readonly content = input<TableDataBuilderContent<T>[]>([]);

  public get window() {
    return window;
  }

}
