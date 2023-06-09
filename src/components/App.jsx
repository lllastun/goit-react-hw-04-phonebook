import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import CONTACTS from '../DataSet/Contacts';
import css from './App.module.css';

function initialContacts() {
  const prevContacts = JSON.parse(localStorage.getItem('contacts'));

  if (prevContacts?.length === 0 || prevContacts === null) {
    console.log('reset');
    return CONTACTS;
  } else {
    return JSON.parse(localStorage.getItem('contacts'));
  }
}
export const App = () => {
  const [contacts, setContacts] = useState(() => initialContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addUser = userData => {
    const newUser = {
      id: nanoid(),
      ...userData,
    };

    if (
      !contacts.some(
        contact => contact.name.toLowerCase() === newUser.name.toLowerCase()
      )
    ) {
      setContacts(prevState => {
        return [...prevState, newUser];
      });
    } else {
      alert(`${newUser.name} is already in contacts.`);
      return null;
    }
  };

  const deleteUser = id => {
    setContacts(prevState => {
      return prevState.filter(user => user.id !== id);
    });
  };

  const newFilter = filterData => {
    setFilter(filterData.target.value);
  };

  const filteredContacts = () => {
    return contacts.filter(user =>
      user.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        color: '#010101',
        flexDirection: 'column',
        width: '330px',
        margin: '0 auto',
        border: 'solid 2px #999',
        padding: '15px',
        boxShadow: '2px 2px 2px 3px rgba(0, 0, 0, .2)',
        marginTop: '12px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm addUser={addUser} />
      <h2>Contacts</h2>
      <Filter newFilter={newFilter} />
      <ContactList
        users={filteredContacts()}
        deleteUser={deleteUser}
        className={css.list}
      />
    </div>
  );
};
