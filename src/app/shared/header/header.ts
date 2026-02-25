import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { noop } from 'rxjs';

import { HeaderItem } from '../../core/models/header.model';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'ui-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  public readonly items = HeaderItem
    .append({
      name: 'Usuários',
      onclick: noop
    })
    .append({
      name: 'Empresas',
      onclick: noop,
    })
    .append({
      name: 'Relatórios',
      onclick: noop
    })
    .append({
      name: 'QR Code',
      onclick: noop
    }).build();

  public readonly user = signal(User.getUserLogged());

  public readonly initials = computed(() => this.user()?.name?.split(' ').map(word => word.at(0)?.toLocaleUpperCase()).join('') || '')
}
