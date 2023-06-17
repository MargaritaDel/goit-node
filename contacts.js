const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  }
  

async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
    if (contactIndex === -1) {
      return null;
    }
    const [contactToRemove] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contactToRemove;
  }

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
  
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };