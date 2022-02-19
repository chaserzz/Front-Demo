import React, {Component} from 'react';
import { throttle, requestSetTimeOut, cancelTimer} from '../utils';
import "./style.scss"
type S = {
  scrollTop: number,
  contentHeight: number,
  showData: string[],
  positionList: any[],
  startIndex: number,
  isScroll: boolean
  [propName: string]: any
}
type P = {
  dataList: any[],
  screenHeight: number,
  itemSize?: number,
  estimatedItemSize: number // 预估的子元素的高度
  bufferSize: number //缓存个数
}

type Position = {
  height: number,
  top: number,
  bottom: number
}
class VertualList extends Component <P,S> {
    constructor(props: any){
      super(props);
      this.state = {
        scrollTop: 0, // scroll的高度
        contentHeight: 0, //整体高度
        showData: [], //渲染的列表
        positionList:[], // 每个数据的高度
        startIndex: 0, // 开始的index
        isScroll: false,
      };
      (this as any).listRef = React.createRef();
      (this as any).timerId = null;
    }
    
    componentDidMount(){
      let contentHeight = 0;
      const {estimatedItemSize,dataList, screenHeight} = this.props
      // 有传入itemSize说明是一个固定高度的虚拟滚动
      let startIndex = 0 //根据滚动的上半部分来计算获得当前的第几个
      // 获取每个元素的位置关系,并进行缓存s
      const position = dataList.map((item,index) => {
        return {
          height: estimatedItemSize,
          top: index * estimatedItemSize,
          bottom: (index + 1) * estimatedItemSize,
          id: index
        }
      });
      // 设置总高度
      contentHeight = position[position.length - 1].bottom;
      let endList = Math.ceil(screenHeight / estimatedItemSize);
      const showData = dataList.slice(startIndex,endList)
      this.setState({
        contentHeight,
        positionList: position,
        showData
      })
    }                                                                                                                                                                                                                                      

    componentDidUpdate(preProps: P, preState: S){
      if(this.state.startIndex !== preState.startIndex && this.state.isScroll === false){
        this.getAndFixPosition()
      }
    }

    debounceScrollEnd = () => {
      if(this.state.timerId){
        cancelAnimationFrame((this as any).timerId);
      }
      requestSetTimeOut(
        this.debounceScrollEndCallBack.bind(this),
        150
      )
    }

    debounceScrollEndCallBack = () => {
      (this as any).timeId = null;
      this.setState({
        isScroll: false,
      })
    }
    // 获得当前dom的缓存以及修正对应的scrollTop
    getAndFixPosition = () => {
      const listRef = (this as any).listRef;
      const {positionList,startIndex} = this.state
      const {dataList, screenHeight} = this.props
      for(let i = 0; i < listRef.current.children.length; i++){
        const node = listRef.current.children[i];
        let rect = node.getBoundingClientRect();
        const id = Number(node.dataset.id); //获得当前的id
        const height = rect.height;
        const position = positionList[id]; //获得设置的高度
        let oldHeight = position.height;
        let dValue = oldHeight - height;
        if(height !== oldHeight){
          // 当前的高度和原先的高度不一致，则更新高度
          position.bottom = position.bottom - dValue;
          position.height = height;
          for (let k = id + 1; k < positionList.length; k++) {
            positionList[k].top = positionList[k - 1].bottom;
            positionList[k].bottom = positionList[k].bottom - dValue;
          }
        }
      }
      const contentHeight = positionList[positionList.length - 1].bottom;
      const visibleContent = Number(this.getVisibelCount(positionList,startIndex,screenHeight));
      const end = startIndex + visibleContent;
      const showData = dataList.slice(startIndex,end);
      const newScrollTop = startIndex >= 1 ? positionList[startIndex - 1].bottom : 0;
      this.setState({
        positionList,
        showData,
        scrollTop : newScrollTop,
        contentHeight,
      });
    }

    getVisibelCount = (positionList: Position[],startIndex : number,screenHeight: number) => {
      let offset = 0;
      for (let index = startIndex + 1; index < positionList.length; index++) {
        if(offset + positionList[index].height >= screenHeight){
          return index
        }else{
          offset += positionList[index].height
        }
      }
    }


    // 获得当前的startIndex
    getStartIndex = (scrollTop:number = 0): number => {
      const {positionList} = this.state;
      let left = 0;
      let right = positionList.length - 1;
      let trueIndex = null;
      if(scrollTop > 40){
      }
      while(left <= right){
        const middle = Math.floor((right - left) / 2) + left;
        // 如果bottom和scroll相等，则应该获取新的数据，为start + 1;
        if(positionList[middle].bottom === scrollTop){
          return middle + 1;
        }else if(positionList[middle].bottom < scrollTop){
          left = middle + 1;
        }else{
          if(trueIndex === null || trueIndex > middle){
            trueIndex = middle
          }
          right = middle - 1
        }
      }
      return Number(trueIndex)
    }

    handleScrollOn = (e: any) => {
      // 拿到高度之后重新计算渲染的数据
      const {scrollTop,positionList} = this.state;
      const {screenHeight,dataList, bufferSize} = this.props
      const startIndex = this.getStartIndex(e.target.scrollTop);
      console.log('startIndex',startIndex);
      const visibleContent = Number(this.getVisibelCount(positionList,startIndex,screenHeight));
      const end = startIndex + visibleContent;
      const showData = dataList.slice(startIndex,end);
      const newScrollTop = startIndex >= 1 ? positionList[startIndex - 1].bottom : 0;
      this.debounceScrollEnd();
      if(scrollTop !== newScrollTop){
        this.setState({
          showData,
          scrollTop: newScrollTop,
          startIndex
        });
      }
    }

    render(){
      const {screenHeight = 400} = this.props
      const {contentHeight,scrollTop,showData,startIndex} = this.state
      // return <Table columns={this.getColumns()} dataSource={data1}/>
      return <div className="infinite-list-container" style={{height: screenHeight}} onScroll={this.handleScrollOn}> {/**虚拟列表的组件，总容器 */}
      <div className="infinite-list-phantom" style={{height: contentHeight - screenHeight}}></div>{/**虚拟列表的补充高度，用于滚动条的展示 */}
      <div className="infinite-list" ref={(this as any).listRef} style={{height: screenHeight,transform: `translateY(${scrollTop}px)`}}> {/**虚拟列表的内容 */}
      {
        showData.map((item,index) => {
          return (<span data-id={index + startIndex} style={{boxSizing: 'border-box',border: '1px solid #e3e3e3',display: 'block',width: "100%",wordWrap: "break-word"}} >
            {item}
          </span>)
        })
      }
      </div>
    </div>
  }
}

export default Problem;