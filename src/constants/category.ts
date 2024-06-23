export enum CATEGORY{
    CODING="CODING",
    EDUCATION="EDUCATION",
    HACKING="HACKING",
    PROGRAMMING="PROGRAMMING",
    TRAVEL="TRAVEL",
    CYBER_SECURITY="CYBER SECURITY"

}
export function categoryColor(category:string):string{
    switch(category){
      case CATEGORY.CODING:
          return "crimson"
      case CATEGORY.EDUCATION:
          return "lightgreen"
      case CATEGORY.HACKING:
          return "red"
      case CATEGORY.PROGRAMMING:
         return  "#ddd"
      default:
          return "orange"
    }
   


}