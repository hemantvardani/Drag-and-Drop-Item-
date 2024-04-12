import "./App.css";
import Grid from "@mui/material/Grid";
import { FolderTree } from "./src/Components/FolderTree";
import { ItemsList } from "./src/Components/ItemsList";
import { Header } from "./src/Layouts/Header";
import { BASE_COLOR } from "./src/misc/colors";
import { listItems } from "./src/misc/listItems";
import { listFolder } from "./src/misc/listFolder";
import { createContext, useState } from "react";

export const listContext = createContext();

function App() {
  const [items, setItems] = useState([...listItems]);
  const [folders, setFolders] = useState([...listFolder]);

  return (
    <>
      <div style={{ background: BASE_COLOR }}>
        <Header />
        <listContext.Provider value={{ items ,setItems , folders,setFolders }}>
          <Grid container spacing={3} width={"100%"}>
            <Grid item={true} width={"40%"}>
              <FolderTree folders={folders} setFolders={setFolders} />
            </Grid>
            <Grid item={true} width={"60%"}>
              <ItemsList items={items} setItems={setItems} />
            </Grid>
          </Grid>
        </listContext.Provider>
      </div>
    </>
  );
}

export default App;
