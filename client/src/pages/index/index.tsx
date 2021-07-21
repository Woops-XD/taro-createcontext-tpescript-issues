import React, { Component, CSSProperties } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import VirtualList from '@tarojs/components/virtual-list'
interface Props {

}

interface State {

  loading: boolean;
  data: string[]

}

interface memoProps {
  id: string,
  index: number,
  style: CSSProperties,
  data: any,
}

const Row = React.memo<memoProps>(({ id, index, style, data }) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      Row {index} : {data[index]}
    </View>
  );
})

function buildData(offset = 0) {
  return Array(100).fill(0).map((_, i) => i + offset);
}

export default class Index extends Component<Props, State> {


  constructor(props: Props, context: object) {
    super(props, context);
    this.state = {
      
      loading: false,
      data: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7', '8', '9', '10'
      ],

    };

  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { data } = this.state
    const dataLen = data.length
    const itemSize = 100
    return (
      <VirtualList
      height={500} /* 列表的高度 */
      width="100%" /* 列表的宽度 */
      itemData={data} /* 渲染列表的数据 */
      itemCount={data.length} /*  渲染列表的长度 */
      overscanCount={15}
      itemSize={100} /* 列表单项的高度  */
      onScroll={({ scrollDirection, scrollOffset}) => {
        console.log('sssssss');
      

        if (
          // 避免重复加载数据
          !this.state.loading &&
          // 只有往前滚动我们才触发
          scrollDirection === 'forward' &&
          // 5 = (列表高度 / 单项列表高度)
          // 100 = 滚动提前加载量，可根据样式情况调整
          scrollOffset > ((dataLen - 5) * itemSize + 100)
        ) {
          
        }
      }}
    >
      {Row}
    </VirtualList>
    )
  }
}
