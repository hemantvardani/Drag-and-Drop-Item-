import Card from "@mui/material/Card";
import { BASE_COLOR } from "../misc/colors";
import { listItems } from "../misc/listItems";

export function ItemsList() {
  return (
    <>
      <div style={{ background: BASE_COLOR }}>
        <div>
          <b>Project Folder 1</b>
        </div>

        {listItems.map((item) => {
          const imgLocation = item.imgLocation;

          return (
            <div style={{ padding: 10 }}>
              <Card>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={require("./../Assests/icon1.png")}
                    width={50}
                    height={50}
                  />
                  <span>{item.title}</span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}
