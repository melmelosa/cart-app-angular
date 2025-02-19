import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { ADD, REMOVE, TOTAL } from '../store/items.actions';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',

})

export class CartAppComponent implements OnInit {

  productos: Product[] = []; //productos para el CATALOGO
  itemsCarro: CartItem[] = []; // productos para el CARRO
  totalItems: number = 0; //total items en carro

  constructor(
    private router: Router,
    //usar misma clave que defini en app.config
    private store: Store<{ itemsReducer: ItemsState }>,
    private sharingDataService: SharingDataService) {
    this.store.select('itemsReducer').subscribe(state => {
      this.itemsCarro = state.itemsCarro;
      this.saveSession();
    })
  }

  ngOnInit(): void {
    this.countItems();
    this.removeCart();
    this.addCart();
  }

  // AÑADIR ITEM AL CARRO
  addCart(): void {
    //obtenemos el producto
    this.sharingDataService.productAddedEmmiter.subscribe(producto => {
      this.store.dispatch(ADD({ productoAccion: producto }));
      this.store.dispatch(TOTAL());

      this.countItems();
    })
  }

  //ELIMINAR ITEM DEL CARRO
  removeCart(): void {
    this.sharingDataService.productDeletedEmitter.subscribe(id => {
      this.store.dispatch(REMOVE({ idAccion: id }));
      this.store.dispatch(TOTAL());

      this.countItems();
      this.router.navigate(['/cart'])

    })

  }

  countItems() {
    this.totalItems = this.itemsCarro.reduce((totalItems, item) =>
      totalItems + item.quantity, 0)
  }

  //GUARDA EL CARRO DE COMPRA EN SESSIONSTORAGE
  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.itemsCarro))
  }

}
