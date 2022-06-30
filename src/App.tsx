import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [list, setList] = useState<Array<string>>([]);
  const [word, setWord] = useState<string>('')

  useEffect(() => {
    console.log(word);
  }, [word])

  return (
    <div>
      {list.map((val, ind) => {
        return (
          <div>
            <p>{val}</p>
            <button onClick={() => {
              let l = []
              for(let i = 0; i < list.length; i++) {
                if(i == ind) {
                  // Do Nothing
                } else {
                  l.push(list[i]);
                }
                setList(l);
              }
            }}>Delete</button>
          </div>
        )
      })}
      <input value={word} onKeyDown={(e) => {
        if(e.key == 'Enter') {
          let cur = list;
          cur.push(word);
          setWord('')
        } else if(e.key == 'Backspace') {
          let cur = '';
          for(let i = 0; i < word.length - 1; i++) {
            cur += word[i];
          }
          setWord(cur);
        } else if(e.key.length == 1) {
          let cur = word;
          cur += e.key;
          setWord(cur);
        }
      }} />
      <button
      onClick={() => {
        let cur = list;
        cur.push(word);
        setWord('')
      }}>Set</button>
      <button onClick={() => {
        setList([])
        setWord('');
      }}>Reset</button>
    </div>
  )
};

export default App;