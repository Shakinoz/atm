import { Component } from '@angular/core';
import { Toolbar } from './components/toolbar/toolbar';
import { RouterOutlet } from '@angular/router';
import { CUSTOMERS } from './models/data/customers.mock';

@Component({
  selector: 'app-root',
  imports: [Toolbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public readonly appName = "My super ATM App !"
  
  constructor() {
    if (!localStorage.getItem('customers')) {
      localStorage.setItem('customers', JSON.stringify(CUSTOMERS));
    }
  }
}
