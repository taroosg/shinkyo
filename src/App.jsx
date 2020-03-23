import React from 'react';
import './App.css';
import shinkyo_title from './data/shinkyo_title.json';
import shinkyo_text from './data/shinkyo_text.json';

const App = () => {
  const edittedShinkyo = shinkyo_text.map((x, index) => {
    return !(Math.random() > 0.95)
      ? x
      : {
        char: shinkyo_text[~~(Math.random() * (shinkyo_text.length - 1))].char,
        index: index,
        editted: true,
      }
  })
  console.log(shinkyo_text);
  console.log(edittedShinkyo);
  return (
    <div className="App">
      <main className="App-main">
        <p>
          <code>
            {shinkyo_title.map(x => x.char).join('')}
          </code>
        </p>
        <p>
          <code>
            {shinkyo_text.map(x => x.char).join('')}
          </code>
        </p>
        <p>
          <code>
            {edittedShinkyo.map(x => x.char).join('')}
          </code>
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </main>
    </div >
  );
}

export default App;
