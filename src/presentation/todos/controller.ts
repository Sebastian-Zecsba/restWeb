import type { Request, Response } from "express";
import { prisma } from "../../data/postgres/index.js";

interface todo { 
    id: number,
    text: string,
    completedAt: Date | null
}

const todos : todo[] = [
    {id: 1, text: 'Buy milk', completedAt: new Date()},
    {id: 2, text: 'Buy bread', completedAt: new Date()},
    {id: 3, text: 'Buy butter', completedAt: new Date()},
]

export class TodosController { 

    // DI
    constructor( ){ 

    }

    public getTodos = async (req: Request, res: Response) => { 
        const getTodos = await prisma.todo.findMany()
        return res.json(getTodos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({error: `ID agument is not a number`})

        const todo = await prisma.todo.findMany({ 
            where: { 
                id: { equals: id}
            }
        })

        if(todo.length === 1){ 
            return res.json(todo)       
        }else{
            return res.status(404).json({error: `TODO with id ${id} dosen't exist `}) 
         }

    }

    public createTodo = async (req: Request, res: Response) => {
        const { text } = req.body;
        if(!text) res.status(400).json({error: 'Texto propertyy is required'})

        const todo = await prisma.todo.create({ 
            data: { text: text}
        });

        res.json(todo)
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({error: `ID agument is not a number`});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});

        const { text, completedAt } = req.body

        todo.text = text || todo.text;
        (completedAt === 'null')
            ? todo.completedAt = null  
            : todo.completedAt = new Date(completedAt || todo.completedAt)

        // OJO, Referencia

        res.json(todo)
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({error: `ID agument is not a number`});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});

        todos.splice(todos.indexOf(todo), 1 )

        res.json(todo)
    }
}