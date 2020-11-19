const fs = require('fs');
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('A note with that title already exists!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title);

    if(newNotes.length !== notes.length){
        saveNotes(newNotes);
        console.log(chalk.green.inverse('Note Removed!'));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.blue.inverse('Your Notes'));
    notes.forEach((note) => console.log(chalk.cyanBright(note.title)));
}

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);

    if(foundNote){
        console.log(chalk.white.inverse('Note: ' + foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red.bold('No note found.'));
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};