import { Component, inject } from '@angular/core';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../shared/component/loader/loader.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, AsideComponent, FooterComponent, HeaderComponent, LoaderComponent, AsyncPipe ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  
  private loaderService = inject(LoaderService);
  loaderStatus$ = this.loaderService.loader$;
}
