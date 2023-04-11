import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReLoading] = useState(false);

  async function getList(){
    try {
      const reponse = await fetch(url);
      const list = await reponse.json();
      setList(list);
      setIsLoading(false);
      console.log(list);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(()=>{
    getList();
  },[]);

  const deleteItem = (id) => {
    const newList = list.filter((singleTour) => {return singleTour.id !== id});
      setList(newList);
  }

    if (isLoading === true) {
      return <Loading />
    }
  
    if (list.length === 0) {
      return <main>
        <div className='title'>
          <h2>No Tours Left</h2>
          <button onClick={() => {getList()}} className='btn'>Refresh</button>
        </div>
      </main>
    } else {
      return <main>
        <div className='title'>
          <h2>Our Tours</h2>
          <div className='underline'></div>
        </div>
        <Tours list={list} deleteItem={deleteItem}/>
      </main>
    }
}

export default App


// 在未知 useEffect 如何能够 实现 Refresh 的情况下，只能使用如下结构:
  // (是否有比这种 if-else 重设更灵活的 useEffect Refresh 方法可以调用？)
  
  //  const [isReloading, setIsReLoading] = useState(false);
  
  //  useEffect(()=>{
  //    getList();
  //  },[]);

  // if (isReloading === false) {
  //   <h2>No Tours Left</h2>
  //   <button onClick={() => {setIsReLoading(!isReloading)}} className='btn'>Refresh</button>
  // } else {
  //   getList();
  //   setIsReLoading(!isReloading);
  // }

// 参考视频做出的订正：

  // 1. 在语句相同的情况下，给 fetch data 阶段增加一个报错功能:
    // 善用 try {} catch (error) {} 语句
    // try {
    //   const reponse = await fetch(url);
    //   const list = await reponse.json();
    //   setList(list);
    //   setIsLoading(false);
    //   console.log(list);
    // } catch (error) {
    //   setIsLoading(false);
    //   console.log(error);
    // }

  // 2. 在 Tour 中，使用简短的 toggle 方式设置 ReadMore
    // <p>
    //   {readMore ? info : `${info.substring(0,200)}...`}
    //   <button onClick={() => {setReadMore(!readMore)}}>{readMore? 'Show Less' : 'Read More' }</button>
    // </p>
      // `` template 充当反引号，在 {} JS 中再插入文本所用。
      // 这个情况下 info 无需写作 {info}, 因为已经有 {readMore ? info} 在外了。
  
  // 3. 重设 refresh 方法：不需要 isReLoading 变量，只需要在 onClick 的时候 getList。

    // onClick{() => {getList()}}
      // 或直接：
    // onClick{getList}

    // 什么时候用 onClick{function}, 什么时候用 onClick{() => {}}?
      // onClick(deleteItem) 或 onClick(refresh) 都在 click 的瞬间完成 调用函数；
      // 而 onClick( () => {} ) 是新建一个 function，并在新 function 内 执行一个 function。
    // App.js 中本地命名的 function 可以不使用 callback。
    // 而 Tour 中就不能这样使用，必须添加 callback，否则会报错：App 与 Tour 不能同时 render！