import { Router } from "express";
import { TodoRoutes } from "./todos/routes.js";



export class AppRoutes{ 

    static get routes(): Router{ 
        const route = Router();

        route.use('/api/todo', TodoRoutes.routes)

        return route;
    }
    

}