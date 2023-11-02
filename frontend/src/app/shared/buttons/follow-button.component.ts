import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/core/models/profile.model';
import { ProfileService  } from 'src/app/core/services/profile.service';
import { UserService  } from 'src/app/core/services/user.service';
import { User } from '../../core/models/user.model';
import { concatMap , tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FollowButtonComponent implements OnInit {
  isLoged!: boolean;
  user_logged!: User;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  
  isSubmitting = false;

  ngOnInit(): void { }

  toggleFollowing() {
    // console.log(this.profile);

    this.isSubmitting = true;
    this.userService.isAuthenticated.subscribe({
        next: data => this.isLoged = data,
    });
    
    this.isSubmitting = true;
    this.userService.currentUser.subscribe({
        next: data => this.user_logged = data,
    });    

    //IF - To see if user is logged in
    if (!this.isLoged) {
        setTimeout(() => { this.router.navigate(['/login']); }, 600);
    } 
    //ELSE IF - Because you can't follow yourself
    else if (this.user_logged.username === this.profile.username) {
        //No funciona molt be el toastr pero ahi está el intento
        // this.toastr.error("Login for follow");
        console.log("No puedes seguirte a ti mismo");
    }
    //ELSE - When user isnt logged
    else {
      if (!this.profile.following) {
        this.profileService.follow(this.profile.username).subscribe({
          next: data => {
            console.log(data);
            this.profile.following = true;
            this.isSubmitting = false;
            this.toggle.emit(true);
          },
        });
      } else {
        this.profileService.unfollow(this.profile.username).subscribe({
          next: data => {
            console.log(data);
            this.profile.following = false;
            this.isSubmitting = false;
            this.toggle.emit(false);
          },
        });
      }
    }
  }
  
}