import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ContactForm({ addUser }) {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');

  const handleName = ({ target: { value } }) => {
    setName(value);
  };

  const handleTel = ({ target: { value } }) => {
    setTel(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    addUser({ name, tel });
    setName('');
    setTel('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label>
        Name:
        <br />{' '}
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleName}
        />
      </label>
      <label>
        Number: <br />
        <input
          name="tel"
          value={tel}
          type="tel"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleTel}
        />
      </label>
      <br />
      <button className={css.addButton}> Add contact </button>
    </form>
  );
}

ContactForm.propTypes = {
  addUser: PropTypes.func.isRequired,
};
