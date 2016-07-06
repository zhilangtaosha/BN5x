import React, { Component, PropTypes} from 'react';
import ReactDOM from "react-dom"
import { filesActions } from 'core/files';
import { connect } from 'react-redux';
import {Tabs,Tab,  Col, Button, ButtonGroup, DropdownButton, MenuItem, Panel, Glyphicon} from "react-bootstrap"


class Files extends React.Component {
  componentWillMount(){
    const {getFiles} = this.props
    getFiles()
  }
  render(){
    const {files} = this.props
    const l_files = files.idList.map(function(i, index){
      return <MenuItem key={index} eventKey={index} href={"#/files/"+i+"/"}>{i}</MenuItem>
    })

    /* maybe later
    const tabs = (
      files.tabList.map(function(file){
        return <div href={"#/files/"+file+'/'}> {file} </div>
      })
    )
    */

    return (
      <div>
        <Col>
          {/* tabs */}
        </Col>
        {this.props.children}
      </div>
    )
  }

}


export default connect(state => ({
  auth: state.auth,
  files: state.files
}), Object.assign({}, filesActions ))(Files);
