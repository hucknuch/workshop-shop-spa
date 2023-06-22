export interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  inventoryStatus: 'INSTOCK';
  rating: number;
}