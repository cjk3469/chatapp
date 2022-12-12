import React, {useState,useRef,useEffect} from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import Chat from "./component/chat/Chat"
import Cam from "./component/cam/Cam"
import './App.css';

const socket =  io.connect('http://localhost:4000')
const App= ()=>{

  return (
    <>
      <Chat/>
      <Cam/>

    </>
  );
}

export default App


