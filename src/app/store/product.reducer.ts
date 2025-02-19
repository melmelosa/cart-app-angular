import { createReducer, on } from '@ngrx/store';
import { LOAD, LOAD_ALL } from './product.actions';  // Asegúrate de importar la acción correctamente
import { Product } from '../models/product';

// Estado inicial
export const initialState: { productos: Product[] } = {
    productos: []  // Inicializas un array vacío de productos
};



export const PRODUCT_REDUCER = createReducer(
    initialState,
    on(LOAD, (state) => ({ productos: [...state.productos] })),
    on(LOAD_ALL, (state, { productosAccion }) => ( {productos: [...productosAccion]} )));