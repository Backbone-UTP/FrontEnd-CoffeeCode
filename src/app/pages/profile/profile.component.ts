import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private auth: AuthService) {}

  user: any;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
