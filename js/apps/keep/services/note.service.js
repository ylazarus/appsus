import { utilService } from "../../../services/util-service.js"
import { storageService } from "../../../services/async-storage-service.js"

export const notesService  ={
    query,
    getEmptyNote,
}

const NOTES_KEY = 'notes'

_createNotes()

function query() {
    return storageService.query(NOTES_KEY)
}

function getEmptyNote(){
   return {
        id: utilService.makeId(),
        typeNote: '',
        info: {
            subject: '',
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
                    body: 'aaa aaa aaa aaa aaa aaa aaa aaa aaa',
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
                    body: 'bb bbb bbbb bbb bbb',
                    style: {
                        backGroundColor: '#ffffff'
                    },
                },
            },
            {
                id: utilService.makeId(),
                typeNote: 'noteImg',
                info: {
        
                    subject: 'img a',
                    src: 'http://coding-academy.org/books-photos/20.jpg',
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
                    src: 'http://coding-academy.org/books-photos/14.jpg',
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
                    src: 'https://www.youtube.com/embed/tgbNymZ7vqY',
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
                    list: [{txt: 'aaa', isDone: false}, {txt: 'bbb', isDone: true}, {txt: 'ccc', isDone: false}],
                    style: {
                        backGroundColor: '#ffffff'
                    },
                },
            },
        ]
    utilService.saveToStorage(NOTES_KEY, notes)
    }
}