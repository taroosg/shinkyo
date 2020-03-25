import React, { useState } from 'react';
import './App.css';
import shinkyo_title from './data/shinkyo_title.json';
import shinkyo_text from './data/shinkyo_text.json';

const App = () => {

  // 初期値の設定
  const correctText = shinkyo_text;
  const onlyText = correctText.filter(x => !(x.char === "・" || x.char === "、" || x.char === "。"));
  const edittedShinkyo = correctText.map((x, index) => {
    return !(x.char === "・" || x.char === "、" || x.char === "。")
      ? !(Math.random() > 0.90)
        ? x
        : {
          char: onlyText[~~(Math.random() * (onlyText.length - 1))].char,
          index: index,
          editted: true,
          clicked: "",
        }
      : x
  })

  // クリック管理
  const [edittedText, setEdittedText] = useState(edittedShinkyo)
  const handleEdittedText = index => {
    const nowArray = [...edittedText]
    const newObj = { ...nowArray[index], editted: nowArray[index].editted ? false : true, clicked: nowArray[index].clicked === "" ? "clicked" : "" };
    nowArray[index] = newObj;
    setEdittedText(nowArray);
  }

  return (
    <div className="App">
      <main className="App-main">
        <h1>Master of Heart Sutra</h1>
        <p>間違っている文字をクリック！</p>
        {/* <p>{correctText.filter(x => !x.editted).length}</p> */}
        {/* <p>{edittedText.filter(x => !x.editted).length}</p> */}
        <p>現在の精度：{((edittedText.filter(x => !x.editted).length) * 100 / (correctText.filter(x => !x.editted).length)).toFixed(2)} %</p>
        <h2>
          <code>
            {shinkyo_title.map(x => x.char).join('')}
          </code>
        </h2>
        <p>
          {edittedText.map((x, index) => <code key={index} className={x.clicked} onClick={() => handleEdittedText(index)}>{x.char}</code>)}
        </p>
        {/* <p>
          {correctText.map((x, index) => <code key={index} >{x.char}</code>)}
        </p> */}
      </main>
    </div >
  );
}

export default App;
