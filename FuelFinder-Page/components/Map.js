import React from 'react'
import styles from '../styles/style.css'
import ReactDOM from 'react-dom'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import {FormGroup,ControlLabel,FormControl,Panel,Glyphicon,Button,Well,Col,Row,Popover,Form,Glyphicons} from 'react-bootstrap'

 
    const icon = {
    path: 'M 100 100 L 300 100 L 200 300 z',
    fillColor: 'red',
    strokeColor: 'blue',
    strokeWidth: 3,
  }
    var infoWindowStyle={
        color:'blue',
        fontWeight:'bold'
    }
    var markerIcon = {
  url: 'http://image.flaticon.com/icons/svg/252/252025.svg',
  //url: '../images/gasoline.png',
  scaledSize: new google.maps.Size(75, 75),
  origin: new google.maps.Point(0, 0),  
  anchor: new google.maps.Point(32,65),
  labelOrigin: new google.maps.Point(36,30)            
}
 
    var iconimage = "../images/gas_station.png"
    var iconurl = 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
       const GettingStartedGoogleMap = withGoogleMap(props => (
                                        <GoogleMap
                                            defaultZoom={13}
                                            defaultCenter={props.center}
                                            options={{streetViewControl:true,mapTypeControl:true}}>
                                                {props.markers.map((venue,i) => {
                                                        var labeldet = {
                                                                    text: '$'+venue.price,
                                                                    color: "dark green",
                                                                    fontSize: "11px",
                                                                    fontWeight: "bold"
                                                                }
                                                        return <Marker 
                                                                key={i} 
                                                                {...venue}
                                                                icon={markerIcon}
                                                                //label= {venue.price}
                                                                label= {labeldet}
                                                                onClick={() => props.onMarkerClick(venue)}                    
                                                                onMouseOver={() => props.onMarkerClick(venue)}
                                                                onMouseOut={() =>props.onMarkerClose(venue) }
                                                                >
                                                                    {venue.showInfo && (
                                                                        <InfoWindow style={infoWindowStyle} onCloseClick= {() =>props.onMarkerClose(venue) }>
                                                                         {venue.infoContent}
                                                                        </InfoWindow>
                                                                    )}                                                                                                                       

                                                                </Marker>
                                                    })
                                                }
                                        </GoogleMap>
                                  ))
                                  
                                  
 
export default class Map extends React.Component{
    constructor(){
        super()
        this.state={}
    }
    
    
    
   
    
  render(){
        var mapStyle = {
            height:'100%',
            width:'100%'
        }
        var mapContent
        console.log(this.props.markers)
        console.log(this.props.location)
        console.log("firstload",this.props.firstLoad)
        
        
        
        const mapContainer = <div style={mapStyle}>
                             </div>    
        const mapElement = <div style = {mapStyle}>
                           </div>

       
        
        return (
            <GettingStartedGoogleMap
                    containerElement={mapContainer}
                    mapElement={mapElement}
                    center={this.props.location}
                    markers={this.props.markers}
                    onMarkerClick= {this.props.handleMarkerClick}
                    onMarkerClose={this.props.handleMarkerClose}            
                />
            )
    }    
}

