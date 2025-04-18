import { formatDistance, parseISO } from "date-fns";
import { isPast } from "date-fns/esm";
import moment from "moment";
import { lazy } from "react";

export const formatCurrency = (money?: number) => {
  let newMoney;
  if (!money || money < 0) {
    newMoney = 0;
  } else {
    newMoney = money;
  }
  return newMoney?.toLocaleString("it-IT") + " đ";
};

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString || "");
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
export const formatDateNew = (dateString: Date) => {
  const date = new Date(dateString || "");
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
export const formatDateString = (dateString: Date) => {
  const date = new Date(dateString || "");
  return `${date.getDate()} Tháng ${date.getMonth() + 1
    }, ${date.getFullYear()}`;
};

export const convertDate = (date: any) => {
  const dateConvert = new Date(date);
  return dateConvert.getTime();
};
export const convertDateToNumber = (date: any) => {
  return convertDate(formatDateNew(date));
};
export const formatTime = (dateString: Date) => {
  const date = moment(new Date(dateString || "")).format("HH:mm");
  return date;
};

export const discountPercent = (money?: any, discount?: any) => {
  let moneyPrice = (money * discount) / 100;
  return moneyPrice;
};

export const convertMovieTime = (seconds: any) => {
  var h,
    m,
    s,
    result = "";
  // HOURs
  h = Math.floor(seconds / 3600);
  seconds -= h * 3600;
  if (h) {
    result = h < 10 ? "0" + h + ":" : h + ":";
  }
  // MINUTEs
  m = Math.floor(seconds / 60);
  seconds -= m * 60;
  result += m < 10 ? "0" + m + ":" : m + ":";
  // SECONDs
  s = seconds % 60;
  result += s < 10 ? "0" + s : s;
  return result;
};

export const formatTime2 = (dateString: any) => {
  const date = moment(new Date(dateString || "")).format("HH:mm");
  return date;
};

export const formatDate2 = (dateString: any ) => {
  let a = new Date(dateString);
  let data = moment(a).format("DD/MM/YYYY");
  return data;
};




//Select Table
export type ConditionType = "releaseDate" | "timeEnd";

export type CompareType = {
  inputData: string | object[],
}

export const compareDate = (inputData: CompareType, condition?: ConditionType) => {
  if (typeof inputData == "string") {
    let newDate = new Date(inputData);
    let a = moment(newDate, "YYYYMMDD").fromNow();
    if (a == "a month ago") {
      a = "1 month ago";
    }
    return a;
  } else if (typeof inputData == "object") {
    if (condition == "releaseDate") {
      let before = ["month", "year"];
      let cloneDate = JSON.parse(JSON.stringify(inputData));
      let data: any[] = [];
      for (let item of cloneDate) {
        for (let hash of before) {
          let newDate = new Date(item[condition]);
          let a = moment(newDate, "YYYYMMDD").fromNow();
          if (a.includes(hash)) {
            data.push(item);
          }
        }
      }
      return data;
    } else if (condition == "timeEnd") {
      let cloneDate = JSON.parse(JSON.stringify(inputData));
      let data: any[] = [];
      for (let item of cloneDate) {
        let pastOrFeature = isPast(parseISO(item[condition]));
        if (pastOrFeature == true) {
          data.push(item)
        }
      }
      return data;
    } else { return [] }
  } else {
    return [];
  }
};

export const compareBtwDate = (start?: any, end?: any, condition?: any) => {
  let distanceV = formatDistance(parseISO(start), parseISO(end));
  return distanceV;
};


export const upperOrLowerText = (val: string, condition: "upper" | "low") => {
  if (condition == "upper") {
    let data = val.toString().trim().toUpperCase();
    return data;
  } else {
    let data = val.toString().trim().toLowerCase();
    return data;
  }
};


export const percentage = (data: number, ...arg: any) => {
  const res: any[] = []
  for (const iterator of arg) {
    const a = Math.round((iterator / data) * 100);

    res.push(a)
  }
  return res
}



export const truncateString = (str:string, num:number) =>{
  if(str?.length > num){
      return str.slice(0,num) + '...';
  }else{
      return str;
  }
}

export const formatRunTimeToDate = (num: any) => {
  let hours = Math.floor(num / 60);  
  let minutes:any = num % 60;
  if (minutes + ''.length < 2) {
    minutes = '0' + minutes; 
  }
  return hours + "h" + minutes+"m";
  
}
