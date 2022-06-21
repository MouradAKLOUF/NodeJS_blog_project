
const { urlencoded } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app= express();
//app.listen(3000);

// connect to mangodb
const dbURI = 'mongodb+srv://mouradNodeJS:12-1993@cluster1.k9vh3.mongodb.net/nodejsTutos?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then( res => app.listen(3000))
.catch( err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use( (req, res, next)=>{
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

// mongodb manips
app.get('/add-blog', (req, res) => {
    const bloggg = new Blog({
      title: 'new blog xxxx',
      snippet: 'about my new blog xxxx',
      body: 'more about my new blog  xxxxx'
    })
  
    bloggg.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.get('/single-blog', (req, res) => {
    Blog.findById('62a35e5d59950181d8b5dae4')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });



app.get('/', (req, res)=>{
    res.redirect('/blogs');
/*
    const blogs = [
        {title: 'aklouf mourad', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'aklouf xxx', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'aklouf yyyy', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];

res.render('index',{ title: 'Home', blogs : blogs});
*/
});

app.get('/about', (req, res)=>{
    res.render('about', {title: 'about page'});
    });


// blog routes
app.use('/blogs', blogRoutes);


app.use((req, res)=>{
    res.status(404).render('404', {title: '404'});
    });
    