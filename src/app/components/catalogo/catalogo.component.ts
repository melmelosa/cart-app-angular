import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { LOAD, LOAD_ALL } from '../../store/product.actions';

@Component({
  selector: 'catalogo',
  standalone: true,
  imports: [ProductCartComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  productosCatalogo?: Product[];

  constructor(
    private sharingData: SharingDataService,
    private productService: ProductService,
    private store: Store<{ productsReducer: { productos: Product[] }}> ) {
    
      this.store.select('productsReducer').subscribe(state =>
      this.productosCatalogo = state.productos)
  }

  ngOnInit(): void {
    //this.store.dispatch(LOAD_ALL({productosAccion: this.productService.findAll()}))
    this.store.dispatch(LOAD ());
  }

  addCart(producto: Product) {
    this.sharingData.productAddedEmmiter.emit(producto)
  }
}
