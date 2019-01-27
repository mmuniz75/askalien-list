import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

import { AnswerDetail } from '../answer.detail';
import { Service } from '../service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  answer:AnswerDetail;

  constructor(private service : Service,
    private route: ActivatedRoute) { }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');
    
    if(environment.production)
        this.service.configServer().subscribe(
      _   =>  this.getQuestion(id)
        )
    else
      this.getQuestion(id);
      
  }

  getQuestion(id: number):void {
    this.service.getAnswer(id).subscribe(
      answer => this.answer = answer
    )
  }

}
