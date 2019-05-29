import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EventModel } from '../model/event';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  profile: any;
  balance: number;
  pageSize: number[] = [10, 20, 50];
  displayedColumns = ['title'];
  dataSource: MatTableDataSource<EventModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService, private modalService: NgbModal) {

    const ELEMENT_DATA: EventModel[] = [
      {title: 'Hydrogen'},
      {title: 'Helium'},
      {title: 'Lithium'},
      {title: 'Beryllium'},
      {title: 'Boron'},
      {title: 'Carbon'},
      {title: 'Nitrogen'},
      {title: 'Oxygen'},
      {title: 'Fluorine'},
      {title: 'Neon'},
    ];

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
        this.authService.getUserBalance(this.profile.email).subscribe(value => {this.balance = value; });
      });
    }
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Cantidad de eventos por página:';
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
