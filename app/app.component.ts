import { Component } from '@angular/core';
import { AppService } from './app.service'

@Component({
    providers: [AppService],
    selector: 'my-app',
    template: `
    <div class="container">
        <h1>Todo List</h1>
        <table class="table">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th class="text-center">Actions</th>
                </tr>
                <tr *ngFor="let todo of todoList">
                    <td>{{todoList.indexOf(todo)}}</td>
                    <td>{{todo.name}}</td>
                    <td>{{todo.description}}</td>
                    <td class="text-center">
                        <a class="btn btn-xs btn-warning" (click)="edit(todo)">Edit</a>
                        <a class="btn btn-xs btn-danger" (click)="delete(todo)">Delete</a>
                    </td>
                </tr>
        </table>

        <h1>Todo Create</h1>
        <form>
            <div class="form-group">
                Name: <input class="form-control" type="text" name="name" [(ngModel)]="todo.name" /> <br/>
            </div>
            <div class="form-group">
                Description: <textarea class="form-control" name="description" [(ngModel)]="todo.description" ></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-default" type="button" (click)="cancel()">Cancel</button>
                <button class="btn btn-primary" (click)="save()" type="submit">Save</button>
            </div>
        </form>
    </div>
    `
})
export class AppComponent { 
    private todoList:any = [];
    private todo:any;
    private indexEdit: number;
    constructor(private appService: AppService){
        this.todo = {
            name: '',
            description: ''
        }
        this.list();
    }

    list(){
        this.todoList = this.appService.list();
    }

    cancel(){
        this.todo = {
            name: '',
            description: ''
        }
        this.indexEdit = -1;
    }

    save(){
        if(this.todo.name == '' || this.todo.description == ''){
            alert('Name or Desctiption is empty');
            return;
        }
        if( this.indexEdit >= 0 ){
            this.appService.update(this.indexEdit, this.todo);
        }else{
            this.appService.save(this.todo);
        }
        this.list();
        this.cancel();
        alert('save success');
    }

    edit(todo:any){
        this.todo = todo;
        this.indexEdit = this.todoList.indexOf(todo);
    }

    delete(todo:any){
        let index = this.todoList.indexOf(todo);
        this.appService.delete(index);
        this.list();
    }
}
