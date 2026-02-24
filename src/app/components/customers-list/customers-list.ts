import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '../../models/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-customers-list',
  imports: [MatCardModule, MatButtonModule,MatIconModule,NgIf],
  templateUrl: './customers-list.html',
  styleUrl: './customers-list.scss',
})
export class CustomersList {
  public readonly customers = JSON.parse(localStorage.getItem('customers') || '[]');
  public showEditForm:boolean = false;
  public selectedCard:Card | null = null;

  public showEditCardForm(cardNumber: string): void {
    this.showEditForm = true;
    this.selectedCard = this.customers.flatMap((customer: any) => customer.cards)
      .find((card: Card) => card.cardNumber === cardNumber);
  }

  public deleteCard(first_name:string,lastname: string, cardNumber:string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      const customer = this.customers.find((c: { _firstname: string; _lastname: string; }) => c._firstname === first_name && c._lastname === lastname);
      if (customer) {
        customer._cards = customer._cards.filter((card: { _cardNumber: string; }) => card._cardNumber !== cardNumber);
        localStorage.setItem('customers', JSON.stringify(this.customers));
      }
    }
  }
}
