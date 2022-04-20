import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../redux/itemsSlice';
import Notification from '../Notification';
import PropTypes from 'prop-types';

const StyledUl = styled.ul`
  padding-inline-start: 0;
`;

const Li = styled.li`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1cadca;
  color: #ffffff;
  padding: 10px;

  &:nth-child(2n) {
    background-color: #25515a;
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  @media (min-width: 769px){
    width: 80%;
  };
  @media (min-width: 1024px) {
    width: 30%;
  })
`;

const Button = styled.button`
  width: 100px;
  min-width: 100px;
  height: 40px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 3px;
  margin-left: 10px;
  max-height: 40px;
  cursor: pointer;

  &:hover {
    background-color: #cde2e5;
  }
  &:active {
    color: #ffffff;
    background-color: #b3c2c4;
  }
`;

const List = ({ contacts }) => {
  const dispatch = useDispatch();

  return (
    <StyledUl>
      {contacts &&
        contacts.map(({ name, id, number }) => {
          return (
            <Li key={id}>
              {name}: {number}
              <Button onClick={() => dispatch(removeItem(id))}>Delete</Button>
            </Li>
          );
        })}
      {contacts.length === 0 && <Notification />}
    </StyledUl>
  );
};

export default List;

List.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
