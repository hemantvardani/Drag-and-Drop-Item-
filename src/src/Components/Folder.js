import { useEffect, useState } from "react";
import { FaAnglesRight, FaAnglesDown } from "react-icons/fa6";
import { HIGHLIGHT_COLOR } from "./../misc/colors";

export function Folder({
  folders,
  setFolders,
  currentFolder_,
  searchBoxSelection,
}) {
  const [currentFolder, setCurrentFolder] = useState(currentFolder_);
  const [isCollapse, setIsCollapse] = useState(true);

  function handleDragOver(e, folder) {
    e.preventDefault();
    e.stopPropagation();
    // console.log("dd", folder);
    if (isCollapse) setIsCollapse(false);
  }

  function findAndDelete(folder, id) {
    const items = [];
    folder.items.forEach((element) => {
      if (element.type === "FOLDER") {
        items.push(findAndDelete(element, id));
      } else {
        if (element.id !== id) {
          items.push(element);
        }
      }
    });

    folder.items = items;
    return folder;
  }

  function findAndAdd(folder, id, item) {
    if (folder.id === id) {
      folder.items.push(item);
      return folder;
    }

    const items = [];
    folder.items.forEach((element) => {
      if (element.type === "FOLDER") {
        items.push(findAndAdd(element, id, item));
      } else {
        items.push(element);
      }
    });
    folder.items = items;
    return folder;
  }

  function checkDupItem(itemFolder, item) {
    // console.log(itemFolder, "ll");
    for (let f of itemFolder.items) {
      if (f.type === "ITEM") {
        // console.log(f, item);
        if (f.id === item.id) return true;
      }
    }
    return false;
  }

  function handleDrop(e, currentFolder) {
    e.preventDefault();
    e.stopPropagation();

    const item = JSON.parse(e.dataTransfer.getData("ITEM_ON_DRAG"));

    if (checkDupItem(currentFolder, item)) {
      console.log("Item is already in same folder.");
      window.alert("Item is already in same folder.");
      return;
    }

    // console.log("aa", currentFolder);

    let dupFolder = { ...folders };
    dupFolder = findAndDelete(dupFolder, item.id);
    dupFolder = findAndAdd(dupFolder, currentFolder.id, item);
    setFolders(dupFolder);

  }

  useEffect(() => {
    // console.log(currentFolder_, "ppp");
    setCurrentFolder(currentFolder_);
  }, [currentFolder_]);

  useEffect(() => {
    // console.log(searchBoxSelection, "gggg");
    if (searchBoxSelection === currentFolder.id) setIsCollapse(false);
  }, [searchBoxSelection]);

  useEffect(() => {
    if (searchBoxSelection) {
      setIsCollapse(false);
    }
  }, [searchBoxSelection]);

  return (
    <>
      <div
        onDragOver={(e) => {
          handleDragOver(e, currentFolder);
        }}
        onDrop={(e) => handleDrop(e, currentFolder)}
        style={
          searchBoxSelection === currentFolder.id
            ? { background: HIGHLIGHT_COLOR }
            : {}
        }
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
                        searchBoxSelection={searchBoxSelection}
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
                        background:
                          searchBoxSelection === item.id ? HIGHLIGHT_COLOR : null,
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
