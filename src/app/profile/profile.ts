import {Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    {value: '0', viewValue: '201906'},
    {value: '1', viewValue: '201905'},
    {value: '2', viewValue: '201904'}
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
    this.dataService.getUserFinantialData(this.profile.email).subscribe((resp: any) => {
      this.dataSource.data = resp.filter( e => e.dateCode === value);
    });
  }

  savePDF() {
    const doc: any = new jsPDF();
    doc.autoTable({html: '#summaryTable'});
    doc.save('summary.pdf');
  }
}
