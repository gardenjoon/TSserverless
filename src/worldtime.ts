import { Handler, Context } from "aws-lambda";

const worldtime: Handler = async (event: any, context: Context) => {
  let now = new Date();
  let year =now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let day = now.getDay();
  let days:any= {0 : '일', 1 : '월', 2 : '화', 3 : '수', 4 : '목', 5 : '금', 6 : '토'}
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  
  interface strings {
    [key:string] : number;
  }
  const Countrysdata:strings = {
    "KOREA": 9,
    "CHINA": 10,
    "USA": -5,
    "USA_CST": -6,
    "USA_PST": -8
  }
  const country = event.queryStringParameters.country as string
  let countryTZ:number = Countrysdata[country]
  let hours = now.getHours() + countryTZ

  if(hours >= 24){
    hours -= 24
    date += 1
    if(day < 6) {
      day += 1
    } else {
      day += -6
    }
  } else if (hours < 0){
    hours+=24
    date -= 1
    if(day >= 1){
      day -=1
    } else {
      day =+ 6
    }
  };
  let time = {
    "country":event.queryStringParameters.country,
    "year":year,
    "month":month,
    "date":date,
    "days":days[day],
    "hours":hours,
    "minutes":minutes,
    "seconds":seconds,
    "OtherCountrys":"KOREA, CHINA, USA, USA_CST, USA_PST"
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(time)
  };
  return response
};

export { worldtime };