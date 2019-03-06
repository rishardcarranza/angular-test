import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPage } from '../interfaces/info-page-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

    info: InfoPage = {};
    loaded: boolean = false;

    constructor(private http:HttpClient) {        
        // Read the JSON file
        this.http.get('assets/data/data-pages.json')
            .subscribe((response: InfoPage) => {
                this.loaded = true;
                this.info = response;
                console.log(this.info);
            });
    }
}
