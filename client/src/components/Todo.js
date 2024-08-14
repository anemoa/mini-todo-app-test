import React, { useState } from 'react';

export const Todo = ({ item, deleteItem }) => {
  console.log('item >>> ', item); // {id: 1, title: 'my todo1', done: false}

  const [todoItem, setTodoItem] = useState(item);

  const onDeleteBtnClick = () => {
    deleteItem(todoItem);
  }

  return (
    <div className='Todo'>
      <input
        type='checkbox'
        id={`todo${item.id}`}
        name={`todo${item.id}`}
        value={`todo${item.id}`}
        defaultChecked={item.done} // tru, o // false, x
      />
      <label htmlFor={`todo${item.id}`}> {item.title} </label>
      <button onClick={onDeleteBtnClick}>DELETE</button>
    </div>
  );
};
