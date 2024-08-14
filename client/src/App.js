import { useState } from 'react';
import { Todo } from './components/Todo';
import { AddTodo } from './components/AddTodo';

function App() {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: 'my todo1',
      done: false,
    },
    {
      id: 2,
      title: 'my todo2',
      done: false,
    },
    {
      id: 3,
      title: 'my todo3',
      done: true,
    },
  ]);

  // AddTodo 컴포넌트는 상위 컴포넌트 item에 접근 불가능
  // 상위 컴포넌트인 App은 AddTodo에 접근 가능
  // => App 컴포넌트에 add() 함수를 추가하고 해당 함수를 AddTodo 프로퍼티로 넘겨 AddTodo 이용
  const addItem = (newItem) => {
    newItem.id = todoItems.length + 1; // key를 위한 id 추가
    newItem.done = false; // done 초기화

    setTodoItems([...todoItems, newItem]);
  }

  return (
    <div className="App">
      <AddTodo addItem={addItem}/>
      {/* <Todo />
      <Todo />
      <Todo /> */}
      {todoItems.map((item) => {
        console.log(item);
        return <Todo key={item.id} item={item}  />
      })}
    </div>
  );
}

export default App;
