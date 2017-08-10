const INITIAL_STATE={
    fuelStationDet:'',
    fetching:false,
    fetched:false,
    markerClicked:false,
    lat:'',
    lng:'',
    firstLoad:true
}
export default function Fuelreducer(state={INITIAL_STATE},action){
    
    switch (action.type){
        case "FETCH_GEOINFO_SUCCESS":{
            console.log("ddddd",action.payload)
            return {...state, fuelStationDet:action.payload.fuelDet, 
                    lat:action.payload.lat,lng:action.payload.lng, fetching:false,fetched:true,markerClicked:false,firstLoad:true}
        }    
        case "FETCH_MESSAGE_ERROR":{
            console.log("errrrrr",action.payload)
            return {...state, fuelStationDet:null,fetching:false,fetched:false,markerClicked:false,firstLoad:true}
        }
        case "FETCHING_FUEL_DATA":{
            return {...state, fuelStationDet:null,fetching:true,fetched:false,markerClicked:false,firstLoad:true}
        }
        case "MARKER_CLICKED":{
            return {...state,fetching:false,fetched:false,markerClicked:true,firstLoad:true}
        }
        default: {
            console.log("firstr",INITIAL_STATE, state)
            return {...state}
        }
    }
    return state
}