import { Folder } from "./Folder";
import "./css.css";
import { useEffect, useState } from "react";
// import { Input } from "antd";
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
// const { Search } = Input;
const { Option } = AutoComplete;

// const InputGroup = Input.Group;
// const { Option } = Select;

export function FolderTree(props) {
  const { folders, setFolders, setSelectedFolder, selectedFolder } = props;
  const [options, setOptions]= useState([]);
  useEffect(() => {
    console.log("zzzzz", folders);
  }, [folders]);

  function handleSearch(folder_, searchString, optionsList){
    console.log(searchString, folder_,'eee')
    folder_.items.forEach((f)=>{
      if((f.title.toLowerCase()).search(searchString.toLowerCase()) >=0){
        optionsList.push(f);
      }
      if(f.type==='FOLDER'){
        handleSearch(f,searchString,optionsList)
      }
    })
  }
  function handleSelect(){

  }

  // const options = [
  //   { value: 'Apple' },
  //   { value: 'Banana' },
  //   { value: 'Cherry' },
  //   { value: 'Date' },
  //   { value: 'Elderberry' },
  //   { value: 'Fig' },
  //   { value: 'Grape' },
  // ];


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
      style={{ width: 300 }}
      options={options.map(option => ({
        value: option.title,
      }))}
      onSearch={(e)=>{let optionsList=[]; handleSearch(folders,e,optionsList); setOptions(optionsList); }}
      onSelect={handleSelect}
    >
      <Input.Search placeholder="Search Items" />
    </AutoComplete>
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
