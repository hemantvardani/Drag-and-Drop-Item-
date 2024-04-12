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
    e.stopPropagation();
    // console.log("dd", folder);
    if (isCollapse) setIsCollapse(false);
  }

  function handleDrop(e, currentFolder) {
    e.preventDefault();
    e.stopPropagation();

    const item = JSON.parse(e.dataTransfer.getData("ITEM_ON_DRAG"));

    // console.log("aa", currentFolder);

    currentFolder.items.push(item);
    const dupFolderTree = { ...parent };
    dupFolderTree.items[itemIndexInParent] = currentFolder;
    setParent(dupFolderTree);

    const updatedItemList = items.filter((i) => {
      return i.title != item.title;
    });

    setItems(updatedItemList);
    // console.log("lo", JSON.parse(e.dataTransfer.getData("ITEM_ON_DRAG")));
  }

  return (
    <>
      <div
        onDragOver={(e) => {
          handleDragOver(e, folderData);
        }}
        onDrop={(e) => handleDrop(e, folderData)}
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
            {folderData.title}
          </span>
        </div>
        <div style={{ marginTop: 3, paddingLeft: 30 }}>
          {!isCollapse &&
            folderData.items.map((item, index) => {
              return (
                <div key={item.title}>
                  {item.type === "FOLDER" ? (
                    <div>
                      <Folder
                        parent={folderData}
                        setParent={setFolderData}
                        itemIndexInParent={index}
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
