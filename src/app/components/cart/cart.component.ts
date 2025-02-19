import { Component, EventEmitter, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { ItemsState } from '../../store/items.reducer';
import { Store } from '@ngrx/store';
import { TOTAL } from '../../store/items.actions';


@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',

})
export class CartComponent implements OnInit {

  itemsCart: CartItem[] = [];
  totalCart: number = 0;


  constructor(
    private _sharingDataService: SharingDataService,
    //usar misma clave que defini en app.config
    private store: Store<{ itemsReducer: ItemsState }>) {
    this.store.select('itemsReducer').subscribe(state => {
      this.itemsCart = state.itemsCarro;
      this.totalCart = state.total;
    })

  }
  ngOnInit(): void {
   this.store.dispatch(TOTAL());
  }

  removeCart(id: number) {
    this._sharingDataService.productDeletedEmitter.emit(id)
  }
} 
