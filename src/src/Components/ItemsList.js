import Card from "@mui/material/Card";
import { BASE_COLOR } from "../misc/colors";
import { listItems  as list} from "../misc/listItems";
import { useState } from "react";

export function ItemsList(props) {

    const {items, setItems }=props;

  return (
    <>
      <div style={{ background: BASE_COLOR }}>
        <div>
          <b>Project Folder 1</b>
        </div>

        {items.map((item) => {
          return (
            <div style={{ padding: 10 }}>
              <Card>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight:10
                  }}
                >
                  <img
                    src={require("./../Assests/icon1.png")}
                    width={50}
                    height={50}
                  />
                  <span>{item.title}</span>
                  <span>updated {item.lastUpdated}d ago</span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}
