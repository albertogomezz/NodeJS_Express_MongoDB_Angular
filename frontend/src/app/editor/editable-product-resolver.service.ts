import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Product } from '../core/models/product.model';
import { ProductService} from '../core/services/product.service';
import { UserService } from '../core/services/user.service';
import { catchError ,  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditableProductResolver implements Resolve<Product> {
  product: any;
  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    


    return this.productService.get_product(route.params['slug']).pipe(
        map((data: any) => {
            if (typeof route.params['slug'] === 'string') {
                this.product = data.products;
                if (this.userService.getCurrentUser().username === data.products.author.username) {
                    return this.product;
                } else {
                    console.log('error');
                    return 'error';
                }
            }else{
                console.log('fallo al encontrar el producto');
                this.router.navigate(['/']);
            }
        })
    );
}
}