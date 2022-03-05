import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util-service.js"

const MAIL_KEY = "mailDB"

_createMails()

export const loggedinUser = {
  
  mail: "user@appsus.com",
  fullname: "Jon Zacks",
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
    from: 'user@appsus.com',
    fullname: 'Jon Zacks'
  }
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: storageService._makeId(),
        subject: "Parking Ticket",
        txt: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.',
        isRead: false,
        sentAt: Date.now() - 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: 'jerusalemmuni@jem.il',
        fullname: 'Jerusalem Municipality'
      },
      {
        id: storageService._makeId(),
        subject: "Your financial report is way overdue",
        txt: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.',
        isRead: true,
        sentAt: Date.now() - 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: 'boss@work.com',
        fullname: 'Steve Romer'
      },
      {
        id: storageService._makeId(),
        subject: "Basketball onight?",
        txt: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.',
        isRead: true,
        sentAt: Date.now() - 2 * 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: 'dave@yeger.com',
        fullname: 'Dave Yeger'
      },
      {
        id: storageService._makeId(),
        subject: "Sale! 2 Days in Eilat Half Off!",
        txt: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.',
        isRead: false,
        sentAt: Date.now() - 2 * 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: 'noreply@hilton.com',
        fullname: 'Hilton Inc.'
      },
      {
        id: storageService._makeId(),
        subject: "Hey what's up?",
        txt: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.',
        isRead: true,
        sentAt: Date.now() - 2 * 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: 'friend@friend.com',
        fullname: 'David Moeller'
      },
      {
        id: storageService._makeId(),
        subject: "Exciting News!",
        txt: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.',
        isRead: false,
        sentAt: Date.now() - 3 * 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: 'random@random.com',
        fullname: 'Tel Aviv Bounce House'
      },
      {
        id: storageService._makeId(),
        subject: "Sorry I missed your birthday...",
        txt: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.',
        isRead: true,
        sentAt: Date.now() - 4 * 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: 'dad@dad.com',
        fullname: 'Dad'
      },
      {
        id: storageService._makeId(),
        subject: "Work assignment",
        txt: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.',
        isRead: false,
        sentAt: Date.now() - 4 * 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: 'workfriend@jem.il',
        fullname: 'Jack McNeil'
      },
      {
        id: storageService._makeId(),
        subject: "Yay! Happy Birthday!",
        txt: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.',
        isRead: true,
        sentAt: Date.now() - 5 * 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: 'wife@wife.com',
        fullname: 'My Beautiful Wife'
      },
      {
        id: storageService._makeId(),
        subject: "Happy Birthday!",
        txt: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.',
        isRead: true,
        sentAt: Date.now() - 5 * 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: 'mom@mom.com',
        fullname: 'Mom'
      },
      {
        id: storageService._makeId(),
        subject: "Shabbat Times",
        txt: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.',
        isRead: false,
        sentAt: Date.now() - 5 * 1000 * 60 * 60 * 24,
        to: "user@appsus.com",
        from: 'myshul@shul.il',
        fullname: 'Bet Knesset'
      },
      
      {
        id: storageService._makeId(),
        subject: "Re: Happy Birthday",
        txt: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.",
        isRead: true,
        sentAt: Date.now() - 1000 * 60 * 60 * 24,
        to: "mom@mom.com",
        from: "user@appsus.com",
        fullname: 'Jon Zacks'
      },
      {
        id: storageService._makeId(),
        subject: "Can you come over tonight?",
        txt: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.",
        isRead: true,
        sentAt: Date.now() - 2 * 1000 * 60 * 60 * 24,
        to: "popo@popo.com",
        from: "user@appsus.com",
        fullname: 'Jon Zacks'
      },
      {
        id: storageService._makeId(),
        subject: "Looking for a babysitter urgently",
        txt: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.",
        isRead: true,
        sentAt: Date.now() - 2 * 1000 * 60 * 60 * 24,
        to: "momo@momo.com",
        from: "user@appsus.com",
        fullname: 'Jon Zacks'
      },
      {
        id: storageService._makeId(),
        subject: "no subject",
        txt: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.",
        isRead: true,
        sentAt: Date.now() - 3 * 1000 * 60 * 60 * 24,
        to: "momo@momo.com",
        from: "user@appsus.com",
        fullname: 'Jon Zacks'
      },
      {
        id: storageService._makeId(),
        subject: "Thanks for your help",
        txt: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus hic consectetur sint non quas. Dolores cumque repellendus dolor, quae nam nostrum quasi laborum asperiores accusamus quisquam ad ea reiciendis soluta.",
        isRead: true,
        sentAt: Date.now() - 3 * 1000 * 60 * 60 * 24,
        to: "momo@momo.com",
        from: "user@appsus.com",
        fullname: 'Jon Zacks'
      },
    ]
  }
  utilService.saveToStorage(MAIL_KEY, mails)
}
