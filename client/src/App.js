import React, {useEffect, useState} from 'react';
import { io } from "socket.io-client"

const socket = io("http://localhost:5002")

function App() {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState();

  /*
  {
      sender: 'sender',
      receiver:'receiver',
      message: 'message',
      timestamp: 'timestamp'
  }
  */
    
  useEffect(() => {
    socket.on('message', (data) =>{
      const newMessages = [...messages, data];
      console.log(newMessages);
      setMessages(newMessages);
    });
  }, []);
  return (
    <>
      <div>
        <h1>Chat App</h1>

        <input type = "text" placeholder='Enter messages'
        onChange={(e) => setMessage (e.target.value)}
        value={message} />

        {
          messages.map((message) =>{
            <div key={message.timestamp}>
              <p>{message.timestamp}</p>
              <p>{message.message}</p>
              <hr/>
              </div>
          })
        }
        
        <button onClick={() =>{
          socket.emit('message',{
            sender: 'sender',
            receiver:'receiver',
            message,
            timestamp: new Date().toISOString(),
        });
        setMessage('');
        }}> Send Message</button>

      </div>
    </>
  )
}

export default App