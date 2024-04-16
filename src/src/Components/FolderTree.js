import { Folder } from "./Folder";
import { useEffect, useState } from "react";
import { Input, AutoComplete } from "antd";
import { WHITE_COLOR, UNSELECTED_COLOR } from "../misc/colors";

export function FolderTree(props) {
  const { folders, setFolders, setSelectedFolder, selectedFolder } = props;
  const [options, setOptions] = useState([]);
  const [searchBoxSelection, setSearchBoxSelection] = useState(null);

  // useEffect(() => {
  //   console.log("zzzzz", folders);
  // }, [folders]);

  function handleSearch(folder_, searchString, optionsList) {
    // console.log(searchString, folder_,'eee')
    folder_.items.forEach((f) => {
      if (f.title.toLowerCase().search(searchString.toLowerCase()) >= 0) {
        optionsList.push(f);
      }
      if (f.type === "FOLDER") {
        handleSearch(f, searchString, optionsList);
      }
    });
  }

  function handleSelect(selectedOption) {
    // console.log(selectedOption, "uuuu");
    const id = selectedOption.id;

    setSearchBoxSelection(id);

    setTimeout(() => {
      setSearchBoxSelection(null);
    }, 3000);
  }

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

        <div
          style={{
            height: "25px",
            fontSize: 30,
            marginBottom: 40,
            fontFamily: "Garamond, serif",
          }}
        >
          <AutoComplete
            style={{ width: 260 }}
            options={options.map((option) => ({
              value: option.title,
              id: option.id,
            }))}
            onSearch={(e) => {
              let optionsList = [];
              handleSearch(folders, e, optionsList);
              setOptions(optionsList);
            }}
            onSelect={(e, id) => handleSelect(id)}
          >
            <Input.Search placeholder="Search Items / Folders..." />
          </AutoComplete>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {folders.items.map((folder) => {
            return (
              <div
                style={{
                  background:
                    selectedFolder === folder.title ? WHITE_COLOR : UNSELECTED_COLOR,
                  borderRadius: "15px",
                  marginBottom: "15px",
                  padding: "10px",
                }}
                key={folder.title}
                onClick={() => setSelectedFolder(folder.title)}
              >
                <Folder
                  currentFolder_={folder}
                  folders={folders}
                  setFolders={setFolders}
                  searchBoxSelection={searchBoxSelection}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
