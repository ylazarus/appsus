import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util-service.js"

const MAIL_KEY = "mailDB"

_createEmails()

export const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
}

export const mailService = {
  query,
  deleteEmail,
  get,
}

function query() {
  return storageService.query(MAIL_KEY)
}

function deleteEmail() {}

function get(emailId) {
  return storageService.get(MAIL_KEY, emailId).then((email) => {
    return _setNextPrevEmailId(email)
  })
}

function _setNextPrevEmailId(email) {
  return storageService.query(MAIL_KEY).then((emails) => {
    const emailIdx = emails.findIndex((currEmail) => currEmail.id === email.id)
    email.nextEmailId = emails[emailIdx + 1]
      ? emails[emailIdx + 1].id
      : emails[0].id
    email.prevEmailId = emails[emailIdx - 1]
      ? emails[emailIdx - 1].id
      : emails[emails.length - 1].id
    return email
  })
}

function _createEmails() {
  let emails = utilService.loadFromStorage(MAIL_KEY)
  if (!emails || !emails.length) {
    emails = [
      {
        id: storageService._makeId(),
        subject: "Test Email 1",
        txt: "This is test email 1, how are you today?",
        isRead: false,
        sentAt: Date.now() - 1000 * 60 * 60 * 24,
        to: "user@apsus.com",
      },
      {
        id: storageService._makeId(),
        subject: "Test Email 2",
        txt: "This is test email 2, how are you today?",
        isRead: false,
        sentAt: Date.now() - 2 * 1000 * 60 * 60 * 24,
        to: "user@apsus.com",
      },
      {
        id: storageService._makeId(),
        subject: "Test Email 3",
        txt: "This is test email 3, how are you today?",
        isRead: false,
        sentAt: Date.now() - 3 * 1000 * 60 * 60 * 24,
        to: "user@apsus.com",
      },
      {
        id: storageService._makeId(),
        subject: "This is a sent message",
        txt: "This is test email 4, how are you today?",
        isRead: false,
        sentAt: Date.now() - 3 * 1000 * 60 * 60 * 24,
        to: "momo@momo.com",
      },
    ]
  }
  utilService.saveToStorage(MAIL_KEY, emails)
}
