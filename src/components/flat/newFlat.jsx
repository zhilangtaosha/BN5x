import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 
import { hashHistory } from 'react-router'

import { flatActions } from 'core/flat';

import {Col, Glyphicon} from 'react-bootstrap'
var ReactGridLayout = require('react-grid-layout');
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import Textarea from 'react-textarea-autosize';

import {createChildNode} from 'utils/firebase'
import {getUniqueId, initLayout} from 'utils/node2'

import 'styles/flat.less'
import 'styles/react-grid-layout.css'
import 'styles/react-resizable.css'
//import 'styles/styles.css'



export class Node extends React.Component {
  constructor(props){
    super(props)
    const { nodeUpdate, nodeUpdateLayout } = this.props
    this.nodeUpdate = nodeUpdate.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.layoutChange = this.layoutChange.bind(this)
    this.nodeUpdateLayout = nodeUpdateLayout.bind(this)
  }

  updateContent(evt){
    const {_key} = this.props
    this.nodeUpdate({key: _key, content: evt.target.value})
  }

  updateFold(fold){
    const {_key} = this.props
    this.nodeUpdate({key: _key, fold: fold})
  }

  layoutChange(current, all){
    //console.log("layoutChange:", current, all)
    const {_key} = this.props
    this.nodeUpdateLayout(_key, current)
  }

  render(){
    const {isRoot, content, _key, _ref, nodeUpdate, nodeUpdateLayout} = this.props
    //console.log(isRoot, content, _key, _ref)

    let children = content[_key].children?content[_key].children.map(i=>{
      //must need a div to wrap the Node(for ReactGridLayout!!!)
      return <div  key={i}> 
               <Node 
                 className="tree-node-wrap"
                 nodeUpdate={nodeUpdate}
                 nodeUpdateLayout={nodeUpdateLayout}
                 isRoot={false} 
                 content={content} 
                 _ref={_ref}
                 _key={i}/>
             </div>
    }):null

    let nodeUrl = "/newflat/"+_key

    if (isRoot){
      return <div >

          <div className="node-btn-wrap">
          {content[_key].children?<Glyphicon className="fold" glyph={content[_key].fold?"plus":"minus"} onClick={this.updateFold.bind(this, !content[_key].fold)}/>:null}
            <div className="dot" onClick={()=>{ hashHistory.push(nodeUrl) }}></div>
            {content[_key].fold?<div className="dot-fold" ></div>:null}
          </div>
          <Textarea 
          className='tree-textarea'
          onChange={this.updateContent} 
          value={content[_key].content?content[_key].content:""}/>

          {/*<ReactGridLayout 
            className="layout" 
            layout={initLayout(content, _key)} 
            cols={48}
            rowHeight={30} 
            width={1580} >
          {children}
          </ReactGridLayout>*/}

            <ResponsiveReactGridLayout 
            //className="layout" 
            layouts={{lg:content[_key].layout?content[_key].layout:initLayout(content, _key)}}
            breakpoints={{lg: 1200,  xs: 480}}
            cols={{lg: 48, xs: 1 }}
            rowHeight={30} 
            isDraggable={true}
            isResizable={true}
            onLayoutChange={(current, all)=>{ this.layoutChange( current, all)}}
            >
            {children}
          </ResponsiveReactGridLayout>
        </div>
    }else{
      return <div className="tree-node-wrap">
          <div className="node-btn-wrap">
          {content[_key].children?<Glyphicon className="fold" glyph={content[_key].fold?"plus":"minus"} onClick={this.updateFold.bind(this, !content[_key].fold)}/>:null}
            <div className="dot" onClick={()=>{ hashHistory.push(nodeUrl) }}></div>
            {content[_key].fold?<div className="dot-fold" ></div>:null}
          </div>
          <Textarea 
          className='tree-textarea'
          onChange={this.updateContent} 
          value={content[_key].content?content[_key].content:""}/>
          {content[_key].fold?null:children}
        </div>

    }
  }
}

export class Newflat extends React.Component {
  constructor(props){
    super(props)
    const { createRoot, nodeUpdate, nodeUpdateLayout } = this.props
    this.createRoot = createRoot.bind(this)
    this.nodeUpdate = nodeUpdate.bind(this)
    this.nodeUpdateLayout = nodeUpdateLayout.bind(this)
  }
  render(){
    const {flat, params} = this.props


    return (
      <Col>
      {/*<Col md={6}>
          <b>newflat <button onClick={this.createRoot}>create root</button></b>
        </Col>*/}


        <Col md={12}>
          {flat.content?  (<Node 
             nodeUpdate={this.nodeUpdate}
             nodeUpdateLayout={this.nodeUpdateLayout}
             isRoot={true} 
             content={flat.content} 
             _ref={flat.ref}
             _key={params.id}/>):"loading"}
        </Col>
      </Col>
    )
  }
}

export default connect( state=>({flat: state.flat}), flatActions)(Newflat);
