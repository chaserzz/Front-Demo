import React, { memo } from 'react';

import "./index.scss";
import type { IStageProps } from "./type"
export default memo(function StageContainer(props :IStageProps) {
  return (<div className="div-stageContainer">
      <h3>
        <span className="span-stageTitle">{props.title.toUpperCase()}</span>
        <span className="span-stageDesc">{props.description}</span>
      </h3>
      <div className="div-stageContent">
        {props.children}
      </div>
    </div>)
})
