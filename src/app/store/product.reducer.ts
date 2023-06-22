import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

export const productFeatureKey = 'product';

export interface State {
  products: Product[];
  productsPending: boolean;
  cart: CartItem[];
}

export const initialState: State = {
  products: [],
  productsPending: false,
  cart: [],
};

export const reducer = createReducer(
  initialState,
  on(ProductActions.getProducts, state => ({ ...state, productsPending: true })),
  on(ProductActions.getProductsSuccess, (state, action) => ({ ...state, products: action.data, productsPending: false })),
  on(ProductActions.getProductsFailure, (state, _) => ({ ...state, productsPending: false })),
  on(ProductActions.addProductToCart, (state, action) => {
    const product = action.product;
    const oldCart = state.cart;
    const itemIndex = oldCart.findIndex((item) => item.product.id === product.id);

    let cart: CartItem[];
    if (itemIndex === -1) {
      cart = [...oldCart, { product, count: 1 }];
    } else {
      cart = oldCart.map((item, i) => {
        if (i === itemIndex) {
          return { ...item, count: item.count + 1 };
        } else {
          return item;
        }
      });
    }

    return { ...state, cart };
  }),
);

export const productFeature = createFeature({
  name: productFeatureKey,
  reducer,
});

export const {
  selectProducts,
  selectProductsPending,
  selectCart,
} = productFeature;

