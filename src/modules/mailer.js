const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


const {host, port, user, pass} = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: '.html',
      partialsDir: path.resolve('./src/resources/mail/'),
      layoutsDir: path.resolve('./src/resources/mail/'),
      defaultLayout: 'email.html',
  },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
  };
 
  transport.use(
    "compile",
    hbs({
      viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve("../src/resources/mail/"),
      },
      viewPath: path.resolve("../src/resources/mail/"),
      extName: ".html",
    })
  );

  transport.use('compile', hbs({
      viewEngine: 'handlebars',
      viewPath: path.resolve('./src/resources/mail/auth'),
      extName: '.html',
    }));

module.exports = transport;