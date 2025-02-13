import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";

//props (enviar datos) en angular
//payload (generico de redux)
export const ADD = createAction('add', props<{productoAccion: Product}>() );
export const REMOVE = createAction('remove', props<{idAccion: number}>() );
export const TOTAL = createAction('total');