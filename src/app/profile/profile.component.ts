import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  editDataForm: FormGroup;
  balance: number;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
        this.authService.getUserBalance(this.profile.email).subscribe(value => {this.balance = value; });
      });
    }

    this.editDataForm = this.formBuilder.group({
      email: [{value: '', disabled: true}],
      given_name: [{value: '', disabled: true}],
      family_name: [{value: '', disabled: true}],
    });

  }

  handleSubmit() {
  }
}
