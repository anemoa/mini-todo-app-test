import React, { useState } from 'react';
import '../styles/Todo.scss';

export const Todo = ({ item, deleteItem, updateItem }) => {
//   console.log('item >>> ', item); // {id: 1, title: 'my todo1', done: false}

  const [todoItem, setTodoItem] = useState(item);
  const [readOnly, setReadOnly] = useState(true);

  const onDeleteBtnClick = () => {
    deleteItem(todoItem);
  };

  // title 클릭시 실행될 함수: readOnly를 false로 변경
  const offReadOnlyMode = () => {
    setReadOnly(false);
  };


  // readOnly true: enter키 누르면 readOnly를 true로 변경
  const enterKeyEventHandler = (e) => {
    if(e.key === 'Enter'){
        setReadOnly(true);
        updateItem(todoItem);
    }
  };



  // 커서가 깜빡인다고 수정 가능한 것은 아님
  // 사용자가 키보드 입력할 때마다 item 새 값으로 변경
  const editEventHandler = (e) => {
    // rest: id, title, done 정보
    const {title, ...rest} = todoItem;
    setTodoItem({
       title: e.target.value,
       ...rest,
    })
  };

  //checkbox 업데이트
  const checkboxEventHandler = (e) => {
    // rest: id, title 정보
    const {done, ...rest} = todoItem;

    const updatedItem = {
      done: e.target.checked,
      ...rest,
    };

    // setTodoItem({
    //     done: e.target.checked,
    //     ...rest,
    // });
    setTodoItem(updateItem);
    updateItem(updatedItem); // 수정2 - 체크 박스 변경시 저장
    console.log(e.target.checked);
  };

  return (
    <div className='Todo'>
      <input
        type='checkbox'
        id={`todo${todoItem.id}`}
        name={`todo${todoItem.id}`}
        value={`todo${todoItem.id}`}
        defaultChecked={todoItem.done} // tru, o // false, x
        onChange={checkboxEventHandler}
      />
      <input
        type='text'
        value={todoItem.title}
        readOnly={readOnly}
        onClick={offReadOnlyMode} 
        onChange={editEventHandler}
        onKeyDown={enterKeyEventHandler}
      />
      {/* <label htmlFor={`todo${item.id}`}> {item.title} </label> */}
      <button onClick={onDeleteBtnClick}>DELETE</button>
    </div>
  );
};
