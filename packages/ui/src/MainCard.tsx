export default function MainCard({title,children,className=""}:{title:string,children?:React.ReactNode,className?:string}){
    return(
        <div className="border p-6 rounded-lg shadow-sm bg-white flex flex-col gap-4 ">
            <h2 className="text-xl font-semibold border-b pb-2">{title}</h2>
            {children}
        </div>
    )
}