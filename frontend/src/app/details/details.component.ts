import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgControlStatusGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

    product!: Product;
    slug!: string | null;

    constructor(
        private ProductService: ProductService,
        private ActivatedRoute: ActivatedRoute,
        private router: Router,
        // private ToastrService: ToastrService,
    ) { }

    ngOnInit(): void {
        this.slug = this.ActivatedRoute.snapshot.paramMap.get('slug');
        console.log(this.slug);
        this.get_product();
    }

    get_product() {
        if (typeof this.slug === 'string') {
            this.ProductService.get_product(this.slug).subscribe(
                (data : any) => {
                  this.product = data.products;
                  console.log(this.product)
              });
        }
        else{
            console.log('fallo al encontrar el producto');
            this.router.navigate(['/']);
        }
    }
}
