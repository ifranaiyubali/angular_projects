import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animations';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  leadersErrMess: string;

  constructor( private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe((leaders)=>this.leaders = leaders,
    errmess => this.leadersErrMess = <any>errmess);
  }

}