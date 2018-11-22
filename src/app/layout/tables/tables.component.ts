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
    displayedColumns = ['pos', 'age', 'exp', 'last_j'];

    constructor(private http: SearchService) {
    }

    ngOnInit() {
    }

    search(newHero: string) {
        console.log(newHero);

        this.http.get('http://localhost:8080/search').subscribe(value => {
                for (const val of value) {
                    const resRecord = new ResultRecord(val);
                    console.log(resRecord.position);
                    this.temp.push(resRecord);
                }
                this.data = this.temp;
                console.log(this.data.length);
            },
            error => {
                console.log(error);
            });

    }

    public get(url: string): Observable<any> {
        return this.http.get(url);
    }

}
