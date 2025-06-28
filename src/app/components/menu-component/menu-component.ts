import { Component, inject } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

export class App {}
@Component({
  selector: 'app-menu-component',
    imports: [RouterLink],

  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css'
})
export class MenuComponent {
  private router = inject(Router);


  logout() {
   this.router.navigateByUrl('/login', {
    replaceUrl: true
    });
  }
}
