import React, {useState,useRef,useEffect} from 'react';
import io from 'socket.io-client';

const Cam = ()=>{

let videoRef            = useRef(null)

const getLocalCam = () =>{
    navigator.mediaDevices.getUserMedia({
      video:true,
      //audio:true
  })
    .then((stream) => {
      //비디오 tag에 stream 추가
      let video       = videoRef.current
      video.srcObject = stream;
      let playPromise =  video.play();
      if (playPromise !== undefined) { 
        playPromise
        .then((_) => {

        })
        .catch((error) => {

        }); 
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getLocalCam()
  },[videoRef])
  
  return(
    <div className='container'>
        <h1 style={{color : 'white'}}>selfie App in React.js</h1>
        <video className='container' ref={videoRef}></video>
    </div>
  );

}

export default Cam;