import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  @Input() oldUsers: any;
  @Input() searchCount : any;

  constructor() { }

  @Output() getHistory = new EventEmitter();

  ngOnInit() {
  }

  callRepo(value){
    this.getHistory.emit(value);
  }

}
