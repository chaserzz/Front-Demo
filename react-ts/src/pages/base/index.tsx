import React, {memo} from "react"
import { Card } from 'antd'
import type{ IBaseContent } from "./type"

export default memo(function Base(props: any) {
  const baseContent: IBaseContent = {
    "useState": "A Simple Calculate To Start",
    "useEffect": "Have The Same Purpos with Life-cycle Function",
    "useCallBack": "Return Memoized  Function to Diffrent Render",
    "useContext": "More Simple To Use Context Transform Data",
    "useReducer": "More Simple to Complete Complex Sence"
  }
  const { setShowComponent } = props;
  return (
    <div className="componentsWrapper">
      <Card style={{width: "23%",margin: "5px 0"}}
            title="useState"
            hoverable={true}
            extra={<span onClick={() => setShowComponent(true)}>Detail</span>}
      >
        A Simple Calculate Made By UseState
      </Card>
      
    </div>)
})
