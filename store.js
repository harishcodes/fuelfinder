import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './masterreducer.js'

 //store.dispatch(fetchMessageInfo()).then(() => console.log(store.getState()))
export default function storefn(){
    const middleware =applyMiddleware(thunk)
    //console.log('sdsd')
    //return createStore(reducer, middleware)
    let store=createStore(reducer, middleware)
    
    return store
    //return createStore(reducer)
}