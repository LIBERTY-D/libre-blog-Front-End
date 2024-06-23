
export interface GetPost{

    _id:string,
    postImg:string;
    createdAt:string;
    postDesc:string;
    postTitle:string;
    postLikes?: string[]|null;
    userId:  string;
    category:[],
    hide:boolean
   

  
}

