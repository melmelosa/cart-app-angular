import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { ADD, REMOVE, TOTAL } from "./items.actions";

export interface ItemsState {
    itemsCarro: CartItem[],
    total: number
}

//VALOR INICIAL
export const initialState: ItemsState = {
    itemsCarro: JSON.parse(sessionStorage.getItem('cart') || '[]'),
    total: 0
}

export const ITEMS_REDUCER = createReducer(
    initialState,
    on(ADD, (state, { productoAccion }) => {

        //compruebo si el producto ha sido añadido al carro 
        const isAdded = state.itemsCarro.find((item: CartItem) => {
            return item.product.id == productoAccion.id
        });
        //si está añadido aumento la cantidad sólo del seleccionado
        if (isAdded) {
            return {
                itemsCarro: state.itemsCarro.map((item: CartItem) => {
                    if (item.product.id == productoAccion.id) {
                        item.quantity++
                    }
                    return item;
                }),
                total: state.total
            }
        }
        else {
            return {
                itemsCarro: [...state.itemsCarro, { quantity: 1, product: { ...productoAccion } }],
                total: state.total
            };
        }
    }),
    on(REMOVE, (state, { idAccion }) => {
        return {
            itemsCarro: state.itemsCarro = state.itemsCarro.filter((item: CartItem) => {
                return item.product.id !== idAccion
            }),
            total: state.total
        }
    }),
    on(TOTAL, (state => {
        return {
            itemsCarro: state.itemsCarro,
            total: state.itemsCarro.reduce((totalAcumulado, item) =>
                totalAcumulado + (item.quantity * item.product.price), 0)
        }
    }))

)