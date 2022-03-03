import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util-service.js"

const MAIL_KEY = "mailDB"

_createMails()

export const loggedinUser = {
  
  mail: "user@appsus.com",
  fullname: "Mahatma Appsus",
}

export const mailService = {
  query,
  deleteMail,
  get,
  getDraft,
  save,
  send
}

function query() {
  return storageService.query(MAIL_KEY)
}

function deleteMail(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then((mail) => {
    return _setNextPrevMailId(mail)
  })
}

function send(mail){
  mail.sentAt = Date.now()
  return storageService.post(MAIL_KEY, mail)
}

function save(mail) {
  return storageService.put(MAIL_KEY, mail)
}

function _setNextPrevMailId(mail) {
  return storageService.query(MAIL_KEY).then((mails) => {
    const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
    mail.nextMailId = mails[mailIdx + 1] ? mails[mailIdx + 1].id : mails[0].id
    mail.prevMailId = mails[mailIdx - 1]
      ? mails[mailIdx - 1].id
      : mails[mails.length - 1].id
    return mail
  })
}

function getDraft() {
  return {
    // id: storageService._makeId(),
    subject: '',
    txt: '',
    isRead: true,
    to: '',
    from: 'user@appsus.com'
  }
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: storageService._makeId(),
        subject: "Test Email 1",
        txt: "This is test email 1, how are you today?",
        isRead: false,
        sentAt: Date.now() - 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: "tester@test.com"
      },
      {
        id: storageService._makeId(),
        subject: "Test Email 2",
        txt: "This is test email 2, how are you today?",
        isRead: false,
        sentAt: Date.now() - 2 * 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: "tester@test.com"
      },
      {
        id: storageService._makeId(),
        subject: "Test Email 3",
        txt: "This is test email 3, how are you today?",
        isRead: false,
        sentAt: Date.now() - 3 * 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: "tester@test.com"
      },
      {
        id: storageService._makeId(),
        subject: "This is a sent message",
        txt: "This is test email 4, how are you today?",
        isRead: true,
        sentAt: Date.now() - 3 * 1000 * 60 * 60 * 24,
        to: "momo@momo.com",
        from: "user@appsus.com"
      },
    ]
  }
  utilService.saveToStorage(MAIL_KEY, mails)
}
