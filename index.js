const contacts = require('./contacts');

const argv = require('yargs').argv;
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(console.table).catch(console.error);
      break;

    case 'get':
      getContactById(id).then(console.log).catch(console.error);
      break;

    case 'add':
      addContact(name, email, phone).then(console.log).catch(console.error);
      break;

    case 'remove':
      removeContact(id).then(console.log).catch(console.error);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);


