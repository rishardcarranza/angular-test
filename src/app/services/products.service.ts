import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    loading:boolean = true;
    products: Product[] = [];

    constructor(private http: HttpClient) {
        this.loadProducts();
    }

    private loadProducts() {
        this.http.get('https://angular-html-edfdb.firebaseio.com/products_idx.json')
            .subscribe((resp: Product[]) => {
                this.products = resp;
                this.loading = false;
                // setTimeout(() => {
                // }, 2000);
            }
        );
    }
}
