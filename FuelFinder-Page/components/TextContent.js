import React from 'react'
import styles from '../styles/style.css'
import ListItemComponent from './ListComponent.js'
import ReactDOM from 'react-dom'
import {FormGroup,InputGroup,FormControl,Button,Collapse,Well,Col,Row,Popover,ListGroup,Glyphicon,HelpBlock,ButtonToolbar,DropdownButton,MenuItem,Addon} from 'react-bootstrap'


export default class TextContent extends React.Component{
    constructor(){
        super()
        this.state={itemUrlArray:[],itemAppArray:[],validState:null,hrefValue:"",downloadValue:"",showDownload:false,showGenerate:true,inputType:"url"}
    }
    
    ComponentDidMount(){
        this.state.itemUrlArray=[]
        this.state.itemAppArray=[]
        this.state.validState=null
        this.state.hrefValue=""
        this.state.downloadValue=""
        this.state.showDownload=false
        this.state.showGenerate=true
        this.state.inputType="url"
    }
    
    handleSelChange= (e) => {    
        if (e.target.value == "URL"){
            this.setState({inputType:"url"})    
        } else {
            this.setState({inputType:"text"})    
        }
        ReactDOM.findDOMNode(this.refs.urlString).value = ""
        this.setState({validState:null})
        
    }
    
    
    AddItem(e){
        e.preventDefault()
        console.log(e.target.tagName)
        console.log("name",ReactDOM.findDOMNode(this.refs.urlAddutton).name)
        var selType = ReactDOM.findDOMNode(this.refs.selType).value
        if (selType == "URL"){
            if (this.state.validState == "success"){
                this.state.itemUrlArray.push(ReactDOM.findDOMNode(this.refs.urlString).value)
                this.setState({itemUrlArray:this.state.itemUrlArray})    
            }            
        } else {
            if (this.state.validState == "success"){
                this.state.itemAppArray.push(ReactDOM.findDOMNode(this.refs.urlString).value)
                this.setState({itemAppArray:this.state.itemAppArray})    
            }
        }

        ReactDOM.findDOMNode(this.refs.urlString).value = ""
        this.setState({validState:null})
        
        console.log("arr", this.state.itemUrlArray)
    }
    
    deleteAllItem(){
        this.setState({itemUrlArray:[]})
        this.setState({itemAppArray:[]})
    }
    
    deleteItem(item){
        //e.preventDefault()
        var array=this.state.itemUrlArray
        var arrayApp=this.state.itemAppArray
        var index = array.indexOf(item)
        if (index == -1){
            index = arrayApp.indexOf(item)
            arrayApp.splice(index,1)
        } else {
            array.splice(index,1)
        }
        
        this.setState({itemUrlArray:array})
        this.setState({itemAppArray:arrayApp})
    }
    
        
    handleChange(e) {
        console.log(e.target.value)
        var textValue = e.target.value
        var selType = ReactDOM.findDOMNode(this.refs.selType).value
        if (selType=="URL"){
            var correct = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(textValue)
            if(correct){
                this.setState({validState:'success'})
            }else {
                this.setState({validState:'error'})
            }            
        } 
        else {
            console.log("here",textValue)
             if((textValue.charAt(0) != "\\" || textValue.charAt(1) != "\\") || (textValue.charAt(0) != "/" || textValue.charAt(1) != "/"))
                {
                   if(!textValue.charAt(0).match(/^[a-zA-Z]/))  
                   {
                        this.setState({validState:'error'})
                   } else {
                       this.setState({validState:'success'})
                   }
                   if(!textValue.charAt(1).match(/^[:]/) || !textValue.charAt(2).match(/^[\/\\]/))
                   {
                       this.setState({validState:'error'})
                   } else {
                       this.setState({validState:'success'})
                   }
                }
        }            
  }
    
    
    download(name, type) {
      //var a = document.getElementById("a")
      var itemArrUrlElem = ""
      var itemArrAppElem = ""
      var urlText =""
      var appText =""
      for (var i=0; i < this.state.itemUrlArray.length; i ++){
          itemArrUrlElem = itemArrUrlElem + " " + "\"" + this.state.itemUrlArray[i] +"\""
      }
        
      for (var i=0; i < this.state.itemAppArray.length; i ++){
          itemArrAppElem = itemArrAppElem + " " + "\"" + this.state.itemAppArray[i] +"\""
      }        

      if (itemArrUrlElem !== ""){
          urlText = "start chrome.exe " + itemArrUrlElem
      }
      if (itemArrAppElem !== ""){
        appText = "start " + "\""+"\""+ " " + itemArrAppElem 
      }
      
      var text = "@echo off " + "\r\n" + urlText + "\r\n" + appText
      console.log(text)
      var file = new Blob([text], {type: type})
      console.log(file)
      this.setState({downloadValue:name})
      this.setState({hrefValue:URL.createObjectURL(file)})
      this.setState({showDownload:true})
      this.setState({showGenerate:false})
    }
    
    
    render(){

        var listItems
        var deleteAllButton
         var marginBottomStyle = {
            marginBottom:'10px'
        }
         var selectStyle = {
             backgroundColor:"#00ffe7",
             fontWeight:"bold"
             
         }
        if (this.state.itemUrlArray === undefined || this.state.itemUrlArray === null){
        }
        else {
            if (this.state.itemUrlArray.length > 0 || this.state.itemAppArray.length > 0){
                deleteAllButton = <Button bsStyle="success" onClick={this.deleteAllItem.bind(this)} style={marginBottomStyle} >
                           Delete All <Glyphicon glyph="trash"/>
                        </Button>    
            }
            var finalArr = this.state.itemUrlArray.concat(this.state.itemAppArray)
            listItems = finalArr.map((item,i) => { return <ListItemComponent ref="li" key={i} item={item} deleteItem={this.deleteItem.bind(this)} />             
                                            })
        }
        console.log("li",listItems)
        var generateButtonComponent
        var buttonComponent
        if (listItems.length > 0){
            if (this.state.showGenerate){
                buttonComponent = <Button bsStyle="info" onClick={() => this.download('OpenFavWebsites.cmd', 'text/plain')}>Generate file</Button>     
            }                    
            if (this.state.showDownload){
                buttonComponent =<Button bsStyle="success" href={this.state.hrefValue}  download= {this.state.downloadValue} id="a">Download File</Button>    
            } 
            generateButtonComponent = 
                <div>
                <ButtonToolbar>
                         {buttonComponent}
                </ButtonToolbar>
                </div>
        }
        
        var placeHolderText
        if (this.state.inputType == "url"){
            placeHolderText = "Enter frequently opening URL starting with http://"
        } else {
            placeHolderText="Enter exe location of app"
        }
        
        return (
            <div>
                <form onSubmit={this.AddItem.bind(this)} >
                    <FormGroup validationState={this.state.validState}>
                        <InputGroup>                                  
  
                            <InputGroup.Button bsStyle="info" style={{width:'10%'}}>
                                <FormControl componentClass="select" placeholder="select" ref="selType" onChange={this.handleSelChange.bind(this)} style={selectStyle}  required>
                                    <option value="URL">URL</option>
                                    <option value="APP">App Location</option>                                    
                                </FormControl>                            
                            </InputGroup.Button>
                            <FormControl ref="urlString" placeholder={placeHolderText} type={this.state.inputType} onChange={this.handleChange.bind(this)} />                       
                            <InputGroup.Button>
                                <Button type="submit" bsStyle="success" ref="urlAddutton" name="urlAddutton">
                                    Add
                                </Button>
                             </InputGroup.Button>                                                              
                        </InputGroup>                
                    </FormGroup>
                </form>
                
                {deleteAllButton}
    
                <ListGroup>
                    {listItems}
                </ListGroup>
                {generateButtonComponent}
            </div>
            )
        
    }
}
