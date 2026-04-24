import { Component, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common'; 
import { ActivatedRoute, RouterLink } from '@angular/router'; 
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { ToursService } from '../../services/tours.service';
import { UserService } from '../../services/user.service';
import { ITour, IOrder } from '../../models/tours';


import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker'; 
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
  
    RouterLink, 
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    DatePickerModule,
    ButtonModule,
    NgTemplateOutlet, // Добавили, если планируете использовать шаблоны
    
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  tourId: string | null = null;
  tour: ITour | null = null;
  userForm!: FormGroup;

  // Массив полей как у автора (только нужные данные)
  userFormFiledsArr = [
    { label: 'Имя', placeHolder: 'Введите имя', control: 'firstName' },
    { label: 'Фамилия', placeHolder: 'Введите фамилию', control: 'lastName' },
    { label: 'Номер карты', placeHolder: 'Введите номер карты', control: 'cardNumber' },
    { label: 'Гражданство', placeHolder: 'Введите гражданство', control: 'citizenship' }  
  ];

  constructor(
    private tourService: ToursService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    
    if (this.tourId) {
      this.tourService.getTourById(this.tourId).subscribe((tour: ITour) => {
        this.tour = tour;
      });
    }

    this.userForm = new FormGroup({
      firstName: new FormControl('', { validators: Validators.required }),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cardNumber: new FormControl(''),
      birthDate: new FormControl(''),
      age: new FormControl(''),
      citizenship: new FormControl(''),
    });
  }

  initOrder(): void {
    const user = this.userService.getUser();
    const userLogin = user ? user.login : 'guest';
    const personalData = this.userForm.getRawValue();
    
    const postObj: IOrder = {
      userLogin,
      tourId: this.tourId,
      personalData: [personalData]
    };

    this.tourService.postOrder(postObj).subscribe({
      next: () => alert('Заказ оформлен!'),
      error: (err) => console.error('Ошибка при отправке:', err)
    });
  }
}
