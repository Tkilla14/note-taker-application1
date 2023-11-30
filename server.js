const express = require("express")
const path = require("path")
const app = express();
const fs = require("fs");
const uuid = require('./Develop/helpers/uuid');
const note = uuid


const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))



app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});


app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err){
      console.log(err);
    }
    res.send(JSON.parse(data));
  })
})

app.post('/api/notes', (req, res) => {
  req.body.id = note();
  fs.readFile('./db/db.json', (err, data) => {
    const noteList = JSON.parse(data);
    console.log(noteList);
    const addNote = req.body;
    noteList.push(addNote);
    console.log(noteList);
    fs.writeFile('./db/db.json', JSON.stringify(noteList), (err) => {
      if (err){
        console.log(err)
      }
    });  
  });
})

app.delete('/api/notes/:id', (req, res) => {

});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);