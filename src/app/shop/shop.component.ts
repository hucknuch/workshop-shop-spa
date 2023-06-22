import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';

import { selectProducts } from '../store/product.reducer';
import { ProductActions } from '../store/product.actions';
import { Product } from '../models/product';

@Component({
  selector: 'wss-shop',
  standalone: true,
  imports: [ButtonModule, CommonModule, DataViewModule, FormsModule, RatingModule, TagModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products$ = this.store.select(selectProducts);
  layout: 'list' | 'grid' = 'list';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(ProductActions.getProducts());
  }

  getSeverity(product: Product): 'success' | 'info' | 'warning' | 'danger' {
    if (product.inventoryStatus === 'INSTOCK') {
      return 'success';
    } else {
      return 'danger';
    }
  }

  addToCart(product: Product): void {
    this.store.dispatch(ProductActions.addProductToCart({ product }));
  }
}
