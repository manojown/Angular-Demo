import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'https://api.github.com'

  constructor(private httpClient: HttpClient) { }

  public getUser(username){
    return this.httpClient.get(this.URL+'/users/'+username);
  }

  public getRepositories(repoURL){
    return this.httpClient.get(repoURL);
  }
}
