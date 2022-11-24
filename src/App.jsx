import './App.css';
import { useState, useEffect } from 'react'

import cloud from './sources/cloud-lightning.png'
import inbox from './sources/inbox.png'
import taskChat from './sources/task.png'
import inbox2 from './sources/inbox-active.png'
import taskChat2 from './sources/task-active.png'

import { getUsers } from './api/api'

function App() {
  const [open, setOpen] = useState(true)
  const [chat, setChat] = useState(false)
  const [task, setTask] = useState(false)
  const [headerInbox, setHeaderInbox] = useState(true)
  const [headerTask,setHeaderTask] = useState(true)
  const [inboxOpen, setInboxOpen] = useState(false)
  const [taskOpen,setTaskOpen] = useState(false)
  const [chatBox, setChatBox] = useState(false)
  const [taskBox, setTaskBox] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    getUsers()
    .then((res) => {
      setData(res.data)
      setLoading(false)
    })
  }, [])

  const openChatAndTask = () => {
    setChat(true)
    setTask(true)
  }

  const openInbox = () => {
    setOpen(false)
    setHeaderInbox(false)
    setHeaderTask(false)
    setChat(false)
    setInboxOpen(true)
    setTaskOpen(false)
    setTask(true)
    setChatBox(true)
    setTaskBox(false)
  }

  const openTask = () => {
    setOpen(false)
    setHeaderInbox(false)
    setHeaderTask(false)
    setChat(true)
    setTask(false)
    setInboxOpen(false)
    setTaskOpen(true)
    setChatBox(false)
    setTaskBox(true)
  }

  // const closeAll = () =>{
  //   setOpen(true)
  //   setInboxOpen(false)
  //   setTaskOpen(false)
  //   setChat(false)
  //   setTask(false)
  //   setHeaderInbox(false)
  //   setHeaderTask(false)
  // }

  return (
    <div className="app">
      <div className="buttons">
        {task && (<div className="open">
          {headerTask && (<p className='header'>Task</p>)}
          <button className='button-2' onClick={() => openTask()}><img src={taskChat} alt="..." /></button>
        </div> )}

        {chat && (<div className="open">
          {headerInbox && (<p className='header'>Inbox</p>)}
          <button className='button-2' onClick={() => openInbox()}><img src={inbox} alt="..." /></button>
        </div> )}

        {inboxOpen && (<div className="open-active">
          <button className='button-active'><img src={inbox2} alt="..." /></button>
          <span className='background-1'> </span>
        </div> )}

        {taskOpen && (<div className="open-active">
          <button className='button-active-2'><img src={taskChat2} alt="..." /></button>
          <span className='background-2'> </span>
        </div> )}

        {open && (<div className="open-chat-task">
          <button className='button' onClick={() => openChatAndTask()}><img src={cloud} alt="..." /></button>
        </div>) }        
      </div>

      <div className="boxes">
        {chatBox && (<div className="chat-box">
          <input type="text" placeholder='Search' />
          {data? data.map((item,index) => {
            return <div className="chat-item" key={index}>
              <p className='first-name'>109220-Naturalization</p>
              <p style={{fontWeight: '600', marginBottom: '4px'}}>{item.owner.firstName}</p>
              <p>{item.text}</p>
            </div>
          }) : <div>{ loading && (
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}</div>}
        </div> )}

        {taskBox && (<div className="chat-task">
          {data? data.map((item,index) => {
            return <div className="chat-item" key={index}>
              <input type="text" placeholder='Search' />
            </div>
          }) : <div>{ loading && (
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}</div>}
        </div> )}
      </div>

    </div>
  );
}

export default App;
