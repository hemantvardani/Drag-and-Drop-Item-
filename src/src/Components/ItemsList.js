import Card from "@mui/material/Card";
import { BASE_COLOR } from "../misc/colors";
 

export function ItemsList(props) {

    const {items, setItems }=props;
    
    function handleDragStart(e,item){
         
        e.dataTransfer.setData('ITEM_ON_DRAG',JSON.stringify(item));
        console.log(JSON.parse(e.dataTransfer.getData('ITEM_ON_DRAG')));
        console.log(e)
    }

  return (
    <>
      <div style={{ background: BASE_COLOR }}>
        <div>
          <b>Project Folder 1</b>
        </div>

        {items.map((item) => {
          return (
            <div style={{ padding: 10 }} >
              <Card>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight:10
                  }}
                  draggable={true}
                  onDragStart={(e)=>{handleDragStart(e,item)}}
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
