import React from 'react'
import styles from '../styles/style.css'
import stylesSpinner1 from '../styles/cssspinner.css'
import ReactDOM from 'react-dom'
import Map from './Map.js'
import {FormGroup,ControlLabel,FormControl,Panel,Glyphicon,Button,Well,Col,Row,Popover,Form,ButtonToolbar} from 'react-bootstrap'

const geolocation = (
  //canUseDOM && navigator.geolocation ?
    navigator.geolocation ?
  navigator.geolocation : 
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
)


export default class AddressPage extends React.Component{
    constructor(){
        super()
        var lat
        var lng
        geolocation.getCurrentPosition((position) => {
              if (this.isUnmounted) {
                return
              }
              lat=parseFloat(position.coords.latitude)
              lng=parseFloat(position.coords.longitude)
        })
        console.log(lat,lng)
        this.state={
            markers : [
                {
                    position:{
                        lat: lat,
                        lng: lng
                    },
                    defaultAnimation: 2,
                    infoContent: (
                        <div> <h3> Hello </h3> </div>
                    ),
                    priceContent: (
                        <div> <h3> NA </h3> </div>
                    ),
                    price:"",
                    showInfo:false
                }
            ],
            location: {
                lat:lat,
                lng:lng
            }
        }

    }

    
    executeCurrentLoc(){
        const {dispatch,currentLocFuel} = this.props
        
        console.log("hellllloooo",this.state.location.lat,this.state.location.lng)
        currentLocFuel(this.state.location.lat,this.state.location.lng)
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
        geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return
      }
    console.log("lat",position.coords.latitude)
        this.setState({ 
                markers:
                [{
                    position:{
                        lat: parseFloat(position.coords.latitude),
                        lng: parseFloat(position.coords.longitude)
                    },
                    defaultAnimation: 2,
                    infoContent: null,                    
                    priceContent: null,
                    price:"",
                    showInfo:false
                }],
                location: {
                   lat: parseFloat(position.coords.latitude),
                    lng: parseFloat(position.coords.longitude) 
                }
        })
        
      })
    }
    
    componentWillMount(){
        console.log("d")
        /*this.state.markers = [
                {
                    position:{
                        lat: 40.7575285,
                        lng: -73.9884469
                    },
                    defaultAnimation: 2,
                    infoContent: (
                        <div> <h3> Hello </h3> </div>
                    ),                    
                    priceContent: (
                        <div> <h3> NA </h3> </div>
                    ),
                    price:"",
                    showInfo:false
                }
            ]
        this.state.location = {
                lat:40.7575285,
                lng:-73.9884469
            }*/
        
        /*geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return
      }
    console.log("lat",position.coords.latitude)
        this.setState({ 
                markers:
                [{
                    position:{
                        lat: parseFloat(position.coords.latitude),
                        lng: parseFloat(position.coords.longitude)
                    },
                    defaultAnimation: 2,
                    infoContent: null,                    
                    priceContent: null,
                    price:"",
                    showInfo:false
                }],
                location: {
                   lat: parseFloat(position.coords.latitude),
                    lng: parseFloat(position.coords.longitude) 
                }
        })
        
      })
*/        
        
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
        var priceContentStyle = {
            color:'white',
            fontWeight:'bold',
            backgroundColor:'green',
            fontSize:'9px'
        }
        var buttonDivStyle = {
            textAlign:'center',
            paddingBottom:'10px',
            //display:'inline-block'
        }        

        console.log("fuelStationDet", this.props.fuelStationDet)
        const {fuelStationDet,fetched,fetching,markerClicked,firstLoad} = this.props
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
                    priceContent: (
                        <div style={priceContentStyle}> <strong> {station.reg_price} </strong> </div>
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
        console.log("fir", firstLoad)
        if (markerClicked) {
            renderComponent = <div style = {mapDivStyle}>
                            <Map 
                            location={this.state.location} 
                            markers={this.state.markers} 
                            handleMarkerClick={this.handleMarkerClick.bind(this)}
                            handleMarkerClose={this.handleMarkerClose.bind(this)}
                            firstLoad={firstLoad}
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
                        <div style={buttonDivStyle}>                            
                            <ButtonToolbar>
                            <Button type="submit" bsStyle="success" bsSize="small">
                              Submit
                            </Button>  
                            <Button type="button" bsStyle="success" bsSize="small" onClick={this.executeCurrentLoc.bind(this)}>
                             <i className="fa fa-location-arrow" aria-hidden="true"></i> Use My Location
                            </Button>  
                            </ButtonToolbar>
                        </div>
                      </form>
                  </div>
                  <div></div>
                  {renderComponent}
            </div>
            )
        
    }
    

    
}

