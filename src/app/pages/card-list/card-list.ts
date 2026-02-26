import { Component } from '@angular/core';
import { CustomersList } from '../../components/customers-list/customers-list';

@Component({
  selector: 'app-card-list',
  imports: [CustomersList],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  
}
