import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { ITEMS_REDUCER } from './store/items.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { PRODUCT_REDUCER } from './store/product.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/products.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
        itemsReducer: ITEMS_REDUCER,
        productsReducer: PRODUCT_REDUCER
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(ProductsEffects)
]
};
