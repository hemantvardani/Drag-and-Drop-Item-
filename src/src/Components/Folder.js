import { useState } from "react";
import { FaAnglesRight, FaAnglesDown } from "react-icons/fa6";



export function Folder({folder}){
    const [isCollapse, setIsCollapse]=useState(true);
    return (
        <>
        <div>
            <div style={{display:'flex', alignItems:'center', gap:'5px'}} onClick={()=>setIsCollapse(!isCollapse)}>
            {isCollapse?<FaAnglesRight />:< FaAnglesDown />}
            <span>{folder.title}</span>
            </div>
            {
                !isCollapse && 
                folder.items.map((item)=>{
                    return (<>
                    <div style={{paddingLeft:30}}>
                        {item}
                    </div>
                        </>);
                })
            }
        </div>
        </>
    )
    ;
}