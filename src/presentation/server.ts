import express, { response } from "express";
import path from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Options {
    port: number;
    public_path?: string; 
}

export class Server{ 

    private app = express();
    private readonly port: number;
    private readonly public_path: string;

    constructor(options: Options){

        const { port, public_path = 'public'} = options

        this.port = port;
        this.public_path = public_path;
    }

    async start(){ 

        // Middleware

        // Public Folder
        this.app.use(express.static(this.public_path));

        // routes

        this.app.get('/api/todo', (req, res) => { 
            res.json([
                {id: 1, text: 'Buy milk', createdAt: new Date()},
                {id: 2, text: 'Buy bread', createdAt: new Date()},
                {id: 3, text: 'Buy butter', createdAt: new Date()},
            ]);
        })

        // /*splat 
        this.app.get('/*splat', (req, res) => {
           const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`)
           res.sendFile(indexPath);
           
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }

}