const INITIAL_STATE={
    fuelStationDet:'',
    fetching:false,
    fetched:false,
    markerClicked:false,
    lat:'',
    lng:''
}
export default function Fuelreducer(state={INITIAL_STATE},action){
    
    switch (action.type){
        case "FETCH_GEOINFO_SUCCESS":{
            console.log("ddddd",action.payload)
            return {...state, fuelStationDet:action.payload.fuelDet, 
                    lat:action.payload.lat,lng:action.payload.lng, fetching:false,fetched:true,markerClicked:false}
        }    
        case "FETCH_MESSAGE_ERROR":{
            console.log("errrrrr",action.payload)
            return {...state, fuelStationDet:null,fetching:false,fetched:false,markerClicked:false}
        }
        case "FETCHING_FUEL_DATA":{
            return {...state, fuelStationDet:null,fetching:true,fetched:false,markerClicked:false}
        }
        case "MARKER_CLICKED":{
            return {...state,fetching:false,fetched:false,markerClicked:true}
        }
        default: {
            console.log("firstr",INITIAL_STATE, state)
            return {...state}
        }
    }
    return state
}