import Card from "@mui/material/Card";
import { BASE_COLOR } from "../misc/colors";

export function ItemsList(props) {
  const { folders, selectedFolder } = props;

  const dragImage = new Image();
  dragImage.src = require("../Assests/icons8-file-94.png");

  function handleDragStart(e, item) {
    e.dataTransfer.setData("ITEM_ON_DRAG", JSON.stringify(item));
    e.dataTransfer.setData(
      "ITEM_ON_DRAG_MAIN_FOLDER",
      JSON.stringify(selectedFolder)
    );
    e.dataTransfer.setDragImage(dragImage, 10, 10);
    // console.log(JSON.parse(e.dataTransfer.getData("ITEM_ON_DRAG")));
    // console.log(e);
  }

  function showFolderCorrespondingItems(folder_) {
    // console.log(folder_,"TT");
    let list = [];
    folder_.items.forEach((element) => {
      if (element.type === "FOLDER") {
        list = [...list, ...showFolderCorrespondingItems(element)];
      } else {
        list.push(element);
      }
    });
    return list;
  }

  const selectedFolderDetails = folders.items.find((f) => {
    // console.log(selectedFolder,"ccc")
    return f.title === selectedFolder;
  });
  const items_ = showFolderCorrespondingItems(selectedFolderDetails);

  return (
    <>
      <div style={{ background: BASE_COLOR }}>
        <div
          style={{
            height: "25px",
            fontWeight: "bolder",
            fontSize: 30,
            marginBottom: 10,
            fontFamily: "Garamond, serif",
          }}
        >
          <center>{selectedFolder}</center>
        </div>

        {items_.map((item) => {
          return (
            <div style={{ padding: 10, marginBottom: -10 }} key={item.title}>
              <Card>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: 10,
                  }}
                  draggable={true}
                  onDragStart={(e) => {
                    handleDragStart(e, item);
                  }}
                >
                  <img
                    src={require("./../Assests/icon1.png")}
                    width={50}
                    height={50}
                  />
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 13 }}>
                    <i>{item.title}</i>
                  </span>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 13 }}>
                    <i>updated {item.lastUpdated}d ago</i>
                  </span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}
