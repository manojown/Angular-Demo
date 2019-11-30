import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

type Userdetails = { login:string };


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 
  private username ;
  private repositories:any = [];
  private oldUsers:any = [];
  private searchCount = 0;
  private userDetails;
  private checker = {}

  constructor( private apiService: ApiService ) { }

  // to sort array by their starts count
  filter(){
     this.repositories.sort((a, b) => (a.stargazers_count > b.stargazers_count) ? -1 : 1)
  }

  // when click on previous history
  callRepo(data) {
    this.userDetails = data
    this.repositories = data.repos
  }

  // recommendation find on internet for auto complete honestly i dont know what the hack is it :(
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  // autcomplete Input box funtionality
  search = (text$: Observable<string>) => {

    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.oldUsers
        : this.oldUsers.filter(v => v.login.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );

  }

  
  formatter = (user:Userdetails) => user.login;
  
  searchUser() {


    // if result is already in local array then serve from local or fetch from internet
    if(typeof this.username == "string"){

      this.apiService.getUser(this.username).subscribe((data)=>{

        this.userDetails = data;
        if(data) this.searchCount ++;
        else return

        this.apiService.getRepositories(this.userDetails.repos_url).subscribe((repos) => {

          this.userDetails.repos =  repos;  

          // it help to avoid uneccessary iteration while check is result already in local or not
          if(!this.checker[this.userDetails.login]){
            this.checker[this.userDetails.login] = this.userDetails.login
            this.oldUsers.push(this.userDetails);
          }
          this.repositories = repos;

          // filter out repos by stars
          this.filter();
          this.username = '';
          
        })
      });
    }else {
      // serve result from local as autocomplete
      this.userDetails = this.username
      this.repositories = this.username.repos
    }
  }

}
