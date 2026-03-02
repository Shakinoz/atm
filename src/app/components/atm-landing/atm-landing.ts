import { Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-atm-landing',
  imports: [MatButton, MatIcon],
  templateUrl: './atm-landing.html',
  styleUrl: './atm-landing.scss',
})
export class AtmLanding {
  public onNext = output<void>();

  public cardSelection(): void {
    this.onNext.emit();
  }
}
