import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CharacterBuilder from './components/characterBuilder/CharacterBuilder'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <CharacterBuilder/>
  </React.StrictMode>
);
