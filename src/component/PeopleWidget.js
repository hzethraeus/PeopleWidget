import React from 'react';
import {useQuery, gql} from '@apollo/client';
import ReactTooltip from "react-tooltip";
import styles from './PeopleWidget.module.css';

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
    

    const {data} = useQuery(PEOPLE, {
        variables: {
            "timerangestart": startTime,
            "timerangeend": endTime
            },
    });

    var people='';

    if (typeof data !== 'undefined') {
        const obj = JSON.parse(data?.device.history);
      
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

   //{people}
    if(props.openingHour){
        return <div className={styles.entireResponse}>{people} 
        <div className={styles.tooltip} data-tip data-for="peopleTip"><a>?</a></div>
        <ReactTooltip id="peopleTip" place="bottom" effect="solid">
        Antalet besökare i Kallbadet (herrbastu och dambastu); <br />
        Lågt = Mindre än 6 besökare <br />
        Medel = Mellan 6 och 12 besökare <br />
        Högt = Fler än 12 besökare <br />
    </ReactTooltip>
        </div>
    }else{

        return <div>Stängt</div>
    }
}

export default PeopleWidget;