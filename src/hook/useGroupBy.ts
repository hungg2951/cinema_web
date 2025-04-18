import { formatDate, formatDate2, formatTime, formatTime2 } from '../ultils';
type Props = {}

const useGroupBy = () => {

   const groupByTime = (data: any, conditon: any) => {
      const groupByTimeFn = data?.reduce((acc: any, arrayItem: any) => {
         let rowName = formatTime(arrayItem[conditon]);
         if (acc[rowName] == null) { acc[rowName] = []; }
         acc[rowName].push(arrayItem);
         return acc;
      }, {});
      return groupByTimeFn;
   };
   const groupByTime2 = (data: any, conditon: any) => {
      const groupByTimeFn = data?.reduce((acc: any, arrayItem: any) => {
         let rowName = formatTime2(arrayItem[conditon]);
         if (acc[rowName] == null) { acc[rowName] = []; }
         acc[rowName].push(arrayItem);
         return acc;
      }, {});
      return groupByTimeFn;
   };

   const groupByDate = (dataDate: any) => {
      const groupByDateFn = dataDate?.reduce((acc: any, arrayItem: any) => {
         let rowName = formatDate(arrayItem["date"]);
         if (acc[rowName] == null) {
            acc[rowName] = [];
         }
         acc[rowName].push(arrayItem);
         return acc;
      }, {});
      return groupByDateFn;
   };
   const groupByDate2 = (dataDate: any) => {

      const groupByDateFn = dataDate?.reduce((acc: any, arrayItem: any) => {
         let rowName = formatDate2(arrayItem["date"]);
         if (acc[rowName] == null) {
            acc[rowName] = [];
         }
         acc[rowName].push(arrayItem);
         return acc;
      }, {});
      return groupByDateFn;
   };
   const groupByRow = (arr: any) => {
      const sortArr = arr.sort((a: any, b: any) => (Number(a.column) > Number(b.column)) ? 1 : ((Number(b.column) > Number(a.column)) ? -1 : 0));
      const sortArrByRow = sortArr.sort((a: any, b: any) => (a.row > b.row) ? 1 : (b.row > a.row) ? -1 : 0)

      const groupByRowName = sortArrByRow?.reduce((acc: any, arrayItem: any) => {
         let rowName = (arrayItem["row"]);
         if (acc[rowName] == null) { acc[rowName] = [] }
         acc[rowName].push(arrayItem);
         return acc;
      }, {})
      console.log(groupByRowName)
      return groupByRowName;
   };

   return { groupByTime, groupByDate, groupByRow, groupByDate2, groupByTime2 }
}

export default useGroupBy