import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { Product } from '../../core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {

  @Input() products: Product = {} as Product;
  @Output() toggle = new EventEmitter<boolean>();

  isSubmitting = false;
  isLoged: Boolean = false;

  constructor(
    private UserService: UserService,
    private ProductService: ProductService,
    private Router: Router,
  ) { }

  ngOnInit(): void { }

  toggleFavorite() {
    this.isSubmitting = true;
    this.UserService.isAuthenticated.subscribe({
        next: data => this.isLoged = data,
    });

    if (!this.isLoged) {
        setTimeout(() => { this.Router.navigate(['/login']); }, 600);
    } else {
      
      if (!this.products.favorited) {
        this.ProductService.favorite(this.products.slug as String).subscribe({
          next: data => {
            console.log(data);
              this.products.favorited = true;
              this.isSubmitting = false;
              this.toggle.emit(true);
          },
        });
      } else {
        this.ProductService.unfavorite(this.products.slug as String).subscribe({
          next: data => {
            console.log(data);
              this.products.favorited = false;
              this.isSubmitting = false;
              this.toggle.emit(false);
          },
        });
      }
    }
  }
}
