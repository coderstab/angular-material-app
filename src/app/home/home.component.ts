import { Component, OnInit , OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: any;
  body: any;

  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private service: DataService) { }
 

  ngOnInit(){
    this.service.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.products = data;

    })
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
