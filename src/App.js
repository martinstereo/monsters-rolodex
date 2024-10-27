import { Component } from 'react';

import './App.css';
import CardList from './components/card-list/card-list.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) =>
      this.setState(
        () => {
          return {monsters: users};
        }
      )
    );
  }

  onSearchChange = (event) => {
    // input value to lowercase
    const searchField = event.target.value.toLocaleLowerCase();
    //Update state with new Array
    this.setState(() => {
      return {searchField};
    });
  }

  render() {

    const { monsters, searchField} = this.state
    const { onSearchChange } = this

    // Filter out monsters
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input
          className='search-box'
          type='search'
          placeholder='search monsters'
          onChange={onSearchChange}
        />
        <CardList monsters={filteredMonsters}/>
        </div>
        );
      };
    }

export default App;
