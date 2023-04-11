import React, { useState } from 'react';
// import ShowHide from '../../../../02-Tutorial/src/tutorial/3-conditional-rendering/setup/3-show-hide';

const Tour = ({id, name, info, image, price, deleteItem}) => {

  const [readMore, setReadMore] = useState(false);

  return <article className='single-tour'>
    <img src={image} alt={name} />
    <footer>
      <div className='tour-info'>
        <h4>{name}</h4>
        <h4 className='tour-price'>${price}</h4>
      </div>
      <p>
        {readMore ? info : `${info.substring(0,200)}...`}
        <button onClick={() => {setReadMore(!readMore)}}>
          {readMore? 'Show Less' : 'Read More' }
        </button>
      </p>

      <button className='delete-btn' onClick={() => {deleteItem(id)}}>Not Interested</button>
    </footer>
  </article>;
};

export default Tour;
  // 2. 在 Tour 中，使用简短的 toggle 方式设置 ReadMore
    // <p>
    //   {readMore ? info : `${info.substring(0,200)}...`}
    //   <button onClick={() => {setReadMore(!readMore)}}>{readMore? 'Show Less' : 'Read More' }</button>
    // </p>
      // `` template 充当反引号，在 {} JS 中再插入文本所用。
      // 这个情况下 info 无需写作 {info}, 因为已经有 {readMore ? info} 在外了。
  