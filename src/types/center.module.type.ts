import { GetPost } from './home.module.type';
export interface GetPostProp{
    posts:GetPost[],
    setPosts:React.Dispatch<React.SetStateAction<GetPost[]>>
}