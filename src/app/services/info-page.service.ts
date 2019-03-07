import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPage } from '../interfaces/info-page-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

    info: InfoPage = {};
    team: any[] = [];
    loaded: boolean = false;

    constructor(private http:HttpClient) {        
        this.loadInfo();
        this.loadTeam();
    }

    private loadInfo() {
        // Read the JSON file
        this.http.get('assets/data/data-pages.json')
            .subscribe((response: InfoPage) => {
                this.loaded = true;
                this.info = response;
            });
    }

    private loadTeam() {
        // Read the json file of REST service Firebase
        this.http.get('https://angular-html-edfdb.firebaseio.com/team.json')
            .subscribe((response: any[]) => {
                this.team = response;
                // console.log(this.team);
            });
    }
}
