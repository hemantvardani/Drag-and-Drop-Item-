import { Folder } from "./Folder";
import "./css.css";
import { useEffect } from "react";
// import { Input } from "antd";
// import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
// const { Search } = Input;

// const InputGroup = Input.Group;
// const { Option } = Select;

export function FolderTree(props) {
  const { folders, setFolders, setSelectedFolder, selectedFolder } = props;

  useEffect(() => {
    console.log("zzzzz", folders);
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

        <div
          style={{
            height: "25px",
            fontSize: 30,
            marginBottom: 20,
            fontFamily: "Garamond, serif",
          }}
        >
          {/* <Search
            placeholder="Search Items"
            onSearch={(value) => console.log(value)}
            style={{ width: 200 }}
          >
            < Option value="Option2-1">Option2-1</Option>

            </Search> */}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {folders.items.map((folder) => {
            return (
              <div
                style={{
                  background:
                    selectedFolder === folder.title ? "#ffffff" : "#fafafa",
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
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
