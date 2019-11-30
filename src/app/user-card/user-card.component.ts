import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() userDetails: any;
  @Input() repositories:any;
  @Input() oldUsers: any;
  @Input() searchCount: any;

  @Output() fetchHistory = new EventEmitter();

  ngOnInit() { }


  constructor() { }

  getHistory(value){
    console.log(value);
    
    this.fetchHistory.emit(value);
  }



}
