import { useContext, useEffect, useState } from "react"
import {PostPagePost} from "../../components/postpagepost/PostPagePost"
import SearchBox from "../../components/searchbox/SearchBox"
import TopBar from "../../components/topbar/TopBar"
import "./post.css"
import { userContent } from "../../context/user/AuthContext"
import axios from "axios"
import { URLS } from '../../constants/urls';
import { GetPost } from "../../types/home.module.type"
import { Link } from "react-router-dom"

export default function Post() {

  const [posts, setPosts] = useState<GetPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<GetPost[]>([]);
  const [searchedQuery, setSearchedQuery] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get<{ data: GetPost[] }>(URLS.getPosts);
        const sortedPosts = data.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
 
    setSearchedQuery(e.target.value);
  };

  useEffect(() => {

    if (searchedQuery === "") {
      setFilteredPosts(posts);
    } else {
      const searchedPost = posts.filter((post) =>
        post.postTitle.toLowerCase().startsWith(searchedQuery.toLowerCase())
      );
      setFilteredPosts(searchedPost);
    }
  }, [searchedQuery, posts]);

  return (
    <>
      <TopBar/>
    <div className="post-page">
       <div className="post-page-content">
        <Link  className="post-page-title"  to="/">
        <h1 >Libre Blog</h1></Link>
         <SearchBox searchHandler={searchHandler} />
       </div>
       {filteredPosts?.length>0 && filteredPosts?.map((post,_)=>{
        return <PostPagePost post={post} key={post._id}/>
       })}
    </div>
    </>
  )
}
