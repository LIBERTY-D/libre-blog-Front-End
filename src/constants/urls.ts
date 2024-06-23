const baseUrl =  "http://localhost:5555/"
export const URLS={
    getPosts:baseUrl+"post",
    createPost:baseUrl+"post/create",
    updatePost:baseUrl+"post/update",
    deletePost:baseUrl+"post/delete",
    likePost:baseUrl+"post/like",
    dislikePost:baseUrl+"post/unlike",
    hideUnhidePost:baseUrl+"post/hide",
    uploadImage:baseUrl+"post/upload?id=",
    getPostFilter:baseUrl+"post/filter",
    getUserFilter:baseUrl+"user/filter",
    createUserAccount:baseUrl+"user/create",
    createComment:baseUrl+"comment/create",
    loginUser:baseUrl+"auth/login"    

    
    

}

export const BASE64_IMG = "data:image/png;base64,"