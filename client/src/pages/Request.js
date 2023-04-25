import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import '../../src/App.css';

import { ADD_REQUEST } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function Request() {
  return (
  <div> <h1 className='products'>My Requests</h1>

  <h2>Add a request</h2>

<form onSubmit={handleFormSubmit}></form>

  </div>
  );
}