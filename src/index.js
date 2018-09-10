import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import persons from '../assets/data.json'
import './style.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      persons,
      query: [],
    }
  }

  handleChange({ value }) {
    const { persons, query } = this.state;
    const personId = parseInt(value, 10);
    const person = persons.filter(person => person.id === personId)[0];
    const newPersonList = persons.filter(person => person.id !== personId);

    query.push(person),

    this.setState({
      persons: newPersonList,
      query,
    });
  }

  deletePerson(person) {
    const { persons, query } = this.state;
    const newQueryList = query.filter(item => item.id !== person.id);

    persons.push(person);

    this.setState({
      persons,
      query: newQueryList,
    });
  }

  render() {
    const { query, persons } = this.state;

    return (
      <div className="content">
        <h3 className="title">My team for this test</h3>
        <label>
          Add team member to this test:
          <select value="" onChange={event => this.handleChange(event.target)}>
            <option value=''>add team member</option>
            {persons.map(person =>
              <option key={person.id} value={person.id}>{person.username}</option>
            )}
          </select>
          {query && query.length > 0 && (
            <ul>
              {query.map(person => (
                <li key={`person-${person.id}`} onClick={() => this.deletePerson(person)}>
                  {person.username}
                </li>
              ))}
            </ul>
          )}
        </label>
      </div>
    );
  }
};

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
