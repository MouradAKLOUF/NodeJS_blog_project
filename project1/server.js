

const http= require('http');
const file=require('fs');

const server = http.createServer( (req, res)=>{

    console.log('request made :');
    console.log(req.url);

    res.setHeader('Content-Type','text/html');
    let path='./views/';

    switch(req.url){
        case '/':
            path+='index.html'
            res.statusCode=200;
            break;
        case '/about':
            path+='about.html'
            res.statusCode=200;
            break;
        case '/about-us':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path+='404.html'
            res.statusCode=404;
            break;
    }


    file.readFile( path , (err, data)=>{
        if (err){
            console.log(err);
            res.end();
        }
        res.end(data);
        }
        );


});


server.listen(3000, 'localhost', ()=> {
 console.log('lestening to request on localhost port 3000');
});

