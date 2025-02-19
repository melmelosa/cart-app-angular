import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/product.service";
import { LOAD, LOAD_ALL } from "../product.actions";
import { EMPTY, catchError, exhaustMap, map, of } from "rxjs";



@Injectable()
export class ProductsEffects {
    loadProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LOAD),
            exhaustMap(() => 
                this.service.findAll().pipe(  
                    map(productosEffect => LOAD_ALL({ productosAccion: productosEffect })), //devuelve un OBSERVABLE
                    catchError(error => EMPTY)
                )
            )
        )
    );

    constructor(
        //variable componente reactivo (Observable) finalizada con $
        private actions$: Actions,
        private service: ProductService) {

    }

}
