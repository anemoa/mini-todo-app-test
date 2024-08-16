import { useEffect, useState } from 'react';
import { Todo } from './components/Todo';
import { AddTodo } from './components/AddTodo';
import './styles/App.scss';
import axios from 'axios';

function App() {
  const [todoItems, setTodoItems] = useState([]);

  // [백엔드, 프론트 API 연결]
  // - Read API

  useEffect(() => {
    console.log('첫 렌더링 완료!');

    const getTodos = async () => {
      let res = await axios.get(`${process.env.REACT_APP_DB_HOST}/api/todos`);
      setTodoItems(res.data);
    };
    getTodos();
  }, []);

  // AddTodo 컴포넌트는 상위 컴포넌트 item에 접근 불가능
  // 상위 컴포넌트인 App은 AddTodo에 접근 가능
  // => App 컴포넌트에 add() 함수를 추가하고 해당 함수를 AddTodo 프로퍼티로 넘겨 AddTodo 이용

  // Create API
  const addItem = async (newItem) => {
    // newItem.id = todoItems.length + 1; // key를 위한 id 추가
    // newItem.done = false; // done 초기화
    console.log("실행");
    // setTodoItems([...todoItems, newItem]);
    // console.log("newItem >>> ", newItem);
    // 위의 4줄은 프론트 단에서 확인하기 위해서 만든것

    const res = await axios.post(`${process.env.REACT_APP_DB_HOST}/api/todo`, newItem);
    setTodoItems([...todoItems, res.data]);
    console.log("...todoItems >>>> ", ...todoItems);
    console.log("res.data >>>>> ", res.dataß);
  };
  

  // Delete API
  const deleteItem = async (targetItem) => {
    // const newTodoItems = todoItems.filter((e) => e.id !== targetItem.id);
    // setTodoItems(newTodoItems);
    console.log('targetItem >>>> ', targetItem);

    await axios.delete(`${process.env.REACT_APP_DB_HOST}/api/todo/${targetItem.id}`);

    const newTodoItems = todoItems.filter((e) => {
      return e.id !== targetItem.id;
    });
    setTodoItems(newTodoItems);
  };

  // Update API
  // => 즉, update() 함수를 App.js에서 만들지 않았더도 됐음. (프론트 단)
  // 하지만 API 이용해서 update 하려면
  // 1. Server API를 이용해 서버 업데이트를 한 후
  // 2. 변경된 내용을 화면에 다시 출력하는 두 가지 작업이 필요.

  const updateItem = async (targetItem) => {
    console.log('targetItem >> ', targetItem);

    await axios.patch(
      `${process.env.REACT_APP_DB_HOST}/api/todo/${targetItem.id}`,
      targetItem
    );
  };

  return (
    <div className='App'>
      <AddTodo addItem={addItem} />
      {/* <Todo />
      <Todo />
      <Todo /> */}
      {todoItems.map((item) => {
        console.log(item);
        return (
          <Todo
            key={item.id}
            item={item}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        );
      })}
    </div>
  );
}

export default App;
