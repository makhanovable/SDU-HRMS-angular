import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class SearchService {
    constructor(private httpClient: HttpClient) {
    }

    public get(url: string, params: object): Observable<any> {
        return this.httpClient.get(url, params);
    }
}
