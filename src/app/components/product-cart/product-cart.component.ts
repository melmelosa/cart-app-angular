import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-cart',
  standalone: true,
  imports: [],
  templateUrl: './product-cart.component.html',

})
export class ProductCartComponent {
  @Input() productCart! : Product;
  @Output() productAdded : EventEmitter<Product> = new EventEmitter();

  addCart(producto : Product){
    this.productAdded.emit(producto);

  }

}
