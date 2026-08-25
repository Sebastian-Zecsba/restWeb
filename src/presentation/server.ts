import express from "express";
import path from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Server{ 

    private app = express();

    async start(){ 

        // Middleware

        // Public Folder
        this.app.use(express.static('public'));

        this.app.get('/*splat', (req, res) => {
           const indexPath = path.join(__dirname + '../../../public/index.html')
           res.sendFile(indexPath);
           
        });

        this.app.listen(3000, () => {
            console.log(`Server running on port 3000`)
        })
    }

}