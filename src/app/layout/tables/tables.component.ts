import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {ResultRecord} from './ResultRecord';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchService} from './SearchService';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {

    @ViewChild('input') input: ElementRef;
    resultsLength = 100;
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
            this.http.get('http://localhost:8080/search/' + str).subscribe(value => {
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
            // window.location.href = url;
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
