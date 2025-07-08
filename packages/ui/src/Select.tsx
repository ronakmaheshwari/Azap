"use client"
export default function Select({options,onSelect}:{options:{
        key:string | number,
        value:string
    }[],
    onSelect:(value: string | number) => void
}){
    return(
        <div>
            <select onChange={(e)=>{onSelect(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                {options.map((x)=>(
                    <option key={x.key} value={x.key}>{x.value}</option>
                ))}
            </select>
        </div>
    )
}