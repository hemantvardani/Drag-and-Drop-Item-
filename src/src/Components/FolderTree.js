

export function FolderTree(props){
    const {folders, setFolders}=props;
return (<>
    <div style={{display:"flex",flexDirection:'column'}}>
        {folders.map(folder=>{
            
            // <Folder folder={folder} />

        })}
    </div>
</>);

}