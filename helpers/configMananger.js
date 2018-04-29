const yaml = require('js-yaml');
const fs = require('fs');

let config = {};

try {

    config = yaml.safeLoad(fs.readFileSync(__dirname + '/email.yml', 'utf8'));
    console.log(config);

} catch (e) {

    console.log(e);
}

// Our mock function that would do the heavy lifting of sending the email message.
// The mailOptions object is designed to be compatible with Nodemailer
const sendEmail = (transport, mailOptions) => {

    console.log(mailOptions);
};

// Shape the recipients into an array
const getRecipients = (recipients) => {

    const to = [];
    for (const email in recipients) {
        const name = recipients[email];
        const address = name ? `${name} <${email}>` : email;
        to.push(address);
    }
    return to;
};

const sendMessageCore = (message, subject, body) => {

    const mailOptions = {
        from: message.from,
        to: getRecipients(message.recipients),
        subject,
        html: body,
    };
    sendEmail(config.transport, mailOptions);
};

const sendMessageToManagement = (subject, body) => {

    const message = config.management_message;
    sendMessageCore(message, subject, body);
};

const sendMessageToOperations = (subject, body) => {
    const message = config.operations_message;
    sendMessageCore(message, subject, body);
};

const sendMessageToAllEmployees = (subject, body) => {
    const message = config.all_employees_message;
    sendMessageCore(message, subject, body);
};

sendMessageToManagement('Management Update', 'Here is the body of the message');
sendMessageToOperations('Operations Update', 'Here is the body of the message');
sendMessageToAllEmployees('All Employees Update', 'Here is the body of the message');