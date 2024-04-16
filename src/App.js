import "./App.css";
import Grid from "@mui/material/Grid";
import { FolderTree } from "./src/Components/FolderTree";
import { ItemsList } from "./src/Components/ItemsList";
import { Header } from "./src/Layouts/Header";
import { BASE_COLOR } from "./src/misc/colors";
import { listFolder } from "./src/misc/listFolder";
import { useState } from "react";

function App() {
  const [folders, setFolders] = useState({ ...listFolder });
  const [selectedFolder, setSelectedFolder] = useState(folders.items[0].title);

  // console.log(folders,"qq")
  // useEffect(() => {
  //   console.log("yyy", folders);
  // }, [folders]);

  return (
    <>
      <div
        style={{
          background: BASE_COLOR,
          minHeight: "100vh",
          minWidth: "400px",
        }}
      >
        <Header />
        <div style={{ paddingTop: 50 }}>
          <Grid
            container
            spacing={4}
            maxWidth={"1100px"}
            justifyContent={"center"}
          >
            <Grid item={true} xs={10} md={4}>
              <div style={{ paddingLeft: 40 }}>
                <FolderTree
                  folders={folders}
                  setFolders={setFolders}
                  setSelectedFolder={setSelectedFolder}
                  selectedFolder={selectedFolder}
                />
              </div>
            </Grid>
            <Grid item={true} xs={10} md={6}>
              <ItemsList folders={folders} selectedFolder={selectedFolder} />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default App;
