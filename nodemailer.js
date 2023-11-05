
const nodemailer = require('nodemailer');
const sendMail= async (object) => {

     let testAccount = await nodemailer.testAccount();

   const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,

     auth: {
       user: "",
       pass: "",
     },
   });

    const info = await transporter.sendMail({
      from: '"" <>', 
      to:'',
      subject: "Confirmation", 
      text:`${object.username} are logged in`,
       html: "<b>Hello world</b>",
    });

    console.log("Message sent: ", info.messageId);
    res.send(info)

}

exports.sendMail=sendMail;