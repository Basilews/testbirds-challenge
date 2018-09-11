import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';


import persons from '../assets/data.json'
import 'normalize.css';
import './style.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      persons,
      query: [],
      isExpanded: false,
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

  expandList() {
    this.setState({ isExpanded: true });
  }

  render() {
    const { query, persons, isExpanded } = this.state;

    return (
      <div className="content">
        <div className="personList">
          <h3 className="title">My team for this test</h3>
            <ul className={classNames('persons', { isExpanded })}>
              <li className="select">
                <select
                  className="selectBox"
                  onChange={event => this.handleChange(event.target)}>
                  <option value=''>Add team member</option>
                  {persons.map(person =>
                    <option key={person.id} value={person.id}>{person.username}</option>
                  )}
                </select>
              </li>
              {query.length > 0 && query.map(person => (
                <li
                  key={`person-${person.id}`}
                  className="person">
                  <div className="personPicture">
                    <img
                      width="32"
                      height="32"
                      className="image"
                      src={`assets/${person.picture}`}/>
                    <div className="close" onClick={() => this.deletePerson(person)} />
                    <div className="tooltip">Remove user</div>
                  </div>
                  <div>
                    <div>{person.role}</div>
                    <div><b>{person.username}</b></div>
                  </div>
                </li>
              ))}
            </ul>
          {query.length > 5 && !isExpanded && (
            <div className="showAll" onClick={() => this.expandList()}>
              <span>Show all</span>
              <i className="arrow" />
            </div>
          )}
        </div>
      </div>
    );
  }
};

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
