import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/core/models/profile.model';
import { ProfileService  } from 'src/app/core/services/profile.service';
import { UserService  } from 'src/app/core/services/user.service';
import { concatMap , tap } from 'rxjs/operators';
import { of } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FollowButtonComponent implements OnInit {
  isLoged!: boolean;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    // private ToastrService: ToastrService
  ) {}

  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  
  isSubmitting = false;

  ngOnInit(): void { }

  toggleFollowing() {
    // console.log(this.profile.following);



    this.isSubmitting = true;
    this.userService.isAuthenticated.subscribe({
        next: data => this.isLoged = data,
    });

    if (!this.isLoged) {
        setTimeout(() => { this.router.navigate(['/login']); }, 600);
    } else {
      
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