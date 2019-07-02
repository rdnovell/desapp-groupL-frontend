import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import * as chunk from 'chunk';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'confirmed-guests',
    templateUrl: './confirmed-guests.html',
    styleUrls: ['./confirmed-guests.css']
})
export class ConfirmedGuestsComponent implements OnInit {

    eventsChunked;
    events;

    constructor(private dataService: DataService, private authService: AuthService) { }

    ngOnInit() {
        const user = this.authService.userProfile;
        if (user && user.email) {
            this.setConfirmations(user);
        } else {
            this.authService.getProfile((err, profile) => this.setConfirmations(profile));
        }
    }

    setConfirmations({email}) {
        this.dataService.getConfirmations(email).subscribe(events => {
            this.eventsChunked = chunk(events, 4);
            if (this.eventsChunked.length > 0) {
                this.events = this.eventsChunked[0];
                this.eventsChunked.shift();
            } else {
                this.events = [];
            }
        }, () => { });
    }

    onScroll() {
        if (this.eventsChunked.length > 0) {
            this.eventsChunked[0].forEach(event => this.events.push(event));
            this.eventsChunked.shift();
        }
    }

}
