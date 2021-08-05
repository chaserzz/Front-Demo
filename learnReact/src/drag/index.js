import { memo, useState } from "react"
import "./index.scss"
import { List, arrayMove } from "react-movable"
export default memo(function Drag(){
  const [items,setItems] = useState(["item1","item2","item3"])
  function handleSortChange(oldVal,newVal){
    setItems(arrayMove(items,oldVal,newVal))
  }
  return (
    <List values={items}
          onChange={handleSortChange}
          renderList={({children,props}) => <div className="dragWrapper" {...props}>{children}</div>}
          renderItem={({value,props}) => <div className="dragItem" {...props}>{value}</div>}
    />
  )
})