import { utilService } from "../../../services/util-service.js"
import { storageService } from "../../../services/async-storage-service.js"

export const notesService = {
    query,
    getEmptyNote,
    get,
    update,
    save,
    remove,
}

const NOTES_KEY = 'notes'

_createNotes()

function query() {
    return storageService.query(NOTES_KEY)
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function update(note) {
    return storageService.put(NOTES_KEY, note)
}

function save(note) {
    return storageService.post(NOTES_KEY, note)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function getEmptyNote(){
   return {
        typeNote: '',
        info: {
            subject: 'subject',
            style: {
                backGroundColor: '#ffffff'
            },
        },
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY) || []
    if (!notes || !notes.length) {
        console.log('new');
        notes = [
            {
                id: utilService.makeId(),
                typeNote: 'noteTodos',
                info: {
        
                    subject: 'To take care of urgently!',
                    list: [{txt: 'Cut the grass', isDone: false, idx:0}, {txt: 'Hang pictures', isDone: true, idx:1}, {txt: 'Buy wife present', isDone: true, idx:2}, {txt: 'Pick up pizza', isDone: false, idx:3}, {txt: 'Paint the fence', isDone: false, idx:4}],
                    style: {
                        backGroundColor: '#ffff007a'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteTxt',
                info: {
        
                    subject: 'Reminder To Self',
                    text: 'Call Mom and Dad for their Anniversary',
                    style: {
                        backGroundColor: '#ffffff'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteVideo',
                info: {
        
                    subject: 'Funny as hell, I love this guy',
                    video: 'https://www.youtube.com/embed/nUUsUAPEjFc',
                    style: {
                        backGroundColor: '#ffffff'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteTxt',
                info: {
                    subject: 'To tell David',
                    text: 'Please make sure to submit the forms before noon tomorrow',
                    style: {
                        backGroundColor: '#ffff007a'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteImg',
                info: {
        
                    subject: 'Amazing book, must read again!',
                    image: 'http://coding-academy.org/books-photos/20.jpg',
                    style: {
                        backGroundColor: '#ffffff'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteTxt',
                info: {
                    subject: 'Important!!!',
                    text: 'Book a reservation at the wine tasting before it gets completely sold out!',
                    style: {
                        backGroundColor: '#ffff007a'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteTodos',
                info: {
        
                    subject: 'To get from the Hardware store',
                    list: [{txt: 'Hammer', isDone: false, idx:0}, {txt: 'Nails', isDone: false, idx:1}, {txt: 'Saw', isDone: false, idx:2}, {txt: 'Screws', isDone: false, idx:3}, {txt: 'Sledgehammer', isDone: false, idx:4}],
                    style: {
                        backGroundColor: '#ffff007a'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteVideo',
                info: {
        
                    subject: 'Great playlist for working on the computer',
                    video: 'https://www.youtube.com/embed/pzzpjkHpI5A',
                    style: {
                        backGroundColor: '#ffffff'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteTxt',
                info: {
                    subject: 'Homework',
                    text: 'Read pages 117-130 and summarize in 2-3 paragraphs',
                    style: {
                        backGroundColor: '#ffff007a'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteImg',
                info: {
                    subject: 'Book club book of the week',
                    image: 'http://coding-academy.org/books-photos/14.jpg',
                    style: {
                        backGroundColor: '#ffffff'
                    },
        
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteVideo',
                info: {
        
                    subject: 'Watch later, no time right now',
                    video: 'https://www.youtube.com/embed/tgbNymZ7vqY',
                    style: {
                        backGroundColor: '#ffffff'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteTodos',
                info: {
        
                    subject: 'Shopping List',
                    list: [{txt: 'Cucumbers', isDone: false, idx:0}, {txt: 'Tomatoes', isDone: false, idx:1}, {txt: 'Bread', isDone: false, idx:2}, {txt: 'Cheese', isDone: false, idx:3}, {txt: 'Beer', isDone: false, idx:4}],
                    style: {
                        backGroundColor: '#ffff007a'
                    },
                },
            },
        ]
    utilService.saveToStorage(NOTES_KEY, notes)
    }
}