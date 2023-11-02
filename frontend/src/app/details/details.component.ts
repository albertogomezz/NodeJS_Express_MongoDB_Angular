import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';
import { UserService } from '../core/services/user.service';
import { CommentsService } from '../core/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgControlStatusGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CarouselDetails } from '../core/models/carousel.model';
import { Profile } from '../core/models/profile.model';
import { User } from '../core/models/user.model';
import { Comment } from '../core/models/comment.model';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

    product!: Product;
    author!: Profile;
    slug!: string | null;
    @Input() page!: CarouselDetails[];
    currentUser!: User;
    comments!: Comment[];
    user_image!: string;
    canModify!: boolean;
    cd: any;
    isSubmitting!: boolean;
    commentFormErrors!: {};
    commentControl = new FormControl();
    logged!: boolean;

    constructor(
        private ProductService: ProductService,
        private CommentService: CommentsService,
        private UserService: UserService,
        private ActivatedRoute: ActivatedRoute,
        private router: Router,
        // private ToastrService: ToastrService,
    ) { }

    ngOnInit(): void {

        this.slug = this.ActivatedRoute.snapshot.paramMap.get('slug');
        this.get_product();
        
        this.UserService.isAuthenticated.subscribe(
            (data) => {
                this.logged = data;
                console.log(this.logged);
            }
        );
        this.get_user_author();        
    }

    get_product() {
        if (typeof this.slug === 'string') {
            this.ProductService.get_product(this.slug).subscribe(
                (data : any) => {
                    this.product = data.products;
                    this.author = data.products.author
                    // console.log(this.product.name);
                    this.get_comments(this.slug);
                    this.get_user_author();
                    // console.log(this.author);
                });
        }
        else{
            console.log('fallo al encontrar el producto');
            this.router.navigate(['/']);
        }
    }

    onToggleFavorite(favorited: boolean) {
        this.product.favorited = favorited;
    
        if (favorited) {
            this.product.favoritesCount++;
        } else {
            this.product.favoritesCount--;
        }
    }

    onToggleFollow(following: boolean) {
    this.author.following = following;
        // console.log(this.author.following);
    }
//////////////////////////////////////////////////

get_user_author() {
    this.UserService.currentUser.subscribe(
        (userData: User) => {
            this.currentUser = userData;
            this.user_image = this.currentUser.image;
            this.canModify = true;
        }
    );
}

get_comments(product_slug: any) {
    // console.log(product_slug);
    if (product_slug) {
        this.CommentService.getAll(product_slug).subscribe((comments) => {
            this.comments = comments;
            // console.log(this.comments);
            if (this.comments.length === 0) {
                
                // console.log(this.comments);
            
            }
        });
    }
}


create_comment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};
    // console.log(this.commentControl.value);
    if (this.product.slug) {
        // console.log("yeeee");
        const commentBody = this.commentControl.value;
        // console.log(commentBody);
        // console.log(this.product.slug);
        this.CommentService.add(this.product.slug, commentBody).subscribe(
            (data: any) => {
                console.log(data);
                // this.ToastrService.success("Comment added successfully");
                console.log("Comment added successfully");
                this.commentControl.reset('');
                this.isSubmitting = false;
                this.comments.push(data);
                window.location.reload();
            });
        }
    }

delete_comment(comment: Comment) {
    // console.log(comment.id);
    
    if (this.product.slug) {

        this.CommentService.destroy(comment.id, this.slug).subscribe(
            (data: any) => {
                // console.log(data);
                console.log("Comment deleted successfully");
                // this.ToastrService.success("Comment deleted successfully");
                console.log(this.comments);                
                this.comments = this.comments.filter((item) => item !== comment);
            });
    }
}

empty_comment() {
    this.commentControl.reset('');
    this.isSubmitting = false;
}
///////////////////////////////////////////////


}
