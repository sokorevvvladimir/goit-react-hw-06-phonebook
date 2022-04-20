import styled from 'styled-components';
import List from './List';
import ContactForm from './Form';
import Filter from './Filter';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  changeFilter,
  clearFilter,
  getContacts,
  getFilter,
} from '../redux/itemsSlice';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
  width: 95vw;
  margin: 0 auto;
`;

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const onSameName = data => {
    return contacts.find(({ name }) => name === data.name);
  };

  const onFormSubmit = data => {
    if (onSameName(data)) {
      toast.error(`${data.name} is already in contacts.`);
      return;
    }
    dispatch(addItem(data));
    return;
  };

  const onInputHandler = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };

  const filterReset = () => {
    dispatch(clearFilter());
  };

  const getFilteredContacts = () => {
    if (contacts.length === 0) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onFormSubmit} />
      <h2>Contacts</h2>
      <Filter
        onFilterInput={onInputHandler}
        onBlur={filterReset}
        value={filter}
      />
      <List contacts={filteredContacts} />
      <Toaster />
    </Container>
  );
};

export default App;
