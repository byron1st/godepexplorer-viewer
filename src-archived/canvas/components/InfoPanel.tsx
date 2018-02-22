import * as React from 'react'
import Resizable from 're-resizable'
import { Graph } from '../../types'
import InfoTableContainer from './InfoTableContainer'

export default class InfoPanel extends React.Component<{sideBarWidth: number, graph: Graph}> {
  state = {
    height: 300
  }

  updateHeight (event: MouseEvent, direction: string, ref: HTMLElement, delta: { width: number, height: number }) {
    this.setState({ height: this.state.height + delta.height })
  }

  render () {
    return (
      <Resizable
        // @ts-ignore
        // style에 position 어트리뷰트가 정의되어 있지 않아서 에러가 발생하지만, 
        // position을 fixed로 override 해주어야, fixed-bottom 이 동작함.
        className='fixed-bottom bg-light'
        style={{...style.ResizableComp, paddingLeft: this.props.sideBarWidth}}
        size={{ width: '100%', height: this.state.height }}
        onResizeStop={this.updateHeight.bind(this)}
        minHeight={300}
        maxHeight={800}
      >
        <InfoTableContainer data={this.props.graph.nodes} header='Nodes' key='nodes-info' />
        <InfoTableContainer data={this.props.graph.edges} header='Edges' key='edges-info' />
      </Resizable>
    )
  }
}

const style = {
  ResizableComp: {
    zIndex: 1009,
    borderStyle: 'outset none none none',
    position: 'fixed',
    overflowY: 'scroll'
  }
}