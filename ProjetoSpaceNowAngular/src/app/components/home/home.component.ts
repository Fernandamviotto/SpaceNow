import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userEmail: string | null;

  constructor(private auth: AuthService) {
    this.userEmail = this.auth.getUserEmail();
  }

  logout(): void {
    this.auth.logout();
  }
}
