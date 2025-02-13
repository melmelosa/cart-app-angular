import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _productDeletedEmitter: EventEmitter<number> = new EventEmitter();
  private _productAddedEmitter: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  get productDeletedEmitter(): EventEmitter<number> {
    return this._productDeletedEmitter;
  }


  get productAddedEmmiter(): EventEmitter<Product> {
    return this._productAddedEmitter
  }
}
