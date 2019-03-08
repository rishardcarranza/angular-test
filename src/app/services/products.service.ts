import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    loading:boolean = true;
    products: Product[] = [];
    productsFiltered: Product[] = [];

    constructor(private http: HttpClient) {
        this.loadProducts();
    }

    private loadProducts() {

        return new Promise((resolve, reject) => {
            this.http.get('https://angular-html-edfdb.firebaseio.com/products_idx.json')
                .subscribe((resp: Product[]) => {
                    this.products = resp;
                    this.loading = false;
                    resolve();
                }
            );
        });
    }

    public getProduct(id: string) {
        
        return this.http.get(`https://angular-html-edfdb.firebaseio.com/products/${id}.json`);

    }

    public searchProduct(value: string) {

        if (this.products.length === 0) {
            // Load products
            this.loadProducts().then( () => {
                // After get the products, apply filter
                this.filterProducts(value);
            });
        } else {
            // Apply the filter
            this.filterProducts(value);
        }
    }

    private filterProducts(value: string) {
        this.productsFiltered = [];

        value = value.toLowerCase();

        this.products.forEach(product => {
            const lowerTitle = product.titulo.toLowerCase();

            if (product.categoria.indexOf(value) >= 0 || lowerTitle.indexOf(value) >= 0) {
                this.productsFiltered.push(product);
            }
        });
    }
}
