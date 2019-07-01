import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  balance: number;


  constructor(private authService: AuthService, private dataService: DataService) {}

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
        this.dataService.validateUser(this.profile).subscribe(data => {
          this.authService.getUserBalance(this.profile.email).subscribe((value: any) => {
            this.balance = value;
          });
        });
      });
    }
  }

}
