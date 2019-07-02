import {Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  balance: number;
  pageSize: number[] = [10, 20, 50];
  displayedColumns = ['type', 'amount', 'date', 'balance'];
  dataSource: MatTableDataSource<any>;

  dateCodes: any[] = [
    {value: '0', viewValue: 'remove'},
    {value: '1', viewValue: '201906'},
    {value: '2', viewValue: '201905'},
    {value: '3', viewValue: '201904'}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService, private dataService: DataService) {}

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;

        this.dataSource = new MatTableDataSource<any>([]);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.updateData(this.profile.email);

        this.dataService.validateUser(this.profile).subscribe(data => {
          this.authService.getUserBalance(this.profile.email).subscribe((value: any) => {
            this.balance = value;
          });
        });
      });
    }
  }

  private updateData(email) {
    this.dataService.getUserFinantialData(email).subscribe((resp: any) => {
      this.dataSource.data = resp;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  applyFilter2(value: string) {
    console.log('me llego ' + value);
    this.updateData(this.profile.email);
    this.dataSource.data = this.dataSource.data.filter( e => e.dateCode === value);
  }
}
