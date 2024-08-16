import React, { useState } from 'react';
import '../styles/AddTodo.scss';

export const AddTodo = ({addItem}) => {
  const [todoItem, setTodoItem] = useState({
    title: '',
  }); // 사용자 입력을 저장할 객체 (id, title, done 에 대한 정보를 저장해야 하므로 객체)

  const onBtnClick = () => {
    addItem(todoItem); // addItem 함수 사용
    setTodoItem({
        title: '', // 상태 초기화
    });
  };


  // 과제1) add enter키로 실행
  const enterKeyEventHandler = (e) => {
    if(e.key === 'Enter'){
        onBtnClick();
    }
  };

  return (
    <div className='AddTodo'>
      <input
        type='text'
        placeholder='Add your todo'
        value={todoItem.title}
        onChange={(e) => setTodoItem({ title: e.target.value })}
        onKeyDown={enterKeyEventHandler}
      />
      <button onClick={onBtnClick}>ADD </button>
    </div>
  );
};
