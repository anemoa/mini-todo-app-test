import { useEffect, useMemo, useState } from 'react';
import { Todo } from './components/Todo';
import { AddTodo } from './components/AddTodo';
import './styles/App.scss';
import axios from 'axios';
import {API_BASE_URL} from './app-config.js'

function App() {
  const [todoItems, setTodoItems] = useState([]);

  // [백엔드, 프론트 API 연결]
  // - Read API

  useEffect(() => {
    console.log('첫 렌더링 완료!');
    // [env 버전]
    console.log(process.env.REACT_APP_DB_HOST);

    //[app-config.js 버전]

    console.log(`app-config >>> ${API_BASE_URL}`);
    

    const getTodos = async () => {
      let res = await axios.get(`${API_BASE_URL}/api/todos`);
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

    // 현재 API 호출 후 응답을 기다리지 않고 바로 상태 업데이트를 진행하면,
    // 네트워크 지연 등으로 예상치 못한 문제가 발생할 수 있습니다.
    // 따라서 비동기 작업 처리를 제대로 해주는 것이 좋다.
    if(res.status === 200){
      setTodoItems([...todoItems, res.data]);
    }else{
      console.error('failed to add item');
    }

  };
  

  // Delete API
  const deleteItem = async (targetItem) => {
    // const newTodoItems = todoItems.filter((e) => e.id !== targetItem.id);
    // setTodoItems(newTodoItems);
    console.log('targetItem >>>> ', targetItem);

    const res = await axios.delete(`${process.env.REACT_APP_DB_HOST}/api/todo/${targetItem.id}`);

    if (res.status === 200){
      const newTodoItems = todoItems.filter((e) => {
        return e.id !== targetItem.id;
      });
      setTodoItems(newTodoItems);
    } else{
      console.error('delete error');
    }

  };

  // Update API
  // => 즉, update() 함수를 App.js에서 만들지 않았더도 됐음. (프론트 단)
  // 하지만 API 이용해서 update 하려면
  // 1. Server API를 이용해 서버 업데이트를 한 후
  // 2. 변경된 내용을 화면에 다시 출력하는 두 가지 작업이 필요.

  const updateItem = async (targetItem) => {
    console.log('targetItem >> ', targetItem);

    const res = await axios.patch(
      `${process.env.REACT_APP_DB_HOST}/api/todo/${targetItem.id}`,
      targetItem
    );

    if(res.status === 200){
      // 업데이트 상태 or 기타 원하는대로 코드 작성
    }else{
      console.error('update error');
    }
  };



  return (
    <div className='App'>
      <AddTodo addItem={addItem} />
      <div className='left-todos'> {todoItems.length} Todos</div>
      {todoItems.length > 0 ? (
        todoItems.map((item) => {
          console.log(item);
          return (
            <Todo
              key={item.id}
              item={item}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          );
        })
      )  :( <p className='empty-todos'> Todo 추가해라</p>)}

    </div>
  );
}

export default App;
