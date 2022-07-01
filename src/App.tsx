import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [list, setList] = useState<Array<string>>([]);
  const [word, setWord] = useState<string>('')

  useEffect(() => {
    console.log(word);
  }, [word])

  return (
    <div>
      <DragDropContext onDragEnd={(res) => {
        if(!res.destination) return;

        const c = list;

        const [reorder] = c.splice(res.source.index, 1);
        c.splice(res.destination.index, 0, reorder)
        setList(c);
        
      }}>
        <Droppable droppableId='todo' type='TEXT'>
          {(p) => (
            <ul {...p.droppableProps} ref={p.innerRef}>
              {
                list.map((val, i) => {
                  return (
                    <Draggable index={i} draggableId={i.toString()}>
                      {(p) => (
                        <div {...p.dragHandleProps} {...p.draggableProps} ref={p.innerRef}>
                          <p {...p.dragHandleProps} {...p.draggableProps} ref={p.innerRef}>{val}</p>
                          <button {...p.dragHandleProps} {...p.draggableProps} ref={p.innerRef} onClick={() => {
                            let l = [];
                            for(let j = 0; j < list.length; j++) {
                              if(j == i) {
                                // Do Nothing
                              } else {
                                l.push(list[i]); 
                              }
                              setList(l);
                            }
                          }}>Delete</button>
                        </div>
                      )}
                    </Draggable>
                  )
                })
              }
              {p.placeholder}
            </ul>
          )}
        </Droppable>

      </DragDropContext>
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