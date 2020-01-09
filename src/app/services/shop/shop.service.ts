import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../../models/shop/product';
import { CartList } from '../../models/shop/cartList';

import { mockProducts } from './mock/mockProducts';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private cartList = new CartList();
  private cartListSubject: Subject<CartList> = new Subject<CartList>();

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(mockProducts);
  }

  getProductById(id: number): Observable<Product> {
    return this.getProducts().pipe(
      map((products: Product[]) => products.find(product => product.id === +id))
    );
  }

  getCartList(): Observable<CartList> {
    return this.cartListSubject.asObservable();
  }

  addCartItem(product: Product): void {
    this.cartList.productsList.push(product);
    this.cartListSubject.next(this.cartList);
  }
}