import "./App.css";
import Grid from "@mui/material/Grid";
import { FolderTree } from "./src/Components/FolderTree";
import { ItemsList } from "./src/Components/ItemsList";
import { Header } from "./src/Layouts/Header";
import { BASE_COLOR } from "./src/misc/colors";
import { listItems } from "./src/misc/listItems";
import { listFolder } from "./src/misc/listFolder";
import { createContext, useEffect, useState } from "react";

export const listContext = createContext();

function App() {
  const [items, setItems] = useState([...listItems]);
  const [folders, setFolders] = useState({ ...listFolder });
  console.log(folders,"qq")
  const [selectedFolder, setSelectedFolder]= useState(folders.items[0].title);
 
  useEffect(()=>{ console.log(selectedFolder,"qAAq")},[selectedFolder])

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
        <listContext.Provider value={{ items, setItems, folders, setFolders }}>
          <div style={{ paddingTop: 50 }}>
            <Grid
              container
              spacing={4}
              maxWidth={"1100px"}
              justifyContent={"center"}
            >
              <Grid item={true} xs={10} md={4}>
                <div style={{ paddingLeft: 40 }}>
                  <FolderTree folders={folders} setFolders={setFolders} setSelectedFolder={setSelectedFolder} selectedFolder={selectedFolder} />
                </div>
              </Grid>
              <Grid item={true} xs={10} md={6}>
                <ItemsList  folders={folders} selectedFolder={selectedFolder} />
              </Grid>
            </Grid>
          </div>
        </listContext.Provider>
      </div>
    </>
  );
}

export default App;
