import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse ,HttpParams } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, retry ,tap } from "rxjs/operators";

@Injectable ({
    providedIn: 'root'

})

export class DataService {
    private REST_API = 'https://jsonplaceholder.typicode.com/posts';
    public first: string = "";
    public prev: string = "";
    public next: string = "";
    public last: string = "";

    constructor( private http:HttpClient){}

    handleError(error: HttpErrorResponse){
        let errorMessage = "unknown error !"
        if(error.error instanceof ErrorEvent){
            //client
            errorMessage = `Error ${error.status}\n ${error.message}`
        }else {
             // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);


    }
    

    public sendGetRequest (){
        const options = { params: new HttpParams({fromString: "_page=1&_limit=5"}) };
    return this.http.get(this.REST_API, options).pipe(retry(3), catchError(this.handleError));

    }
}