export const listFolder =
{
  type:'FOLDER',
  title:"GLOBAL FOLDER",
  items: [
    {
      type:'FOLDER',
      title: "Project 1",
      items: [
        {
          type:'FOLDER',
          title:'A',
          items:[
            {
              type:'ITEM',
              title: "List Item a",
              lastUpdated: "1",
            },
            {
              type:'ITEM',
              title: "List Item b",
              lastUpdated: "1",
            }
  
          ]
        },
        {
          type:'ITEM',
          title: "List Item 1",
          lastUpdated: "1",
        },
  
        {
          type:'ITEM',
          title: "List Item 2",
          lastUpdated: "3",
        },
      ],
    },
    { type:'FOLDER',
      title: "Project 2",
      items: [
        {
          type:'ITEM',
          title: "List Item 3",
          lastUpdated: "7",
        },
        {
          type:'ITEM',
          title: "List Item 4",
          lastUpdated: "7",
        },
      ],
    },
  ]
}

