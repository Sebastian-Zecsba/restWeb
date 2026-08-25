import http from "http";
import fs from "fs";


const server = http.createServer((req, res) => {
  console.log(req.url)

  // res.writeHead(404, {'Content-Type': 'text/html'});
  // res.write(`<h1>URL ${req.url}</h1>`);
  // res.end();

  // const data = { name: "John Doe", age: 20, city: "New York" };
  // res.writeHead(200, {'Content-Type': 'application/json'});
  // res.end(JSON.stringify(data));

  if(req.url === '/'){
    const urlHtml = fs.readFileSync('./src/public/index.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(urlHtml);
    return;
  }

  if(req.url?.endsWith('.js')){
    res.writeHead(200, {'Content-Type': 'application/javascript'});
  } else if(req.url?.endsWith('.css')){
    res.writeHead(200, {'Content-Type': 'text/css'});
  }

    try {
    const responseContent = fs.readFileSync(`./src/public${req.url}`, 'utf-8');
    res.end(responseContent);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Archivo no encontrado');
  }


})

server.listen(3000, () => {
  console.log("Server runing on port 3000")
})