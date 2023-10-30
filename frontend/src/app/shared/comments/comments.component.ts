import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from '../../core/models/comment.model';
import {  User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
  
@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css'],
})
  
export class CommentsComponent implements OnInit {

    @Input() comment!: Comment;
    @Output() deleteComment = new EventEmitter<boolean>();

    canModify!: boolean;
    subscription!: Subscription;

    constructor(
      private userService: UserService,
      private cd: ChangeDetectorRef
    ) {}
  
    ngOnInit() {

        this.subscription = this.userService.currentUser.subscribe(
            (userData: User) => {
                console.log(this.comment.author.username);
                console.log(userData.username);
                
                if ( userData && userData.username === this.comment.author.username){
                    this.canModify === true;
                }else{
                    this.canModify === false;
                }
                this.cd.markForCheck();
            }            
        );
        console.log(this.subscription);
        console.log(this.canModify);
    }
  
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    deleteClicked() {
        this.deleteComment.emit(true);
    }
}