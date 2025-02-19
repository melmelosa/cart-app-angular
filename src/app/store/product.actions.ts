import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";

export const LOAD = createAction('[Catalogo Component] Load');

export const LOAD_ALL = createAction(
    '[Catalogo Component] Load All Products',
    props<{ productosAccion: Product[] }>());