import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users: User[] = [];

  constructor(private readonly http: HttpClient) {
  }

  onCall() {
    const id = 1 + Math.floor(10 * Math.random());
    this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).subscribe(user => this.users.push(user));
  }

}
