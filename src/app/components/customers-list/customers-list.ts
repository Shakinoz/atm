import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '../../models/card';
import { AddCardForm } from "../add-card-form/add-card-form";

@Component({
  selector: 'app-customers-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule, AddCardForm],
  templateUrl: './customers-list.html',
  styleUrl: './customers-list.scss',
})
export class CustomersList {
  public customers = JSON.parse(localStorage.getItem('customers') || '[]');
  public AddCardForm = false;

  public showAddCardForm(): void {
    this.AddCardForm = true;
  }

  public hideAddCardForm(): void {
    this.AddCardForm = false;
    this.customers = JSON.parse(localStorage.getItem('customers') || '[]');
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
