import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Get Products': emptyProps(),
    'Get Products Success': props<{ data: Product[] }>(),
    'Get Products Failure': props<{ error: unknown }>(),
    'Add Product to Cart': props<{ product: Product }>(),
  }
});
