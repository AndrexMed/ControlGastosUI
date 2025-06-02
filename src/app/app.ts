import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './shared/components/nav/nav';
import { Aside } from './shared/components/aside/aside';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Aside],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ControlGastosUI';
}
