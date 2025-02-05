import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  //@Input() itemsCarroNav: CartItem [] = [];
  @Input() itemsCarroNav: number = 0;
  @Output() openCloseCartEmmiter = new EventEmitter();

  openCloseCart(): void {
    this.openCloseCartEmmiter.emit();
  }

}
