import React from 'react';
import Tour from './Tour';
const Tours = ({list, deleteItem}) => {

  return <>
    {list.map((item) => {
      const {id} = item;
      return <Tour 
        key={id} 
        id={id} 
        {...item} 
        deleteItem={deleteItem}
      />
    })}
  </>;
};

export default Tours;
