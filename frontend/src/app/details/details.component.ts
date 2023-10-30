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
    commentControl: any;

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
        console.log(this.slug);
        this.get_product();
    }

    get_product() {
        if (typeof this.slug === 'string') {
            this.ProductService.get_product(this.slug).subscribe(
                (data : any) => {
                    this.product = data.products;
                    this.author = data.products.author
                    this.get_comments(this.slug);
                    this.get_user_author();
                    console.log(data.products);
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
        console.log(this.author.following);
    }
//////////////////////////////////////////////////



get_user_author() {
    this.UserService.currentUser.subscribe((userData: User) => {
        this.currentUser = userData;
        this.user_image = userData.image;
        this.canModify = String(this.currentUser.username) === String(this.product.author?.username);
        console.log(this.canModify);
        
    });
}

get_comments(product_slug: any) {
    // console.log(product_slug);
    if (product_slug) {
        this.CommentService.getAll(product_slug).subscribe((comments) => {
            this.comments = comments;
            console.log(this.comments);
            
        });
    }
}

create_comment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};
    if (this.product.slug) {
        const commentBody = this.commentControl.value;
        this.CommentService.add(this.product.slug, commentBody).subscribe({
            next: data => {
                // this.ToastrService.success("Comment added successfully");
                console.log("Comment added successfully");
                this.commentControl.reset('');
                this.isSubmitting = false;
                this.cd.markForCheck();
                this.comments.push(data);
            },
            error: error => {
                // this.ToastrService.error("Comment add error");
                console.log("Comment add error");
                this.isSubmitting = false;
                this.commentFormErrors = error;
                this.cd.markForCheck();
            }
        })
    }
}

delete_comment(comment: Comment) {
    if (this.product.slug) {
        this.CommentService.destroy(comment.id, this.slug).subscribe({
            next: data => {
                console.log(data.type);
                if (data.type == 'success') {
                    // this.ToastrService.success("Comment deleted");
                    console.log("Comment deleted");
                    this.comments = this.comments.filter((item) => item !== comment);
                    this.cd.markForCheck();
                }
            },
            error: error => { 
                // this.ToastrService.error(error.msg);
                console.log("ERROR AT deleted COMMENTS");
            }
        })
    }
}

empty_comment() {
    this.commentControl.reset('');
    this.isSubmitting = false;
    this.cd.markForCheck();
}




}
