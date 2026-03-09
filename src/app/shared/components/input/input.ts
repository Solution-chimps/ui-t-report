import { Component, computed, ElementRef, input, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

import { AbstractControlValueAcessor } from '../../../core/abstracts/control-value-acessor.abstract';
import { InputType } from './input-type.enum';

export const SPECIAL_CHARACTERS: string[] = [
  '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+',
  ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@',
  '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~', ' '
];

@Component({
  selector: 'ui-input',
  imports: [FormsModule, NgxMaskDirective],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input extends AbstractControlValueAcessor<string | number | undefined> implements OnInit {

  public readonly label = input<string>();
  public readonly placeholder = input<string>('');
  public readonly type = input<InputType>('text');
  public readonly maxlength = input<`${number}` | number>(120);
  public readonly suffix = input<string>('');
  public readonly mask = input<string>('');
  public readonly prefix = input<string>('');
  public readonly thousandSeparator = input<string>(',');
  public readonly decimalMarker = input<'.' | ',' | ['.', ',']>('.');
  public readonly clearIfNotMatch = input<boolean>(false);
  public readonly showMaskTyped = input<boolean>(false);
  public readonly placeHolderCharacter = input<string>('_');
  public readonly shownMaskExpression = input<string>('');
  public readonly specialCharacters = input<string[] | readonly string[]>(SPECIAL_CHARACTERS);
  public readonly dropSpecialCharacters = input<boolean | string[] | readonly string[]>(true);
  public readonly hiddenInput = input<boolean>(false);
  public readonly validation = input<boolean>(true);
  public readonly instantPrefix = input<boolean>(false);
  public readonly separatorLimit = input<string>('');
  public readonly apm = input<boolean>(false);
  public readonly allowNegativeNumbers = input<boolean>(false);
  public readonly leadZeroDateTime = input<boolean>(false);
  public readonly leadZero = input<boolean>(false);
  public readonly triggerOnMaskChange = input<boolean>(false);
  public readonly keepCharacterPositions = input<boolean>(false);
  public readonly patterns = input<
    Record<string, {
      pattern: RegExp;
      optional?: boolean;
      symbol?: string;
    }>
  >();

  public readonly inputType = signal(this.type());

  @ViewChild('input') public input!: ElementRef<HTMLInputElement>;

  public readonly passwordIcon = computed(() => {
    if (this.inputType() === 'password') {
      return 'visibility'
    }
    return 'visibility_off'
  });

  public ngOnInit(): void {
    this.inputType.set(this.type());
  }

  public handleTogglePassword(): void {
    this.inputType.set(this.inputType() === 'password' ? 'text' : 'password')
  }

}
