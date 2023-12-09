import React, { useState } from 'react';

const ContactForm = ({ onSaveContact, onCancel }) => {
  const [newContact, setNewContact] = useState({ name: '', username: '', phone: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setNewContact((prevContact) => ({ ...prevContact, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/^[a-zA-Z]+$/.test(newContact.name.trim())) {
      newErrors.name = 'Name should contain only letters';
    }

    if (!/^[a-zA-Z]+$/.test(newContact.username.trim())) {
      newErrors.username = 'Username should contain only letters';
    }

    if (!/^\d+$/.test(newContact.phone.trim())) {
      newErrors.phone = 'Phone should contain only digits';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSaveContact(newContact);
      setNewContact({ name: '', username: '', phone: '' });
    }
  };

  const handleCancel = () => {
    onCancel();
    setNewContact({ name: '', username: '', phone: '' });
    setErrors({});
  };

  return (
    <div>
      <h2>Form for adding contacts</h2>
      <form>
        <div className="form">
        <div className='input-item'>
          <label className='label'>Name:</label>
          <input
            type="text"
            value={newContact.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div className='input-item'>
          <label className='label'>Surname:</label>
          <input
            type="text"
            value={newContact.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>
        <div className='input-item'>
          <label className='label'>Phone number:</label>
          <input
            type="text"
            value={newContact.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
        </div>
        </div>
        <div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
