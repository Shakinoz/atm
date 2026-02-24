import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { AtmStep } from '../../models/enums/atm-step.enum';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-pin-pad',
  imports: [MatGridList, MatButtonModule, MatGridTile, MatIcon],
  templateUrl: './pin-pad.html',
  styleUrl: './pin-pad.scss',
})
export class PinPad {
  public readonly validatePin = output<string>();
  public readonly tiles = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '0', 'V'];
  public pin = '';
  public readonly onLeave = output<AtmStep>();

  handleClick(value: string): void {
    switch (value) {
      case 'X':
        this.pin = '';
        break;
      case 'V':
        if(this.pin.length === 4) {
          this.validatePin.emit(this.pin);
        }
        break;
      default: {
        if (this.pin.length < 4) {
          this.pin += value;
        }
        break;
      }
    }
  }

  public handleLeave():void {
    this.onLeave.emit(AtmStep.LANDING);
  }
}
