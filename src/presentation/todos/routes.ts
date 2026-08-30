import { Router } from "express";
import { TodosController } from "./controller.js";

export class TodoRoutes{ 

    static get routes(): Router{ 
        const route = Router();
        const todoController = new TodosController();

        route.get('/', (req, res) => (todoController.getTodos(req, res)))
        route.get('/:id', (req, res) => (todoController.getTodoById(req, res)))
        route.post('/', (req, res) => (todoController.createTodo(req, res)))
        route.put('/:id', (req, res) => (todoController.updateTodo(req, res)))
        route.delete('/:id', (req, res) => (todoController.deleteTodo(req, res)))


        return route;
    }
    

}