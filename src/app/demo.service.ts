import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {forkJoin} from 'rxjs';  // Angular 6/RxJs 6
// import {Observable} from 'rxjs/Observable';  // Angular 5/RxJs 5.5
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DemoService {

    baseUrl:string = "http://localhost:3000";

    constructor(private http: HttpClient) {
    }

    // NOTE: all API calls in this file use simple endpoints served by an Express app in the file app.js in the repo root. See that file
    // for all back-end code. Uses http.get() to load data from a single API endpoint
    getFoods() {
        return this.http.get(this.baseUrl + '/api/food');
    }

    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    getBooksAndMovies() {
        return forkJoin(  // Angular 6/RxJs 6
            this.http.get(this.baseUrl + '/api/books'),
            this.http.get(this.baseUrl + '/api/movies')
        );
    }

    // send a POST request to the API to create a new data object
    createFood(food) {
        let body = JSON.stringify(food);
        return this.http.post(this.baseUrl + '/api/food/', body, httpOptions);
    }

    // send a PUT request to the API to update a data object
    updateFood(food) {
        let body = JSON.stringify(food);
        return this.http.put(this.baseUrl + '/api/food/' + food.id, body, httpOptions);
    }

    // send a DELETE request to the API to delete a data object
    deleteFood(food) {
        return this.http.delete(this.baseUrl + '/api/food/' + food.id);
    }

}