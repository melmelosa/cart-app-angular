import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',

})
export class CartModalComponent {
  @Input() itemsCartModal : CartItem [] = [];
  @Input() totalModal : number = 0;

  @Output() productDeletedEmmiter = new EventEmitter();
  @Output() openCloseCartEmmiter = new EventEmitter();

  removeCart(id:number): void {
    this.productDeletedEmmiter.emit(id);
  }

  //CERRAR MODAL
  openCart(): void {
    this.openCloseCartEmmiter.emit();
  }
}
