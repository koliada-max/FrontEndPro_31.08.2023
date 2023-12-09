import React, { useState, useEffect } from 'react';
import ContactTable from './ContactTable';
import ContactForm from './ContactForm';
import Spinner from './Spinner';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
          setContacts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching contacts:', error);
          setLoading(false);
        });
    } catch (error) {
      console.error('Error in useEffect:', error);
      setLoading(false);
    }
  }, []);

  const handleDeleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  const handleSaveContact = (newContact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { ...newContact, id: Date.now() },
    ]);
    setShowForm(false);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ContactTable
            contacts={contacts}
            onDeleteContact={handleDeleteContact}
          />
          <button onClick={handleShowForm}>Add New Contact</button>

          {showForm && (
            <ContactForm
              onSaveContact={handleSaveContact}
              onCancel={handleHideForm}
            />
          )}
        </>
      )}
    </>
  );
};

export default Contacts;
