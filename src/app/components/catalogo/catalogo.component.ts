import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCartComponent } from '../product-cart/product-cart.component';

@Component({
  selector: 'catalogo',
  standalone: true,
  imports: [ProductCartComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  @Input() productsCatalogo! : Product[]
  @Output() productAdded : EventEmitter<Product> = new EventEmitter();

  addCart(producto : Product){
    this.productAdded.emit(producto);

  }
}
