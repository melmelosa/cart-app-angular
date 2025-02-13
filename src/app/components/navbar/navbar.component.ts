import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  @Input() itemsCarroNav: CartItem [] = []; // productos dentro del carro
  @Input() totalItemsCarro: number = 0; //cantidad de items en carro
  @Input() totalCarro : number = 0; //importe total del carro

}
