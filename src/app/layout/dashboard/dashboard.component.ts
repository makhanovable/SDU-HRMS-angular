import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {ResultRecord} from './result.record';
import {SearchService} from './search.service';
import {HttpParams} from '@angular/common/http';

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
    count: number;
    displayedColumns = ['pos', 'age', 'exp', 'last_j', 'info'];

    constructor(private http: SearchService) {
    }

    ngOnInit() {
    }

    search(str: string) {
        console.log('searching for = ' + str);

        let params = new HttpParams();
        params = params.set('wrd', str);
        params = params.set('exp', '180');
        params = params.set('sal', '180-08426');
        params = params.set('src', 'hh');
        params = params.set('page', '0');
        this.load(params);
    }

    loadPage(event) {
        console.log('searching for = ');

        let params = new HttpParams();
        params = params.set('wrd', '');
        params = params.set('exp', '180');
        params = params.set('sal', '180-08426');
        params = params.set('src', 'link');
        params = params.set('page', event.pageIndex + '');
        this.load(params);
    }

    load(params: HttpParams) {
        this.isLoadingResult = true;
        this.temp = [];
        this.data = [];
        this.http.get('http://localhost:8080/search/', {params: params}).subscribe(value => {
                const str_count = JSON.stringify(value.count).replace(/["]+/g, '');
                this.count = +str_count;
                for (const val of value.list) {
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

}
