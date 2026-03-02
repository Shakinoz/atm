import { Component, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Card } from '../../models/card';

@Component({
  selector: 'app-atm-card-selection',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './atm-card-selection.html',
  styleUrl: './atm-card-selection.scss',
})
export class AtmCardSelection {
  public readonly customers = JSON.parse(localStorage.getItem('customers') || '[]')

  public readonly onChooseCard = output<Card>();

  public chooseCard(card: Card): void {
    this.onChooseCard.emit(card);
  }
}
