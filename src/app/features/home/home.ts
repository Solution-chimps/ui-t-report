import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../../shared/header/header';

@Component({
  selector: 'ui-home',
  imports: [RouterOutlet, Header],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
