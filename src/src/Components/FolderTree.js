

import { Folder } from "./Folder";
export function FolderTree(props){
    const {folders, setFolders}=props;
return (<>
    <div style={{display:"flex",flexDirection:'column'}}>
        {folders.map(folder=>{
            
           return <Folder folder={folder} />

        })}
    </div>
</>);

}