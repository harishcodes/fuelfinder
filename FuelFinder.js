import React from 'react';
import ReactDOM from 'react-dom';
import AddressPageAction from './FuelFinder-Page/components/AddressPageAction.js'
import Menu from './Menu.js';
export default class FuelFinder extends React.Component {
    
    constructor(){
        super();
    }
 
    render(){
        return (
            <div>
                <Menu/>
                <AddressPageAction/>
            </div>
            )
    }
}


    
