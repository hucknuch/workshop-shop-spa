import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCart } from '../store/product.reducer';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'wss-cart',
  standalone: true,
  imports: [ButtonModule, CommonModule, DataViewModule, FormsModule, RatingModule, TagModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cart$ = this.store.select(selectCart);

  constructor(private store: Store) {}
}
