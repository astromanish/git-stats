import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const DayStats = (props) => {

    const [events, setEvents] = useState([]);
    const [loaded,setLoad] = useState(false);
    const [Days, setDays] = useState([0,0,0,0,0,0,0])
    const [Time, setTime] = useState({
        a: [],
        b: [],
        c: [],
        d: [],
        e: [],
        f: []
    });
    const [TimebgColor,setBg] = useState();

    useEffect(() => {
        var ev = [];
        if(props.events.length > 0 ){
            props.events.forEach(res => {
                ev.push(res);
            });
        }
        setEvents(ev);
    },[props]);

    const dispEvents = (events) => {
        
        if(events.length > 0 && loaded === false){
            var daysArray = [0, 0, 0, 0, 0, 0, 0]
            var timeArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0];
            events.forEach(res => {
                var day = new Date(res.created_at);
                var hours = day.getHours();
                day = day.toUTCString();
                day = day.slice(0,3);
                timeArray[hours]++;
                switch (day) {
                    case "Mon":
                        daysArray[0]++;
                        break;
                    case "Tue" : 
                        daysArray[1]++;
                        break;
                    case "Wed":
                        daysArray[2]++;
                        break;
                    case "Thu":
                        daysArray[3]++;
                        break;
                    case "Fri":
                        daysArray[4]++;
                        break;
                    case "Sat":
                        daysArray[5]++;
                        break;
                    case "Sun":
                        daysArray[6]++;
                        break;                    
                    default:
                        break;
                }
                //setLoad(true);
            });
            var sum = daysArray[0] + daysArray[1] + daysArray[2] + daysArray[3] + daysArray[4] +daysArray[5] + daysArray[6]; 
            var i = 0;
            daysArray.forEach(data => {
                data = (data/sum) *100;
                daysArray[i] = data.toFixed(2);
                i++; 
            });
            i=0;
            var sum = 0;
            timeArray.forEach(data => {
                sum = sum + data;
            })
            timeArray.forEach(data => {
                data = (data/sum) * 100;
                timeArray[i] = data.toFixed(2);
                i++;
            });
            console.log(timeArray);
            var bgArray = ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 1, 64, 0.2)'];
            var a1 = [];
            var a2 = [];
            var a3 = [];
            var a4 = [];
            var a5 = [];
            var a6 = [];
            for (let i = 0; i < timeArray.length; i++) {
                if(i%6 === 0){
                    a1.push(timeArray[i]);
                }
                else if(i%6 === 1){
                    a2.push(timeArray[i]);
                }
                else if(i%6 === 2){
                    a3.push(timeArray[i]);
                }
                else if (i % 6 === 3) {
                    a4.push(timeArray[i]);
                }
                else if (i % 6 === 4) {
                    a5.push(timeArray[i]);
                }
                else if (i % 6 === 5) {
                    a6.push(timeArray[i]);
                }
            }
            setBg(bgArray);
            setTime({
                a: a1,
                b: a2,
                c: a3,
                d: a4,
                e: a5,
                f: a6
            });
            setDays(daysArray);
            setLoad(true);
        }
        else{
            return;
        }
    }

    return(
        <>
        {dispEvents(events)}
        <div>
            {
            loaded===true && <Bar data={{
                datasets: [{
                    label: "Contribution %",
                    data: Days,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 1, 64, 0.2)'
                    ]
                }],
                labels: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            }} options={{
                animation: {
                    duration: 3000,
                    easing: 'easeInOutQuint',
                },
                title: {
                    text: "Daywise Contribution",
                    position: 'top',
                    display: true
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks:{
                            autoSkip: true
                        },
                        gridLines:{
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: false
                    }]
                }
            }}/>
        }
        </div>
        <div>
            {
                loaded === true && <Bar data={{
                    datasets: [{
                        label: "Contribution % : ",
                        data: Time.a,
                        backgroundColor: TimebgColor,
                    },
                    {
                        label: "Contribution % : ",
                        data: Time.b,
                        backgroundColor: TimebgColor,
                    },
                        {
                            label: "Contribution % : ",
                            data: Time.c,
                            backgroundColor: TimebgColor
                        },
                        {
                            label: "Contribution % : ",
                            data: Time.d,
                            backgroundColor: TimebgColor
                        },
                        {
                            label: "Contribution % : ",
                            data: Time.e,
                            backgroundColor: TimebgColor
                        },
                        {
                            label: "Contribution % : ",
                            data: Time.f,
                            backgroundColor: TimebgColor
                        },
                ],
                labels: ["Night","Morning","Daytime","Evening"],
                }} options={{
                    animation: {
                        duration: 3000,
                        easing: 'easeInOutQuint',
                    },
                    title: {
                        display: true,
                        text: "Timewise Contribution"
                    },
                    legend: {
                        display: false,
                    },
                    scales:{
                        xAxes:[{
                            categoryPercentage: 1,
                            barPercentage: 0.9,
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes:[{
                            barPercentage: 0.9,
                            categoryPercentage:1,
                            gridLines: {
                                display: false
                            },
                            ticks:{
                                display: false
                            }
                        }]
                    }
                }}/>
            }
        </div>
        </>
    )

}

export default DayStats