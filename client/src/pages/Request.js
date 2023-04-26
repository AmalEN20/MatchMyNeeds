import React from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
import '../../src/App.css';

import { ADD_REQUEST } from '../../utils/mutations';
// import Auth from '../../utils/auth';

const RequestForm = ({ requestItem }) => {
  const [request, setRequest] = useState('');

  const [addSkill, { error }] = useMutation(ADD_REQUEST);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

export default function Request() {
  return (
  <div> <h1 className='request'>My Requests</h1>

  <h2>Add a request</h2>

<form action="/" method="GET">
  <div>
    <label for="requestItem">Requested Item</label>
    <input id="requestItem" name="requestItem" type="text"></input>
  </div>
  <div>
    <label for="description">Description of Item</label>
    <input id="description" name="description" type="text"></input>
  </div>
<button type="submit">Submit</button>
</form>
  </div>
  );
}