import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {ResultRecord} from './result.record';
import {Observable} from 'rxjs';
import {SearchService} from './search.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    @ViewChild('input') input: ElementRef;
    data: ResultRecord[] = [];
    temp: ResultRecord[] = [];
    isLoadingResult = false;
    displayedColumns = ['pos', 'age', 'exp', 'last_j', 'info'];

    constructor(private http: SearchService) {
    }

    ngOnInit() {
    }

    search(str: string) {
        this.isLoadingResult = true;
        this.temp = [];
        this.data = [];
        console.log('searching for = ' + str);
        if (str !== '') {
            this.http.get('http://localhost:8080/search/' + str + '/source').subscribe(value => {
                    for (const val of value) {
                        const resRecord = new ResultRecord(val);
                        this.temp.push(resRecord);
                    }
                    this.data = this.temp;
                    this.isLoadingResult = false;
                },
                error => {
                    console.log(error);
                    this.isLoadingResult = false;
                });
        } else {
            this.isLoadingResult = false;
            console.log('empty = ' + str);
        }

    }

    info(str: string) {
        if (str !== '') {
            const url = 'https://hh.kz/resume/' + str;
            window.open(url, '_blank');
            console.log('hash = ' + str);
        } else {
            console.log('empty hash');
        }
    }

    public get(url: string): Observable<any> {
        return this.http.get(url);
    }

}
