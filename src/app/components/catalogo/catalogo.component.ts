import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

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
    private productService: ProductService) {
  
  }

  ngOnInit(): void { 
      this.productosCatalogo = this.productService.findAll();
      console.log("Productos del catalogo", this.productosCatalogo)
  }

  addCart(producto: Product) {
    this.sharingData.productAddedEmmiter.emit(producto)

  }
}
