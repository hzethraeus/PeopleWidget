import React, { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import styles from './PeopleCount.module.css';
import PeopleWidget from './PeopleWidget';
import ReactTooltip from "react-tooltip";

const PeopleCount = () =>{
    
    const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update
    const [open, setOpen] = useState(true);
    const [startTime, setStartTime] = useState(new Date());

    useEffect(() => {
      /*
      setDate(new Date());
      
      var timeBefore= new Date();
      timeBefore.setHours(timeBefore.getHours()-1);
      timeBefore.setMinutes(timeBefore.getMinutes()-2);
      setStartTime(timeBefore);
*/

      var idag = new Date();
      var time = idag.getHours(); //ska vara central european time.
      //console.log(time.valueOf());
      if(6<time.valueOf() && time.valueOf()<22){
          setOpen(true);
          setDate(new Date());
          var timeBefore= new Date();
          timeBefore.setHours(timeBefore.getHours()-1);
          timeBefore.setMinutes(timeBefore.getMinutes()-2);
          
          setStartTime(timeBefore);
          
      } else {
          setOpen(false);
      }

      const timer = setInterval(() => { // Creates an interval which will update the current data every minute
          // This will trigger a rerender every component that uses the useDate hook.
        
        var idag = new Date();
        var time = idag.getHours(); //ska vara central european time.
        
        if(6<time.valueOf() && time.valueOf()<22){
            setOpen(true);
            setDate(new Date());
            var timeBefore= new Date();
            timeBefore.setHours(timeBefore.getHours()-1);
            timeBefore.setMinutes(timeBefore.getMinutes()-2);
            
            setStartTime(timeBefore);
            
        } else {
            setOpen(false);
        }
      }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, []);
  
    return(
     
        
        <Card className={styles.entire}>
            <div className={styles.floatChild}>
                <div className={styles.mainText}>Bes??kare just nu</div>
                
                <div className={styles.subText}>
                <a href="https://www.galiot.io/solutions" target="_blank">
                  L??s om datan h??r
                  </a>
                  </div>
                
            </div>
            <div className={styles.responseText}>
            <PeopleWidget openingHour={open} timeRN={today} timeBF={startTime} />
            </div>
            <div className={styles.tooltip} data-tip data-for="peopleTip"><a>&nbsp;?&nbsp;</a></div>
        <ReactTooltip id="peopleTip" place="bottom" effect="solid">
        Bes??kare i Kallbadet (herrbastu och dambastu): <br />
        L??gt = 6 eller f??rre bes??kare <br />
        Medel = Mellan 7 och 12 bes??kare <br />
        H??gt = Fler ??n 12 bes??kare <br />
    </ReactTooltip>
        </Card>
      
    )
};

export default PeopleCount;