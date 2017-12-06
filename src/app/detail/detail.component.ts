import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
 
      this.service.getAnswer(id).subscribe(
        answer => this.answer = answer
      )
  }

}
