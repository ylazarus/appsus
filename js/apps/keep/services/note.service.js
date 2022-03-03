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
                typeNote: 'noteTxt',
                info: {
        
                    subject: 'aaa aaa',
                    text: 'aaa aaa aaa aaa aaa aaa aaa aaa aaa',
                    style: {
                        backGroundColor: '#ffffff'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteTxt',
                info: {
                    subject: 'bbb bbb',
                    text: 'bb bbb bbbb bbb bbb',
                    style: {
                        backGroundColor: '#ffff007a'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteImg',
                info: {
        
                    subject: 'img a',
                    image: 'http://coding-academy.org/books-photos/20.jpg',
                    style: {
                        backGroundColor: '#ffffff'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteImg',
                info: {
                    subject: 'img b',
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
        
                    subject: 'video a',
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
        
                    subject: 'todos a',
                    list: [{txt: 'aaa', isDone: false, idx:0}, {txt: 'bbb', isDone: true, idx:1}, {txt: 'ccc', isDone: false, idx:2}],
                    style: {
                        backGroundColor: '#ffff007a'
                    },
                },
            },
        ]
    utilService.saveToStorage(NOTES_KEY, notes)
    }
}