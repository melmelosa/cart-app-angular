import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';



@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogoComponent, CartComponent, NavbarComponent, CartModalComponent],
  templateUrl: './cart-app.component.html',

})
export class CartAppComponent implements OnInit {

  productos: Product[] = []; //productos para el CATALOGO
  itemsCarro: CartItem[] = []; // productos para el CARRO
  total : number = 0; //importe total
  totalItems : number = 0; //total items en carro
  showCart :boolean = false; //flag para mostrar/ocultar carro

  constructor(private service: ProductService) {

  }

  ngOnInit(): void {
    this.productos = this.service.findAll();
    this.itemsCarro = JSON.parse(sessionStorage.getItem('cart') || '[]')// si es null array vacio
    this.calculateTotalCart(); //si quedaron articulos en el carro, calcula el valor
    this.countItems(); 
    
  }
  // AÑADIR ITEM AL CARRO
  addCart(producto: Product) : void {
    // console.log("Producto seleccionado para añadir: ", producto)
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
  }

  //ELIMINAR ITEM DEL CARRO
  removeCart(id: number): void {
    this.itemsCarro = this.itemsCarro.filter(item => {
     return item.product.id !== id
    })
    console.log( this.itemsCarro);
   this.calculateTotalCart();
   this.countItems();
   this.saveSession();
  }

  //CALCULA EL TOTAL DEL CARRO 
  calculateTotalCart(): void {
    this.total = this.itemsCarro.reduce( (totalAcumulado, item) => 
      totalAcumulado + (item.quantity * item.product.price ), 0 );
    console.log("El total ahora es:" , this.total)
  }
  countItems(){
    this.totalItems = this.itemsCarro.reduce((totalItems, item) =>
      totalItems + item.quantity, 0)
  }

  //GUARDA EL CARRO DE COMPRA EN STORAGE
  saveSession() : void {
  sessionStorage.setItem('cart', JSON.stringify(this.itemsCarro))
  }

  //MUESTRA/OCULTA EL CARRO SEGUN FLAG
  openCloseCart(): void{
    this.showCart = !this.showCart;
  }


}
