const express = require('express');
const mysql = require('mysql');
const app = express();
const ejs = require('ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'masa0212',
    database: 'list_app'
});

app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        (error, results) => {
            console.log(results);
            res.render('list.ejs',{users:results});
        })
});


app.post('/create',(req, res) => {

    const name = req.body.artistName;
    const song = req.body.songName;
    const poem = req.body.poemText;

    if(
    name,
    song,
    poem
       ){
        connection.query(
        'INSERT INTO users(name, songname, poem) VALUES(?, ?, ?)',
        [req.body.artistName, req.body.songName ,req.body.poemText],
        (error, results) => {
            res.redirect('/');
        })
    }else{
        res.render('form.ejs');
    }
    
 });


app.post('/delete/:id', (req, res) => {
    connection.query(
        'DELETE FROM users WHERE id = ?',
        [req.params.id],
        (error, results) => {
            res.redirect('/');
        })
    });






app.get('/form', (req, res)=>{
    res.render('form.ejs');
});


app.listen(3000);