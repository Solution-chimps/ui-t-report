import { Component, computed, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AbstractControlValueAcessor } from '../../../core/abstracts/control-value-acessor.abstract';
import { InputType } from './input-type.enum';

@Component({
  selector: 'ui-input',
  imports: [FormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input extends AbstractControlValueAcessor<string | number | undefined> implements OnInit {

  public readonly label = input<string>();
  public readonly placeholder = input<string>('');
  public readonly type = input<InputType>('text');
  public readonly maxlength = input<`${number}` | number>(120);

  public readonly inputType = signal(this.type());

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
