import {Component} from '@angular/core';
import {DemoService} from './demo.service';
import {Observable} from "rxjs/index";
import {throwError} from 'rxjs';  // Updated for Angular 6/RxJS 6

@Component({
    selector: 'app-root',
    template: `
  <h1>BEC Angular training - HttpClient Demo</h1>
  <p>This is a complete mini-crud application using a Node back-end. See src/app/demo.service.ts for the API call code.</p>
  <h2>Foods</h2>
  <ul>
    <li *ngFor="let food of foods"><input type="text" name="food-name" [(ngModel)]="food.name"><button (click)="updateFood(food)">Save</button> <button (click)="deleteFood(food)">Delete</button></li>
  </ul>
  <p>Create a new food: <input type="text" name="food_name" [(ngModel)]="food_name"><button (click)="createFood(food_name)">Save</button></p>
  
  <h2>Books and Movies</h2>
  
  <p>This is an example of loading data from multiple endpoints using Observable.forkJoin(). The API calls here are read-only.</p>
  
  <h3>Books</h3>
  <ul>
    <li *ngFor="let book of books">{{book.title}}</li>
  </ul>
  <h3>Movies</h3>
  <ul>
    <li *ngFor="let movie of movies">{{movie.title}}</li>
  </ul>
  `
})
export class AppComponent {

    public foods;
    public books;
    public movies;

    public food_name;

    constructor(private _demoService:DemoService) {
    }

    ngOnInit() {
        this.getFoods();
        this.getBooksAndMovies();
    }

    getFoods() {
        this._demoService.getFoods().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.foods = data
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading foods')
        );
    };

    getBooksAndMovies() {
        this._demoService.getBooksAndMovies().subscribe(
            data => {
                this.books = data[0];
                this.movies = data[1]
            }
            // No error or completion callbacks here. They are optional, but
            // you will get console errors if the Observable is in an error state.
        );
    };

    createFood(name) {
        let food = {name: name};
        this._demoService.createFood(food).subscribe(
            data => {
                // refresh the list
                this.getFoods();
                return true;
            },
            error => {
                console.error("Error saving food!");
                return throwError(error);
            }
        );
    };

    updateFood(food) {
        this._demoService.updateFood(food).subscribe(
            data => {
                // refresh the list
                this.getFoods();
                return true;
            },
            error => {
                console.error("Error saving food!");
                return throwError(error);
            }
        );
    };

    deleteFood(food) {
        if (confirm("Are you sure you want to delete " + food.name + "?")) {
            this._demoService.deleteFood(food).subscribe(
                data => {
                    // refresh the list
                    this.getFoods();
                    return true;
                },
                error => {
                    console.error("Error deleting food!")
                    return throwError(error);
                }
            );
        }
    };
}
