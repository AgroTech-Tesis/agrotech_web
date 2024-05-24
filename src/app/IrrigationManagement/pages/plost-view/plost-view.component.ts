import { Component } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'plost-view',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './plost-view.component.html',
  styleUrl: './plost-view.component.css'
})
export class PlostViewComponent {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: any[] = [
    {name: 'Parcela 1'},
    {name: 'Parcela 2'},
    {name: 'Parcela 3'},
    {name: 'Parcela 4'},
    {name: 'Parcela 5'},
    {name: 'Parcela 6'}];
  addOnBlur = true;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}
