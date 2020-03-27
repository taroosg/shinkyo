import React, { useState } from 'react';
import './App.css';
import shinkyo_title from './data/shinkyo_title.json';
import shinkyo_text from './data/shinkyo_text.json';

const App = () => {

  // 初期値の設定
  // 正しい般若心経
  const correctText = shinkyo_text;
  // 漢字のみ摘出した般若心経
  const onlyText = correctText.filter(x => !(x.char === "・" || x.char === "、" || x.char === "。"));
  // 適当におかしくした般若心経
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

  // 精度計算
  // edittedパラメータがfalseのもののみ抽出した配列の長さ（=正しい般若心経の文字数）
  const isFalseArrayLength = textArray => textArray.filter(x => !x.editted).length;
  // 上記関数から全体のどのくらい正しい般若心経になっているかのチェック
  const culcTextAccuracy = (edittedText, correctText) => (isFalseArrayLength(edittedText) * 100) / isFalseArrayLength(correctText)

  // クリック管理
  // 現在の般若心経管理
  const [edittedText, setEdittedText] = useState(edittedShinkyo)
  // クリック時にクリックした箇所のedittedパラメータを切り替えてstateに入れる関数
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
        <p>現在の精度：{culcTextAccuracy(edittedText, correctText).toFixed(2)} %</p>
        <h2>
          <code>
            {shinkyo_title.map(x => x.char).join('')}
          </code>
        </h2>
        <div>
          <p>
            {edittedText.map((x, index) => <code key={index} className={x.clicked} onClick={() => handleEdittedText(index)}>{x.char}</code>)}
          </p>
        </div>
        {/* <p>
          {correctText.map((x, index) => <code key={index} >{x.char}</code>)}
        </p> */}
      </main>
    </div >
  );
}

export default App;
