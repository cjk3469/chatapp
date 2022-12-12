import React, {useState,useRef,useEffect} from 'react';
import "./Chat.css"
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';

const socket =  io.connect('http://localhost:4000')

const Chat = () =>{
  
  const [name, setName] = useState('');
  const [message,setMessage] = useState('');
  const [room,setRoom] = useState('');

  const [state, setState] = useState({name:'',message:''});
  const [chat,setChat]    = useState([]);

  const joinRoom = (e)=>{
    e.preventDefault();
    const data = {name,room,message}
    if(room !== ''){
      socket.emit('join',{data});  
    }
    setMessage('');
  }

  // useEffect(()=>{
  //   socket.on('message',(data.message))={
  //     setChat
  //   }
  // })

  useEffect(()=>{
    socket.on('message',({name,message})=>{
      setChat([...chat,{name,message}])
      console.log(chat);
    })
  },[chat])
  

  const onRoomHandler= (e)=>{
    setRoom(e.target.value)
  }
  const onNameHandler= (e)=>{
    setName(e.target.value)
  }
  const onMessageHandler= (e)=>{
    setMessage(e.target.value)
  }

  const onTextChange = (e) =>{
    setState({...state,[e.target.name]: e.target.value});
  }
  
      //message 보내는 함수
  const onMessageSubmit =(e)=>{
    e.preventDefault();
    const {name, message} =state;
    socket.emit('message',{name, message});
    setState({name,message : ''});
  }
  

  const renderChat =()=>{
    return chat.map(({name, message},index)=>(
      <div key={index} style={{overflow:'auto'}}>
        <h3>{name}:<span>{message}</span></h3>
      </div>
    ))
  }

  return(
    <>
      <div className='card'>
      <form onSubmit={joinRoom}>
        <h1>Message</h1>
        <div className="name-field">
          <TextField 
          name ="name" 
          onChange={onNameHandler} 
          value={name}
          label="Name"/>
        </div>
        <div >
          <TextField 
          name ="message" 
          onChange={onMessageHandler} 
          value={message}
          id="outlined-multiline-static"
          variant="outlined"
          label="Message"/>
        </div>
        <br/>
        <div >
          <TextField 
          name ="room" 
          onChange={onRoomHandler} 
          value={room}
          id="outlined-multiline-static"
          variant="outlined"
          label="room"/>
        </div>
        <button>Send Message</button>
      </form>

      <div className="render-chat" style={{overflow:'auto'}}>
        <h1>Chat log {room}</h1>
        {renderChat()}
      </div>

    </div>
    </>
    // <div className='card'>
    //   <form onSubmit={onMessageSubmit}>
    //     <h1>Message</h1>
    //     <div className="name-field">
    //       <TextField 
    //       name ="name" 
    //       onChange={e=> onTextChange(e)} 
    //       value={state.name}
    //       label="Name"/>
    //     </div>
    //     <div >
    //       <TextField 
    //       name ="message" 
    //       onChange={e=> onTextChange(e)} 
    //       value={state.message}
    //       id="outlined-multiline-static"
    //       variant="outlined"
    //       label="Message"/>
    //     </div>
    //     <div >
    //       <TextField 
    //       name ="room" 
    //       onChange={e=> onTextChange(e)} 
    //       value={room}
    //       id="outlined-multiline-static"
    //       variant="outlined"
    //       label="room"/>
    //     </div>
    //     <button>Send Message</button>
    //   </form>

    //   <div className="render-chat" style={{overflow:'auto'}}>
    //     <h1>Chat log</h1>
    //     {renderChat()}
    //   </div>

    // </div>
  );
}

export default Chat;