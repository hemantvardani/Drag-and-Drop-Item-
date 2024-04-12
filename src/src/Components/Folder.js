import { useContext, useState } from "react";
import { FaAnglesRight, FaAnglesDown } from "react-icons/fa6";
import { listContext } from "../../App";

export function Folder({ folder }) {
  const [isCollapse, setIsCollapse] = useState(true);

  const { items, setItems, folders, setFolders } = useContext(listContext);

  function handleDragOver(e, folder) {
    e.preventDefault();
    console.log("dd" + JSON.stringify(folders));
    if (isCollapse) setIsCollapse(false);
  }

  function handleDrop(e, currentFolder) {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("ITEM_ON_DRAG"));
    console.log("aa", folders);

    const updatedFolderTree = folders.map((f) => {
      if (f.title === currentFolder.title) {
        f.items.push(item);
      }
      return f;
    });

    console.log(updatedFolderTree);

    setFolders(updatedFolderTree);

    const updatedItemList= items.filter(i=>{
        return (i.title!=item.title)
    })

    setItems(updatedItemList)
    console.log("lo", JSON.parse(e.dataTransfer.getData("ITEM_ON_DRAG")));
  }

  return (
    <>
      <div  onDragOver={(e) => {
            handleDragOver(e, folder);
          }}
          onDrop={(e) => handleDrop(e, folder)}>
        <div
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          onClick={() => setIsCollapse(!isCollapse)}
         
        >
         <span style={{marginRight:10}}>
         {isCollapse ? <FaAnglesRight /> : <FaAnglesDown />}
          </span> 
         
          <img
                    src={ isCollapse ? require("./../Assests/closeFolder.png") :  require("./../Assests/openFolder.png") }
                    width={15}
                    height={15}
                    
                  />


          <span style={{ fontFamily: 'Georgia, serif', fontSize:20 }} >
          
            {folder.title}
            
            </span>
        </div>
        <div style={{marginTop:3}}>

        {!isCollapse &&
        
        folder.items.map((item) => {
          return (
            <>
             
              <div key={`${item.title}`} style={{  paddingLeft: 50,fontFamily: 'Georgia, serif', fontSize:15 }}>
              <img
                  src={require("./../Assests/icon1.png")}
                  width={10}
                  height={10}
                />
                {item.title}
              </div>
            </>
          );
        })

       
        }
        </div>
       
      </div>
    </>
  );
}
