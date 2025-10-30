require("dotenv").config();

const { MailtrapClient } = require("mailtrap");

const TOKEN = "a4d3858ffe81cbaa583abb69d354491d";

const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

module.exports = { mailTrapClient, sender };
