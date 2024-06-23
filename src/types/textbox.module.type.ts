
namespace TexbBoxTypes{
    export type Post={
        postTitle:string,
        postDesc:string,
        postImg:File|string|null|Blob|MediaSource,
        category?:(string|null)[]
    
    }
    export type InputChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;
    export type MouseEvent= React.MouseEvent<HTMLDivElement>
}