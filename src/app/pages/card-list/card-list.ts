import { Component } from '@angular/core';
import { CustomersList } from '../../components/customers-list/customers-list';
import { CUSTOMERS } from '../../models/data/customers.mock';

@Component({
  selector: 'app-card-list',
  imports: [CustomersList],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  constructor() {
    if (!localStorage.getItem('customers')) {
      localStorage.setItem('customers', JSON.stringify(CUSTOMERS));
    }
  }
}
