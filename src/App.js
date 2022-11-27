import React, {useEffect} from "react";
import Database from "./firebase";
import { ref, set, onValue } from "firebase/database";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import "animate.css"

function App(){
    let counting = 0;
  let localCount = 0;
  let retrivedCount;
  let ip;
  let blockedIPs = ["0"];
  let spamCount = 0;
  let ips;
  let res;
  // let data;
  // function onChange(value) {
  //   console.log("Captcha value:", value);
  // }
    
  // const [ip, setIP] = useState('');

  function Read (){
    const Counter = ref(Database, 'trees/');
    onValue(Counter, (snapshot) => {
      const data = snapshot.val().counter;
      counting = data;
      document.getElementById('counter').innerText = data
    });
    // alert(data)
  }
  useEffect  (() => {
    Read();
    retriveLocalData();
    getIPData();
    getIP();

  })
  function retriveLocalData(){
    retrivedCount = localStorage.getItem('localCountData');
    localCount = retrivedCount++;
    document.getElementById('localCounter').innerText = retrivedCount-1;
  }
  // Push Function
  function Push (){
    // Database.ref("user").set({
    //   name : name,
    //   age : age,
    // }).catch(alert);
    spamCount = spamCount+1;
    set(ref(Database, 'trees/'), {
      counter: counting+1,
      // age: age,      
    })
    localCount = localCount+1;
    
    localStorage.setItem('localCountData', localCount);
    retriveLocalData();

    // console.log(localCount)
  }
  const getIPData = async () =>{
    const res =  await axios.get('https://geolocation-db.com/json/')

    const dataIP = ref(Database, 'config/');
    onValue(dataIP, (snapshot) => {
      const data = snapshot.val().ip;
      blockedIPs = data;
      ips = blockedIPs.find(blockedIPs => blockedIPs === res.data.IPv4)
      if(ips === res.data.IPv4){
        window.location = "/ban"
      }
      
    });
  }
  const getIP = async () =>{
    res =  await axios.get('https://geolocation-db.com/json/')
    ip = res.data.IPv4;
    blockedIPs.push(ip)
    if(spamCount >50){
      set(ref(Database, 'config/'), {
        ip: blockedIPs
      })
    }
    
  }
  function Check(){
    if(document.getElementById('counter').innerText > 0){
      Push()
      
      // console.log(ips)
      // getIP()
      if (spamCount > 50){

        getIP()
      }
    }else{
      alert('Let the data to load')
    }
  }
    return(
        <div>
             <div className="navI">
        <div className="title">
          <h2 className="title-text text-center animate__animated animate__rubberBand">Grow Plants - Let's make the world lush green again 🎉</h2>
        </div>
      </div><hr />
      <div className="localCounter" style={{marginTop: 20}}>
        <h5 align="right" className="localCounterText">You have planted: <span id="localCounter"></span></h5>
        </div>
        
      <center>
    <div style={{marginBottom : 40}}>
      
      
      <img src="tree.gif" alt="Treeeeeee!" className="img-fluid treeImg"  loop/>

      <div className="card">
        {/* <img src="../public/tree.gif" alt="loading" id="tree" /> */}
        <div className="card-title counter">
          <h1>Trees planting counter: <b><span id="counter">0</span></b>&nbsp;🌲</h1>
        </div>
      </div><br />
      
      <button onClick={Check} className="btn btn-primary" id="addBtn">Add Tree</button>
      
      {/* <div className="card">
        <div className="card-title thank">
          <h1>Kindly, click the button below to <b>Thank the nature 🏞️</b></h1>
          <button onClick={Read} className="btn btn-success">Thank you!</button>
        </div>
      </div> */}
    </div>
    </center>
    </div>
    )
}
export default App
