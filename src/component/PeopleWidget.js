import React, { useEffect } from 'react';
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
    
    
   
    console.log("time rn: " + props.timeRN.toISOString());
    var endTime = props.timeRN;
    var startTime =props.timeBF;
    console.log("time before(-1.5 hours): " + props.timeBF.toISOString());

    const {data} = useQuery(PEOPLE, {
        variables: {
            "timerangestart": startTime,
            "timerangeend": endTime
            },
    });

    var people='';

    if (typeof data !== 'undefined') {
        const obj = JSON.parse(data?.device.history);
        console.log(obj);

        const lastHeard =new Date(data?.device.lastHeard);
        console.log(lastHeard);
        const dif = endTime-lastHeard;
        console.log("Dif i MS:  " + dif);

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

//Fixat - C - Convert sum to Tablelookup 
//Fixat - C - Lastheard > 2h = ej tillgänglig (Ej tillg.)
//C - Städa upp lite kod.
//C - Hur deploy? Eventuellt snacka med Abbas
//C - Tidszoner måste fixas
//Factor for scaling
//Läs mer om datan här -> Länk till Galiot.io/solutions
//CSS ska se exakt likadan ut
//Optimera query / caching. (Kolla på startTime/endTime)

//abbas@predli.com

    console.log("Data:");
    console.log(data);
   
    if(props.openingHour){
        return <h6>{people}</h6>
    }else{

        return <h6>Stängt</h6>
    }
}

export default PeopleWidget;