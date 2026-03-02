import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Card } from '../../models/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AtmStep } from '../../models/enums/atm-step.enum';

export function isMultiple(num: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = Number(control.value);
    return value % num === 0 ? null : { isMultiple: { value: control.value } };
  };
}

@Component({
  selector: 'app-atm-actions-menu',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './atm-actions-menu.html',
  styleUrl: './atm-actions-menu.scss',
})
export class AtmActionsMenu {
  private readonly _snackBar = inject(MatSnackBar);
  public readonly currentCard = input.required<Card>();
  public readonly onLeave = output<AtmStep>();

  public readonly withdrawal = new FormControl(null, [
    Validators.required,
    Validators.min(5),
    isMultiple(5),
  ]);

  public readonly deposit = new FormControl(null, [
    Validators.required,
    Validators.min(5),
    isMultiple(5),
  ]);

  private withdrawalMaxValidationRef?: ValidatorFn;

  constructor() {
    effect(() => {
      this.updateValidatorMaximum();
    });
  }

  public handleDeposit(): void {
    this.currentCard().deposit(this.deposit.value!);
    this.saveCardToLocalStorage();
    this.deposit.reset();

    this._snackBar.open('Le dépot est bien validé !', '', {
      verticalPosition: 'top',
      duration: 2000,
    });
    this.updateValidatorMaximum();
  }

  public handleWithdrawl(): void {
    this.currentCard().withdrawal(this.withdrawal.value!);
    this.saveCardToLocalStorage();
    this.withdrawal.reset();

    this._snackBar.open('Le retrait est bien validé !', '', {
      verticalPosition: 'top',
      duration: 2000,
    });
    this.updateValidatorMaximum();
  }

  private updateValidatorMaximum(): void {
    if (this.withdrawalMaxValidationRef) {
      this.withdrawal.removeValidators(this.withdrawalMaxValidationRef);
    }

    this.withdrawalMaxValidationRef = Validators.max(this.currentCard().balance);

    this.withdrawal.addValidators(this.withdrawalMaxValidationRef);
    this.withdrawal.updateValueAndValidity();
  }

  public handleLeave():void {
    this.onLeave.emit(AtmStep.LANDING)
  }

  private saveCardToLocalStorage(): void {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const card = this.currentCard();
    
    for (const customer of customers) {
      const cardIndex = customer._cards.findIndex(
        (c: any) => c._cardNumber === card.cardNumber
      );
      if (cardIndex !== -1) {
        customer._cards[cardIndex]._balance = card.balance;
        break;
      }
    }
    
    localStorage.setItem('customers', JSON.stringify(customers));
  }
}
