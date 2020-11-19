const fs = require('fs');
const chalk = require('chalk');
const fileName = 'notes.json';

const error = chalk.red.inverse('Error:')

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(`${chalk.green.inverse('Note Added:')} ${chalk.green.bold(title)}`);
    } else {
        console.log(`${error} ${chalk.red.bold('A note with that title already exists!')}`);
    }
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Saved Notes'));
    notes.forEach((note) => console.log(`-> ${chalk.cyanBright(note.title)}`));
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(fileName);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);

    if(foundNote){
        console.log(chalk.white.inverse(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(`${error} ${chalk.red.bold('No note found with that title.')}`);
    }

}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title);

    if(newNotes.length !== notes.length){
        saveNotes(newNotes);
        console.log(`${chalk.green.inverse('Note Deleted:')} ${chalk.green.bold(title)}`);
    } else {
        console.log(`${error} ${chalk.red.bold('No note found with that title.')}`);
    }
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(fileName, dataJSON);
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};