import { Folder } from "./Folder";
import "./css.css";
import { useEffect } from "react";

export function FolderTree(props) {
  const { folders, setFolders } = props;

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
              <div className="per-folder" key={folder.title}>
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
