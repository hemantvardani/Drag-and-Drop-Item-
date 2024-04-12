import { useContext, useEffect, useState } from "react";
import { FaAnglesRight, FaAnglesDown } from "react-icons/fa6";
import { listContext } from "../../App";

export function Folder({ parent, setParent, itemIndexInParent }) {
  const [isCollapse, setIsCollapse] = useState(true);
  const [folderData, setFolderData] = useState(parent.items[itemIndexInParent]);

  const { items, setItems } = useContext(listContext);

  useEffect(() => {
    const dup = { ...parent };
    dup.items[itemIndexInParent] = folderData;
    setParent(dup);
  }, [folderData]);

  function handleDragOver(e, folder) {
    e.preventDefault();
    console.log("dd");
    if (isCollapse) setIsCollapse(false);
  }

  function handleDrop(e, currentFolder) {
    e.preventDefault();
    if (!e.dataTransfer.getData("ITEM_ON_DRAG1")) {
      console.log("tttt", e.dataTransfer.getData("ITEM_ON_DRAG1"));
      const item = JSON.parse(e.dataTransfer.getData("ITEM_ON_DRAG"));

      // console.log("aa", folders);
      console.log("aa", currentFolder);

      currentFolder.items.push(item);
      const dupFolderTree = { ...parent };
      dupFolderTree.items[itemIndexInParent] = currentFolder;
      setParent(dupFolderTree);

      const updatedItemList = items.filter((i) => {
        return i.title != item.title;
      });

      setItems(updatedItemList);
      console.log("lo", JSON.parse(e.dataTransfer.getData("ITEM_ON_DRAG")));

      console.log("zzzzz", parent);
      console.log("6", e);
      e.dataTransfer.setData("ITEM_ON_DRAG1", "heedeeee");
      console.log("ttt3t", e.dataTransfer.getData("ITEM_ON_DRAG1"));

      console.log("7", e);
    }
  }

  return (
    <>
      <div
        onDragOver={(e) => {
          handleDragOver(e, folderData);
        }}
        onDrop={(e) => handleDrop(e, folderData)}
        style={{ borderWidth: "1px", borderStyle: "solid" }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          onClick={() => setIsCollapse(!isCollapse)}
        >
          <span style={{ marginRight: 2 }}>
            {isCollapse ? <FaAnglesRight /> : <FaAnglesDown />}
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
            {folderData.title}
          </span>
        </div>
        <div style={{ marginTop: 3, paddingLeft: 30 }}>
          {!isCollapse &&
            folderData.items.map((item, index) => {
              return (
                <>
                  {item.type === "FOLDER" ? (
                    <Folder
                      parent={folderData}
                      setParent={setFolderData}
                      itemIndexInParent={index}
                    />
                  ) : (
                    <div
                      key={`${item.title}`}
                      style={{ fontFamily: "Georgia, serif", fontSize: 15 }}
                    >
                      <img
                        src={require("./../Assests/icon1.png")}
                        width={10}
                        height={10}
                      />
                      {item.title}
                    </div>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
