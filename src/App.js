import { Component } from 'react';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      filteredMonsters: [],
    };
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) =>
      this.setState(
        () => {
          return {monsters: users, filteredMonsters: users};
        },
        () => {
          console.log(this.state);
        }
      )
    );
  }

  render() {
    console.log('Render');
    return (
      <div className="App">
        <input
          className='search-box'
          type='search'
          placeholder='search monsters'
          onChange={(event) => {
            console.log(event.target.value);
            // input value to lowercase
            const searchValue = event.target.value.toLocaleLowerCase();

            // Filter out monsters
            const searchFilteredMonsters = this.state.monsters.filter((monster) => {
              return monster.name.toLocaleLowerCase().includes(searchValue)
            })

            //Update state with new Array
            this.setState(() => {
              return {filteredMonsters: searchFilteredMonsters};
            })

          }}
        />
        {
          this.state.filteredMonsters.map((monster) => {
            return (
              <div key={monster.id}>
                <h1>{monster.name}</h1>
              </div>
            );
          })}
        </div>
        );
      };
    }

export default App;
