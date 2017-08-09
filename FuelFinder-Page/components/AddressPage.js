import React from 'react'
import styles from '../styles/style.css'
import stylesSpinner1 from '../styles/cssspinner.css'
import ReactDOM from 'react-dom'
import Map from './Map.js'
import {FormGroup,ControlLabel,FormControl,Panel,Glyphicon,Button,Well,Col,Row,Popover,Form} from 'react-bootstrap'

export default class AddressPage extends React.Component{
    constructor(){
        super()
        this.state={
            markers : [
                {
                    position:{
                        lat: 40.7575285,
                        lng: -73.9884469
                    },
                    defaultAnimation: 2,
                    infoContent: (
                        <div> <h3> Hello </h3> </div>
                    ),
                    price:"",
                    showInfo:false
                }
            ],
            location: {
                lat:40.7575285,
                lng:-73.9884469
            }
        }

    }
    
    
    
    handleSubmit() {
        const{fetchFuelDetails} = this.props
        var zip = ReactDOM.findDOMNode(this.refs.zipCodeField).value
        console.log("zip",zip)
        fetchFuelDetails(zip)
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzz",this.props.fuelStationDet)
        
    }
    
    componentDidMount(){
        console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
    }
    
    componentWillMount(){
        console.log("d")
        this.state.markers = [
                {
                    position:{
                        lat: 40.7575285,
                        lng: -73.9884469
                    },
                    defaultAnimation: 2,
                    infoContent: (
                        <div> <h3> Hello </h3> </div>
                    ),
                    price:"",
                    showInfo:false
                }
            ]
        this.state.location = {
                lat:40.7575285,
                lng:-73.9884469
            }
        console.log("fff",this.state.markers)
    }
    

    
    handleMarkerClick(clickedMarker) {
        const{handleMarkerClick} = this.props
        handleMarkerClick()
        this.setState({
            markers: this.state.markers.map((marker) => {
                if (marker === clickedMarker){
                    return {
                        ...marker,
                        showInfo:true,
                        defaultAnimation:0
                    }
                }
                return {
                    ...marker,
                    defaultAnimation:0
                }
            })
            
        })
    }
    
    handleMarkerClose(clickedMarker) {
        this.setState({
            markers: this.state.markers.map((marker) => {
                if (marker === clickedMarker){
                    return {
                        ...marker,
                        showInfo:false,
                        defaultAnimation:0
                    }
                }
                return {
                    ...marker,
                    defaultAnimation:0
                }
            })
            
        })
    }
    
    
    
    
    render(){
        
        var markers =[]
        var location
        
        var loginFormStyle = {
            margin: '0 auto',
            padding:'0',
            maxWidth: '220px'
        }
        var divStyle = {
            display:'block',
            textAlign:'center',
            marginBottom:'10px'
        }
        var mapDivStyle = {
            width:'100% ',
            height:500
        }
        var tempMarkers =[]
        var location
        var renderComponent =''

        console.log("fuelStationDet", this.props.fuelStationDet)
        const {fuelStationDet,fetched,fetching,markerClicked} = this.props
        console.log("fetched",fetched)
        console.log("fetching",fetching)
        console.log("markercl",markerClicked)
        //if (fuelStationDet != undefined){
        if (fetched){
            console.log("lat lng val :", fuelStationDet)
            var temp = fuelStationDet.stations.map((station) => {
                //var infDet = 
                tempMarkers.push({
                    position:{
                        lat: parseFloat(station.lat),
                        lng: parseFloat(station.lng)
                    },
                    defaultAnimation: 2,
                    infoContent: (
                        <div>
                            <h5 style ={{color:'red'},{fontWeight:'bold'}}> {station.station} - {station.address} {station.city} {station.region} </h5>
                            <strong> ${station.reg_price}</strong>
                        </div>
                    ),
                    price:station.reg_price,
                    showInfo:false
                })
            })
            
            this.state.markers = tempMarkers
                        
            this.state.location = { 
                    //lat: parseFloat(fuelStationDet.geoLocation.lat),
                    lat:this.props.lat,
                    //lng: parseFloat(fuelStationDet.geoLocation.lng)
                    lng:this.props.lng
                }
            
            renderComponent = <div style = {mapDivStyle}>
                    <Map 
                    location={this.state.location} 
                    markers={this.state.markers} 
                    handleMarkerClick={this.handleMarkerClick.bind(this)}
                    handleMarkerClose={this.handleMarkerClose.bind(this)}
                    />        
                  </div>
            
        } 
        
        if (fetching) {
            console.log("fetchingggggg")
            renderComponent = <div className="tabloader" > </div>
        }
        
        if (markerClicked) {
            renderComponent = <div style = {mapDivStyle}>
                            <Map 
                            location={this.state.location} 
                            markers={this.state.markers} 
                            handleMarkerClick={this.handleMarkerClick.bind(this)}
                            handleMarkerClose={this.handleMarkerClose.bind(this)}
                            />        
                          </div>            

        }

                
        
        return (
            <div>
                <div style = {divStyle}>
                      <form style ={loginFormStyle} onSubmit={this.handleSubmit.bind(this)} >
                        <FormGroup
                          controlId="formBasicText">
                          <FormControl
                            type="text"
                            ref="zipCodeField"
                            placeholder="Enter zipcode to find fuel data"
                            required/>
                        </FormGroup>
                        <Button type="submit" bsStyle="success">
                          Submit
                        </Button>                
                      </form>
                  </div>
                  <div></div>
                  {renderComponent}
            </div>
            )
        
    }
    

    
}

