import { Component, inject } from '@angular/core';
import { IFilterTypeLogic, ITourTypes } from '../../models/tours';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ToursService } from '../../services/tours.service';

@Component({
  selector: 'app-aside',
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule
  ],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {

  selectedType: ITourTypes = 'all';
  tourService = inject(ToursService);

  tourTypes: IFilterTypeLogic[] = [
    { key: 'single', label: 'Одиночный' },
    { key: 'group', label: 'Групповой' },
    { key: 'all', label: 'Все' }
  ];

  chamgeTourType(ev: MatSelectChange): void {
    this.tourService.setTourType(ev.value);
  }

  changeDate(ev: any): void {
    const date = ev.value; // Date object
    this.tourService.setTourDate(date);
  }
}
