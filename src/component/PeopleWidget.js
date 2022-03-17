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

const PeopleWidget = (props) =>{
    
    const {loading, error, data} = useQuery(PEOPLE, {
        pollInterval: 2000*60,
    });
    
    
    const [peopleIn, setPeopleIn] =useState(0);
    const [timeStamp, setTimeStamp] = useState('');
    

    useEffect(() => {
        setTimeStamp(data?.device.lastHeard);
        setPeopleIn(data?.device.currentMeasurements[0].value);
        console.log("Uppdaterad");
    },[data?.device.lastHeard]);
    

    console.log('Hej' +timeStamp);
    console.log(loading);
    console.log(error);
    console.log(data);
    
    console.log(typeof(data?.device.lastHeard));
    console.log(data?.device.lastHeard);
    console.log(typeof(data?.device.currentMeasurements[0].value));
    console.log(props.openingHour);
    if(props.openingHour){
        return <h6>{peopleIn}</h6>
    }else{
        return <h6>Stängt</h6>
    }
}

export default PeopleWidget;