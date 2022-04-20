import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = { items: [], filter: '' };

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      return {
        items: state.items.filter(item => item.id !== action.payload),
        filter: '',
      };
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
    clearFilter(state) {
      state.filter = initialState.filter;
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

export const itemsReducer = persistReducer(persistConfig, itemsSlice.reducer);

export const { addItem, removeItem, changeFilter, clearFilter } =
  itemsSlice.actions;

// Selectors:

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;
