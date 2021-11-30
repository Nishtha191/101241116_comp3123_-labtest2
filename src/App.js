import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import './App.css'

export default function App(){
  
  const [data, setData] = useState([]);

  const apiData = async () =>{
    const city ='toronto'
//    const api = '6a5d69a68de78bb14d0a82afd064f3e0'
  const api = '4124b21146c875bb06cceeeadb51104e'
    const req = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=brampton&appid=${api}`);
    const res = await req;
    setData({
      desc:res.data.weather[0].description,
      temp: res.data.main.temp,
      city: res.data.name,
      icon: res.data.weather[0].icon,
      min_temp : res.data.main.temp_min,
      max_temp : res.data.main.temp_max,
      humidity : res.data.main.humidity,
    },[data.city]) // [] is for not to render multiple time (if we change the city then it gonna render again)
  }
  
  const iconUrl = `http://openweathermap.org/img/wn/10d@2x.png`

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let today = new Date();
  let dayName = days[today.getDay()]
  let mm = monthNames[today.getMonth()]
  let dd = today.getDate()
  let yy = today.getFullYear()

  let d =  mm+" "+dd+" ," + yy;

  let K = data.temp;
  let C = K - 273.15
  let min1 = data.min_temp;
  let C1 = min1 - 273.15
  let max1 = data.max_temp;
  let C2 = max1 - 273.15 

  useEffect(()=>{
    apiData()
  })
    return (
      <>
        <div className='App'>
            <h1>Today's Weather </h1><br/>        
            <h2>{dayName}</h2><br/> 
            <h2>{data.desc}</h2><br/>          
            <img src={iconUrl} alt="weather"/><br/>         
            <h1>City : {data.city} </h1><br/> 
            <h1>Temperature : {C.toFixed(1)} &#8451; </h1><br/> 
            <h1>Date : {d}</h1><br/> 
            <h2>Min. Temparature : {C1.toFixed(2)}</h2><br/> 
            <h2>Max. Temparature : {C2.toFixed(2)}</h2><br/> 
            <h2>Humidity level : {data.humidity}</h2><br/> 
        </div>
       </>
    )
}
