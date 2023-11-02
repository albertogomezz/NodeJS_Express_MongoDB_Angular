import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';
import { User } from '../core/models/user.model';

@Component({
    selector: 'app-editor-page',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {
    product: Product = {} as Product;
    user: User = {} as User;
    productForm!: FormGroup;
    isSubmitting = false;
    name: any;
    actual_product: any;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {
        // use the FormBuilder to create a form group
        this.productForm = this.fb.group({
            name: '',
            description: '',
            price: ''
        });

        // Initialized tagList as empty array
        // this.article.tagList = [];

        // Optional: subscribe to value changes on the form
        // this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
    }

    ngOnInit() {
        this.route.data.subscribe(
            (data: any) => {
                // console.log(data);
                this.actual_product = data.product;
                console.log(this.actual_product);
                if (this.actual_product) {
                    this.productForm.patchValue(this.actual_product);
                }
            });
    }

    updateProduct(values: Object) {
        Object.assign(this.product, values);
    }

    submitForm() {
        this.isSubmitting = true;

        // update the model
        this.updateProduct(this.productForm.value);

        // console.log(this.product);
        // console.log(this.actual_product.slug);
        
        // hacia backend
        this.productService.update_product(this.product, this.actual_product.slug).subscribe(
            (product: any) => {
                console.log(product);
                this.router.navigateByUrl('/details/' + this.actual_product.slug);
            }
        );
    }
}