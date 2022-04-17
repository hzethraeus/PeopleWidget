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
    
    
   
    
    var endTime = props.timeRN;
    var startTime =props.timeBF;
    //console.log(endTime);

    const {data} = useQuery(PEOPLE, {
        variables: {
            "timerangestart": startTime,
            "timerangeend": endTime
            },
    });

    var people='';

    if (typeof data !== 'undefined') {
        const obj = JSON.parse(data?.device.history);
        //console.log(obj);
        const lastHeard =new Date(data?.device.lastHeard);
        const dif = endTime-lastHeard;
        

        if(dif<5400000){  // 1.5 hours
            var sum = 0;
            var factor=1;

            obj.forEach(element => {
                
                sum+= (element.COUNTER_A*factor);
                //factor=factor+0.1;   //for scaling purpose
                
            });
            console.log(sum);
            if(sum<=6){
                people='Lågt';
            }else if(sum<=12){
                people='Medel';
            }else{
                people='Högt';
            }
        }
    }else{
        people='Ej tillg.';
    }


//Abbas visat - C - Tidszoner måste fixas
//Factor for scaling
//CSS ska se exakt likadan ut
//Optimera query / caching. (Kolla på startTime/endTime)

   
    if(props.openingHour){
        return <div>{people}</div>
    }else{

        return <div>Stängt</div>
    }
}

export default PeopleWidget;