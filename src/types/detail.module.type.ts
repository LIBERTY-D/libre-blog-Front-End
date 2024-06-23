namespace DetailTypes {
    export type LikeEvent={
        likeHandler: (e:React.MouseEvent<Element>)=>void,
    }
    export type CommentEvent={
        commentHandler: (e:React.MouseEvent<HTMLButtonElement>)=>void,
        commentInputRef:React.MutableRefObject<HTMLTextAreaElement>|React.MutableRefObject<null>,
    }
    export type msg = string;

}