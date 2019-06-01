import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EventModel } from '../model/event';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  profile: any;
  balance: number;
  pageSize: number[] = [10, 20, 50];
  displayedColumns = ['type', 'title', 'items', 'invitados', 'date', 'expirationDate'];
  dataSourceCreated: MatTableDataSource<EventModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService, private dataService: DataService) {

    const ELEMENT_DATA: EventModel[] = [];

    this.dataSourceCreated = new MatTableDataSource(ELEMENT_DATA);
    this.dataSourceCreated.paginator = this.paginator;
    this.dataSourceCreated.sort = this.sort;

  }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
        this.dataService.validateUser(this.profile).subscribe(data => {
          this.authService.getUserBalance(this.profile.email).subscribe(value => {
            this.balance = value;
          });
        });
      });
    }
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Cantidad de eventos por página:';
  }

  applyFilterCreated(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceCreated.filter = filterValue;
  }
}
