import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-layout',

  standalone: true,

  imports: [
    RouterLink,
    RouterOutlet,
    NavbarComponent
    
  ],

  templateUrl: './layout.html',

  styleUrls: ['./layout.css']
})
export class LayoutComponent {

}