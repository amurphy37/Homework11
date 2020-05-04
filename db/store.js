const util = require('util')
const fs = require('fs')

const {v4: uuidv4} = require('uuid')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store {
  
  read() {
    return readFileAsync("./db/db.json", "utf8")
  }

  write(note) {
    return writeFileAsync("./db/db.json", JSON.stringify(note))
      .then(() => console.log("file created successfully with promisify!"))

      .catch(error => console.log(error));
  }

  getNotes() {
    return this.read()
   
    .then(notes => {
    //  console.log(notes)
      // parse the JSON string and turn into an object
     const newNotes = JSON.parse(notes);
  
     return newNotes;

      // // return that list (array)
    })
    .catch(function (err) {
      console.log(err)
    });
  }

  addNote(note) {
    // use the note argument
    // create a new note object with your required fields (text, title, id)
       const newNote = {
         text: note.text,
         title: note.title,
         id: uuidv4()
       }
       

       this.getNotes()
       .then(function (listArr) {
        listArr.push(newNote);
         writeFileAsync("./db/db.json", JSON.stringify(listArr))
           .then(() => console.log("file created successfully with promisify!"))

           .catch(error => console.log(error));
        });
  }

  removeNote(id) {
    // get all notes
    this.getNotes()
    .then(function (list){
      var listArr = list
      // console.log(listArr)
      const newListArr = []
      for (var i = 0; i < listArr.length; i++) {
        if (listArr[i].id != id) {
          newListArr.push(listArr[i])
        }
       
      }
      console.log(newListArr);
      writeFileAsync("./db/db.json", JSON.stringify(newListArr))
        .then(() => console.log("file created successfully with promisify!"))

        .catch(error => console.log(error));
      
    })
    
    // remove the note with the given 
  }

}

module.exports = Store