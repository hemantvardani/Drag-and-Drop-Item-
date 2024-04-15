import { Folder } from "./Folder";
import "./css.css";
import { useEffect } from "react";

export function FolderTree(props) {
  const { folders, setFolders, setSelectedFolder , selectedFolder} = props;

  useEffect(() => {
    // console.log("zzzzz", folders);
  }, [folders]);

  return (
    <>
      <div>
        <div
          style={{
            height: "25px",
            fontSize: 30,
            marginBottom: 20,
            fontFamily: "Garamond, serif",
          }}
        >
          <center>Folder Tree</center>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {folders.items.map((folder, index) => {
            return (
              <div style={{
                background : selectedFolder===folder.title? '#ffffff':'#fafafa',
                borderRadius: '15px',
                marginBottom: '15px',
                padding: '10px',
            } } key={folder.title}
            onClick={()=>(setSelectedFolder(folder.title))}>
                <Folder
                  parent={folders}
                  setParent={setFolders}
                  itemIndexInParent={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
