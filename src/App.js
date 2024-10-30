import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  componentDidMount() {
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
    //console.log(Render from AppJS)
    const { monsters, searchField} = this.state
    const { onSearchChange } = this

    // Filter out monsters
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <SearchBox className='monsters-search-box' onChangeHandler={onSearchChange} placeholder='Search Monsters' />
        <CardList monsters={filteredMonsters}/>
        </div>
      );
  };
}

export default App;
