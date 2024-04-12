

import { Folder } from "./Folder";
import './css.css';

export function FolderTree(props){
    const {folders, setFolders}=props;
return (<>
<div>
 <div style={{height:'25px' , fontSize:30, marginBottom:20 , fontFamily: 'Garamond, serif'}}>
          <center>
            Folder Tree
            </center>
        </div>
    <div style={{display:"flex",flexDirection:'column'}}>
        {folders.map(folder=>{
            
           return <div className="per-folder" key={folder.title} ><Folder folder={folder} /></div>

        })}
    </div>
    </div>
</>);

}