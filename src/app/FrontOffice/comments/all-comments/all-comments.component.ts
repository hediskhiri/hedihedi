import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../comments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css']
})
export class AllCommentsComponent implements OnInit {
  eventId: any;
  comments: any;
  constructor(private commentService: CommentsService, private router: Router,private route: ActivatedRoute,) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      this.loadComents(this.eventId);
    });
  }
  loadComents(id: any){
  this.commentService.listeComment(id)
  .subscribe(
    res => {
      console.log(res);
      this.comments = res;
    },
    err => {
      console.log(err);
    }
  ); 
}
}
