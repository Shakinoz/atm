import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-card-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './add-card-form.html',
  styleUrl: './add-card-form.scss',
})
export class AddCardForm {
  public readonly customers = JSON.parse(localStorage.getItem('customers') || '[]');
  private readonly _snackBar = inject(MatSnackBar);
  public readonly cardAdded = output<void>();

  public readonly cardForm = new FormGroup({
    customer: new FormControl<string | null>(null, [Validators.required]),
    cardNumber: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)
    ]),
    cardType: new FormControl<string | null>(null, [Validators.required]),
    bankType: new FormControl<string | null>(null, [Validators.required]),

    pin: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4)
    ]),
  });

  get customer() { return this.cardForm.get('customer') as FormControl; }
  get cardNumber() { return this.cardForm.get('cardNumber') as FormControl; }
  get cardType() { return this.cardForm.get('cardType') as FormControl; }
  get bankType() { return this.cardForm.get('bankType') as FormControl; }
  get pin() { return this.cardForm.get('pin') as FormControl; }

  public submitForm(): void {
    if (this.cardForm.valid) {

      const formValue = this.cardForm.value;
      const customer = this.customers.find((c: any) =>
        `${c._firstname} ${c._lastname}` === formValue.customer
      );

      if (customer) {
        const newCard = {
          _cardNumber: formValue.cardNumber,
          _type: formValue.cardType,
          _bank: formValue.bankType,
          _pin: formValue.pin,
          _balance: 0
        };

        customer._cards.push(newCard);

        localStorage.setItem('customers', JSON.stringify(this.customers));

        this._snackBar.open('La carte a bien été ajoutée !', '', {
          verticalPosition: 'top',
          duration: 2000,
        });

        this.cardAdded.emit();
      }
    }
  }
}