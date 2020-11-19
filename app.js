const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//  Add Command
yargs.command({
    command: 'add',
    describe: 'Add a new note,',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removing a note.',
    builder: {
        title: {
            describe: 'Title of note you want to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'List all your notes created',
    handler(){ notes.listNotes() }
});

yargs.command({
    command: 'read',
    describe: 'Reading your note',
    builder: {
        title: {
            describe: 'Title of the note you want to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
});



yargs.parse();