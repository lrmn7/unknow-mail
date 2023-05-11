// This Website Created by L RMN
// Dont Forget to follow my instagram
// https://instagram.com/romanroman.nya
// https://github.com/lrmn7
// Happy to use :)

var express = require('express');
var nodemailer = require('nodemailer');
var axios = require('axios').default;
var router = express.Router();

const sendMails = (frm, t, s, txt, req, res) => new Promise((resolve, reject) => {
  var mailOpt = nodemailer.createTransport({
    service: 'gmail',
    auth: { // How to use see on https://github.com/lrmn7/anonymous-mail/readme.md
      user: 'your_mail@eek.com', // Input your mail required!
      pass: 'your_password' // Input your password required!
    }
  });

  var setOpt = {
    from: `"${frm}" <lrmn@hack.com>`,
    to: `${t}`,
    subject: `${s}`,
    html: `${txt}`
  };

  mailOpt.sendMail(setOpt, (err, info) => {
    if (err) {
      sd = 'System error <h1 class="animate-pulse">❌</h1>'
      tl = 'Failed send email ❌'
    } else {
      sd = 'Send success <h1 class="animate-pulse">✅</h1>'
      tl = 'Succes send email ✅'
    }
    resolve({sd, tl})
  });
});

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Send Email Anonymous',
    my_url: "https://hackmail-lrmn.vercel.app",
    desc: "Mau ngirim email ke orang tanpa ketauan? Atau mau ngerjain pacar? Hehe :)",
    author: "LRMN"
  });
});

router.post('/send', function (req, res) {
  const {
    subject,
    sendto,
    email,
    message
  } = req.body
  f = email,
    t = sendto,
    s = subject,
    txt = message
  sendMails(f, t, s, txt, req, res)
    .then((ress) => {
      res.render('msg', {
        title: ress.tl,
        my_url: "https://hackmail-lrmn.vercel.app",
        desc: "Mau ngirim email ke orang tanpa ketauan? Atau mau ngerjain pacar? Hehe :)",
        author: "LRMN",
        msgInfo: ress.sd
      });
    })
})

router.get('*', function (req, res) {
  res.status(404).render('error')
})

module.exports = router;