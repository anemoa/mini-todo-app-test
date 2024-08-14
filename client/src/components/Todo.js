import React from 'react';

export const Todo = ({ item }) => {
  console.log('item >>> ', item); // {id: 1, title: 'my todo1', done: false}

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
    </div>
  );
};
