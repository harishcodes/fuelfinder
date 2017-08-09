import React from 'react'
import styles from '../styles/style.css'
import {ListGroupItem,Glyphicon} from 'react-bootstrap'


export default class ListComponent extends React.Component{
    constructor(){
        super()
        this.state={}
    }
    
    
    render(){
        var listGroupItemStyle = {
            backgroundColor:'#c1c1c1',
            fontWeight:'bold'
        }
        var buttonStyle={
            //backgroundColor:"red"
        }
        const{item} = this.props
        var deleteItem= this.props.deleteItem
        console.log("eu",this.props.item)
        
        return (
            <ListGroupItem style={listGroupItemStyle}>
                {item} 
                <span>   </span>
                <span onClick={() => deleteItem(item)} style={buttonStyle}> <Glyphicon glyph="trash"/></span>
            </ListGroupItem>
            )
        
    }
}
