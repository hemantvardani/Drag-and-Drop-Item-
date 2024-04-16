import { useEffect, useState } from "react";
import { FaAnglesRight, FaAnglesDown } from "react-icons/fa6";
// import { listContext } from "../../App";

export function Folder({ folders , setFolders , currentFolder_ }) {
  const [currentFolder,setCurrentFolder] = useState(currentFolder_)
  const [isCollapse, setIsCollapse] = useState(true);
  // const [folderData, setFolderData] = useState(parent.items[itemIndexInParent]);

  // const { items, setItems } = useContext(listContext);

  // useEffect(() => {
  //   const dup = { ...parent };
  //   dup.items[itemIndexInParent] = folderData;
  //   setParent(dup);
  // }, [folderData]);

  useEffect(()=>{
    console.log(currentFolder_,"ppp")
    setCurrentFolder(currentFolder_)
  },[currentFolder_] )

  function handleDragOver(e, folder) {
    e.preventDefault();
    e.stopPropagation();
    // console.log("dd", folder);
    if (isCollapse) setIsCollapse(false);
  }

  function findAndDelete(folder,id){
    const items=[]
    folder.items.forEach(element => {

      if(element.type==='FOLDER')
      {
         items.push( findAndDelete(element,id))
      }
      else{
        if(element.id!==id){
          items.push(element)
        }
      }
    });


    folder.items=items;
    return folder;
  }

  function findAndAdd(folder,id,item)
  {
    
    if(folder.id===id){
      folder.items.push(item);
      return folder;
    }

    const items=[];
    folder.items.forEach((element)=>{
      if(element.type === 'FOLDER'){
         items.push(findAndAdd(element,id,item))
      }
      else{
        items.push(element)
      }
    })
    folder.items=items;
    return folder;
  }

  function checkDupItem(itemFolder,item)
  {
    console.log(itemFolder,"ll")
    for(let f of itemFolder.items){
      if(f.type==='ITEM'){ 
        console.log(f,  item)
        if(f.id===item.id)return true;
      }
    }
    return false; 
  }

  function handleDrop(e, currentFolder) {
    e.preventDefault();
    e.stopPropagation();

    
    const item = JSON.parse(e.dataTransfer.getData("ITEM_ON_DRAG"));
    const itemMainFolder = JSON.parse(e.dataTransfer.getData("ITEM_ON_DRAG_MAIN_FOLDER"));

    // console.log(folders,'uuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
    // console.log('gggsggggggggg')
    //check if this folder already has this item
    // const itemMainFolderDetail= folders.items.find(f=>{return itemMainFolder===f.title});

    
    if(checkDupItem(currentFolder,item))
    { console.log("Item already in same folder.")
      window.alert('Item already in same folder.')
      return ;
    }

    // console.log("aa", currentFolder);

    let dupFolder={...folders}
    dupFolder= findAndDelete(dupFolder,item.id)
    dupFolder= findAndAdd(dupFolder,currentFolder.id,item)
    setFolders(dupFolder);


    
    //add item to new folder.





    // currentFolder.items.push(item);
    // const dupFolderTree = { ...parent };
    // dupFolderTree.items[itemIndexInParent] = currentFolder;
    // setParent(dupFolderTree);
    // setFolders(folde rs)
 
    // delete from old folder.


    // const originalFolderTrace= folder_.items.find((f)=>{f.title===itemOriginalFolder.title})
    // findAndDelete(originalFolderTrace,item);


    // console.log("lo", JSON.parse(e.dataTransfer.getData("ITEM_ON_DRAG")));
  }

  return (
    <>
      <div
        onDragOver={(e) => {
          handleDragOver(e, currentFolder);
        }}
        onDrop={(e) => handleDrop(e, currentFolder)}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          onClick={() => setIsCollapse(!isCollapse)}
        >
          <span style={{ marginRight: 2 }}>
            {isCollapse ? (
              <FaAnglesRight size={13} />
            ) : (
              <FaAnglesDown size={13} />
            )}
          </span>

          <img
            src={
              isCollapse
                ? require("./../Assests/closeFolder.png")
                : require("./../Assests/openFolder.png")
            }
            width={15}
            height={15}
          />

          <span style={{ fontFamily: "Georgia, serif", fontSize: 15 }}>
            {`${currentFolder.title} (${currentFolder.items.length})`}
          </span>
        </div>
        <div style={{ marginTop: 3, paddingLeft: 30 }}>
          {!isCollapse &&
            currentFolder.items.map((item) => {
              return (
                <div key={item.title}>
                  {item.type === "FOLDER" ? (
                    <div>
                      <Folder
                        currentFolder_={item}
                        folders={folders}
                        setFolders={setFolders}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: 3,
                        fontFamily: "Georgia, serif",
                        fontSize: 15,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: 2 }}>
                        <img
                          src={require("./../Assests/fileIcon.png")}
                          width={17}
                          height={17}
                        />
                      </span>

                      <span>{item.title}</span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
