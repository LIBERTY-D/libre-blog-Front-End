import { CATEGORY, categoryColor } from "../../constants/category"
import { category } from "../../types/category.module.type"
import "./category.css"


function img(image:string){
  return `/assets/category/${image}.jpg`
}
function categoryImage(category:string):string{
   switch(category){
        case CATEGORY.CODING:
            return img("coding")
        case CATEGORY.EDUCATION:
            return img("education")
        case CATEGORY.HACKING:
            return img("hacking")
        case CATEGORY.PROGRAMMING:
           return  img("programming")
        case CATEGORY.CYBER_SECURITY:
           return img("cyber security")
        case CATEGORY.TRAVEL:
          return img("travel")
        default:
            return ""
      }
     

}
export default function Category({cat,isRightbar}:category) {
  if(isRightbar){
    return (
      <div className="cat" style={{background:categoryColor(cat)}}>
           <div className="cat-img-container">
                <img src={categoryImage(cat)} alt="" className="cat-img" />
                 <p> {cat}</p>
           </div>
      </div>
    )
  }
  return (
    <div className="cat" style={{background:categoryColor(cat)}}>{cat}</div>
  )
}
