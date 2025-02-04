import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',

})
export class CartComponent {

  @Input() itemsCart : CartItem[] = [];
  @Input() subtotal : number = 0;
  @Output() productDeletedEmmiter = new EventEmitter();

  removeCart(id: number){
    this.productDeletedEmmiter.emit(id);

  }
} 
