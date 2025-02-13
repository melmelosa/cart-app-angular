import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';


@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',

})
export class CartComponent {

  itemsCart: CartItem[] = [];
  totalCart: number = 0;
 

  //OBTENER LOS ITEMS DEL COMPONENTE NAVBAR
  constructor(private router : Router, 
    private _sharingDataService : SharingDataService ){
    this.itemsCart = this.router.getCurrentNavigation()?.extras.state?.['items'];
    this.totalCart = this.router.getCurrentNavigation()?.extras.state?.['totalCarro']
  }

  removeCart(id: number) {
    this._sharingDataService.productDeletedEmitter.emit(id)
  }
} 
