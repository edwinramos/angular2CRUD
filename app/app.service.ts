import { Injectable } from '@angular/core'

@Injectable()
export class AppService{
    constructor(){
        //localStorage.removeItem('todoList');
    }

    get(_id: string){
        let todoList:any = localStorage.getItem('todoList');
        if(!todoList){
            todoList = [];
        }else{
            todoList = JSON.parse(todoList);
        }
        var currentTodo:any;
        todoList.forEach( (todo:any) => {
            if( todo.id == _id){
                currentTodo = todo;
            }
        });
    }

    list(){
        let todoList:any = localStorage.getItem('todoList');
        if(!todoList){
            todoList = [];
        }else{
            todoList = JSON.parse(todoList);
        }

        return todoList
    }
    save(todo:any){
        let todoList = this.list();

        todoList.push(todo);

        localStorage.setItem('todoList', JSON.stringify(todoList));
    }
    update(_id: number, todo:any){
        let todoList = this.list();
        todoList[_id] = todo;
        let todoListString = JSON.stringify(todoList);
        localStorage.setItem('todoList', todoListString);
    }
    delete(_id: number){
        let todoList = this.list();
        todoList.splice(_id, 1);
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }
}