// const router = require('express').Router();
// const mg = require('mailgun-js')
// const dotenv = require('dotenv');
// dotenv.config();

// const mailgun = () => mg({
//     apiKey: process.env.MAILGUN_API_KEY,
//     domain: process.env.MAILGUN_DOMAIN,
// });

// router.post("/", async (req, res) => {
//   const { email } = req.body
//   const data =  {
//     from: 'Sama Shop <contact@sama.dev>',
//     to: `${email}`,
//     subject: 'Thank You For Subscribing To our Newsletter',
//     html: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.<p>'
//   };

//   mailgun()
//   .messages()
//   .send(
//     data,
//     (error, body) => {
//       if (error) {
//         console.log(error)
//         res.status(500).send({ message: "Error in sending mail" })
//       } else {
//         console.log(body)
//         res.send({ message: "Email sent successfully" })
//       }
//     }
//   )
// });


// module.exports = router