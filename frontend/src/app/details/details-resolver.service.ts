import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Product} from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';
import { UserService } from '../core/services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DetailsResolver implements Resolve<Product> {
    constructor(
        private productService: ProductService,
        private router: Router,
        private userService: UserService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.productService.get_product(route.params['slug'])
        .pipe(catchError((err) => this.router.navigateByUrl('/')));
    }
}