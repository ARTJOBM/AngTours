import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { NgIf, AsyncPipe  } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  loader$ = inject(LoaderService).loader$;

  title = 'AngTours';
  
}
