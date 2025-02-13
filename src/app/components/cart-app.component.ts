import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',

})

export class CartAppComponent implements OnInit {

  productos: Product[] = []; //productos para el CATALOGO
  itemsCarro: CartItem[] = []; // productos para el CARRO
  total: number = 0; //importe total
  totalItems: number = 0; //total items en carro

  constructor(private service: ProductService,
    private sharingDataService: SharingDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.itemsCarro = JSON.parse(sessionStorage.getItem('cart') || '[]')
    this.calculateTotalCart(); //si quedaron articulos en el carro, calcula el valor
    this.countItems();

    this.removeCart();
    this.addCart();

  }
  // AÑADIR ITEM AL CARRO
  addCart(): void {
    this.sharingDataService.productAddedEmmiter.subscribe(producto => {
      //compruebo si el producto ha sido añadido al carro 
      const isAdded = this.itemsCarro.find(item => {
        return item.product.id == producto.id
      });
      //si está añadido aumento la cantidad sólo del seleccionado
      if (isAdded) {
        const cartModified = this.itemsCarro.map(item => {
          if (item.product.id == producto.id) {
            item.quantity++
          }
          return item;
        })
      }
      else {
        //hace una copia de la instancia actual, y copia el producto (referencia distinta--- INMUTABILIDAD)
        this.itemsCarro = [...this.itemsCarro, { quantity: 1, product: { ...producto } }];
      }
      this.calculateTotalCart();
      this.countItems();
      this.saveSession();


    })
  }

  //ELIMINAR ITEM DEL CARRO
  removeCart(): void {
    this.sharingDataService.productDeletedEmitter.subscribe(id => {
      this.itemsCarro = this.itemsCarro.filter(item => {
        return item.product.id !== id
      })
      console.log(this.itemsCarro);
      this.calculateTotalCart();
      this.countItems();
      this.saveSession();

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/cart'], {
          state: { items: this.itemsCarro, total: this.total }
        })

      })

    })

  }

  //CALCULA EL TOTAL DEL CARRO 
  calculateTotalCart(): void {
    this.total = this.itemsCarro.reduce((totalAcumulado, item) =>
      totalAcumulado + (item.quantity * item.product.price), 0);
    //console.log("El total ahora es:", this.total)
  }
  countItems() {
    this.totalItems = this.itemsCarro.reduce((totalItems, item) =>
      totalItems + item.quantity, 0)
  }

  //GUARDA EL CARRO DE COMPRA EN STORAGE
  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.itemsCarro))
  }




}
