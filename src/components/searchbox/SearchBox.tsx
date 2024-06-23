import { Search } from "@mui/icons-material"
import "./search.css"


type SeachEventType={
  searchHandler:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}
export default function SearchBox({searchHandler}:SeachEventType) {
  return (
    <div className="search-box-container">
      
        <input type="text" placeholder="search post by title" className="search-box-input" onChange={searchHandler} />
        <Search className="search"/>
    </div>
  )
}
