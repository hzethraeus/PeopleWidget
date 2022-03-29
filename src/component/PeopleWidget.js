import React from 'react';
import {useQuery, gql} from '@apollo/client';

export  const PEOPLE = gql`
query Query ($timerangestart: String, $timerangeend: String){
	device(deviceId:"e255344f-cbc2-46f1-9bdf-671e23ef7077"){
    verboseName
	lastHeard
    history(timerangestart: $timerangestart, timerangeend: $timerangeend, fields: "COUNTER_A")
    
   
    }
  }
`;

const PeopleWidget = (props) =>{
    //var endTime = (new Date()).toISOString();
    
   // const [timeStamp, setTimeStamp] = useState('');
    console.log(props.timeRN.toISOString());
    var endTime = props.timeRN;
    var startTime = new Date();
    console.log(startTime)
    startTime.setHours(startTime.getHours() -2);
    console.log(startTime.toISOString());
    console.log("hej");
    const {data, error} = useQuery(PEOPLE, {
        variables: {
            
            "timerangestart": startTime,
            "timerangeend": endTime
            },
        //pollInterval: (60*1000), 
    }); 
    
    
    //const [peopleIn, setPeopleIn] = useState(Number(0));
    
    //const [tryck, setTryck]=useState('Loading');
/*
    useEffect(() => {
        console.log("Uppdaterad");
        if(data?.device.lastHeard !== timeStamp){
            /*console.log("Inuti");
            //console.log(typeof(data?.device.currentMeasurements[0].value));
            if(typeof(data?.device.currentMeasurements[0].value) === 'number'){
                setPeopleIn((peopleIn + data?.device.currentMeasurements[0].value));
            }else{
                console.log("data er ikke nummer");
            }

            setTimeStamp(data?.device.lastHeard);
            
        }
    },[data?.device]);
  */  


   /* useEffect(() => {
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
    }, []);*/

    //console.log('Hej' +timeStamp);
    console.log(data);
    console.log(error);
    //console.log(typeof(timeStamp));
   //console.log(peopleIn);
    console.log(props.openingHour);
    if(props.openingHour){
        //{peopleIn} {tryck}
        
        return <h6>Hej</h6>
    }else{

        return <h6>Stängt</h6>
    }
}

export default PeopleWidget;