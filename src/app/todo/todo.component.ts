import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { Itask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  form !: FormGroup ;
  task: Itask [] = [];
  done: Itask [] = [];
  updatedId !:any;
  isEditEnabled: boolean=false;

   
  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      item : ['',Validators.required]
    })
    this.form.reset();
  }

  updateTask(){
     this.task[this.updatedId].description = this.form.value.item;
     this.task[this.updatedId].done = false;
     this.form.reset();
     this.updatedId = undefined;
     this.isEditEnabled = false;
  }

  addTask(){
     this.task.push({
       description:this.form.value.item,
       done:false
     })
  }
  delTask(i: number){
    this.task.splice(i,1);
  }
  editTask(item:Itask, i:number){
    this.form.controls['item'].setValue(item.description);
    this.updatedId= i;
    this.isEditEnabled =true;

  }

}
