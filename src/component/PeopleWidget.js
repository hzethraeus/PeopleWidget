import React, {useState, useEffect } from 'react';
import {useQuery, gql} from '@apollo/client';

export  const PEOPLE = gql`
query Query {
    device(deviceId:"e255344f-cbc2-46f1-9bdf-671e23ef7077"){
      
  lastHeard
  
      currentMeasurements (fieldVerboseNames: "counter_A") {
        
        value
      }
  
    }
  }
`;

/*
Måste fixa:
Första gången sidan laddas så måste vi räkna ut hur många som varit där.
Som sedan uppdateras per  

*/

const PeopleWidget = (props) =>{
    
    const {data} = useQuery(PEOPLE, {
        pollInterval: 2*60*1000,
    }); 
    
    
    const [peopleIn, setPeopleIn] = useState(Number(0));
    const [timeStamp, setTimeStamp] = useState('');
    const [tryck, setTryck]=useState('Loading');

    useEffect(() => {
        console.log("Uppdaterad");
        if(data?.device.lastHeard !== timeStamp){
            console.log("Inuti");
            //console.log(typeof(data?.device.currentMeasurements[0].value));
            if(typeof(data?.device.currentMeasurements[0].value) === 'number'){
                setPeopleIn((peopleIn + data?.device.currentMeasurements[0].value));
            }else{
                console.log("data er ikke nummer");
            }
            setTimeStamp(data?.device.lastHeard);
        }
    },[data?.device]);


    useEffect(() => {
        const timer = setInterval(() => { // Creates an interval which will update the current data every minute
          // This will trigger a rerender every component that uses the useDate hook.
        setPeopleIn((prev)=>{
            return prev - prev*0.05; //Kolla upp så denna är rätt inställd.
        });
        if(peopleIn<=6){
            setTryck('Lågt');
        }else if(peopleIn<=12){
            setTryck('Medel');
        }else{
            setTryck('Högt');
        }
      }, 60 * 2*1000);
      return () => {
        clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
      }
    }, []);

    console.log('Hej' +timeStamp);
    console.log(data);
    console.log(data?.device.lastHeard);
    console.log(peopleIn);
    console.log(props.openingHour);
    if(props.openingHour){
        
        return <h6>{peopleIn} {tryck}</h6>
    }else{

        return <h6>Stängt</h6>
    }
}

export default PeopleWidget;