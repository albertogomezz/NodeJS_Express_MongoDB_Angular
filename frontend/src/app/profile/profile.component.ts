import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { Location } from '@angular/common';
import { ProfileService } from '../core/services/profile.service';
import { Profile } from '../core/models/profile.model';
import { Follower_follow } from '../core/models/follower_follow.model';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';
import { Product } from '../core/models/product.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  username!: string | null;
  // profile_user: Profile[] = [];
  pages_profile: string = "products";
  settings_buttons!: boolean;
  username_user: any;
  img: any;
  bio: any;
  num_followers: any;
  num_follows: any;
  author!: Profile;
  profile_user!: Profile;
  followers: Follower_follow[] = [{username: '', bio: '', image: ''}];
  follow: Follower_follow[] = [{username: '', bio: '', image: ''}];
  user_logged!: User;
  username_profile: any;
  products: Product[] = [];

  constructor(
    private ActivatedRoute: ActivatedRoute, 
    private Location: Location,
    private ProfileService: ProfileService,
    private userService: UserService,
  ){}

  ngOnInit(): void { 

    this.username = this.ActivatedRoute.snapshot.paramMap.get('username');    
    
    this.ProfileService.get_user_profile(this.username).subscribe(
      (data: any) => {

        this.profile_user = data.profile;

        this.products = data.profile.products
        this.followers = data.profile.followers
        this.follow = data.profile.follows

        console.log(data.profile);
        console.log(this.follow);
        this.author = data.profile;
        
    });

    this.userService.currentUser.subscribe({
      next: data => this.user_logged = data,
    }); 

    if (this.user_logged.username === this.username) {
      this.settings_buttons = true
    } else {
      this.settings_buttons = false
    }
  }


  
  onToggleFollow(following: boolean) {
    this.author.following = following;

        if (following) {
            this.author.n_followers++;
            // console.log(this.author.n_followers);
        } else {
            this.author.n_followers--;
            // console.log(this.author.n_followers);
        }
        // console.log(this.author.following);
  }

  change_followers(){
    this.pages_profile = "followers";
  }
  change_follows(){
    this.pages_profile = "follows";
  }
  change_products(){
    this.pages_profile = "products";
  }
}
