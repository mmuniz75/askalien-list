import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Service } from '../service';
import { environment } from '../../environments/environment';
import { IAnswer } from '../answer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  answers:IAnswer[];
  
    constructor(private service : Service,
                private route: ActivatedRoute) { }
  
    ngOnInit() {
      if(environment.production)
        this.service.configServer().subscribe(
          _ =>  this.loadQuestions()
        )
      else
        this.loadQuestions();  
    }
  
    loadQuestions(){
      const from = +this.route.snapshot.paramMap.get('from');
      const to = +this.route.snapshot.paramMap.get('to');
  
      this.service.listAnswers(from,to).subscribe(
        answers => this.answers = answers
      );
    }

}
