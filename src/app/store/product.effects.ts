import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ProductActions } from './product.actions';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';


@Injectable()
export class ProductEffects {

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getProducts),
      concatMap(() =>
        this.httpClient.get<{ data: Product[] }>('assets/products.json').pipe(
          map(({ data }) => ProductActions.getProductsSuccess({ data })),
          catchError(error => of(ProductActions.getProductsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
