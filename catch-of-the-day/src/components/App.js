import React, {Component} from 'react';
import Header from './Header.js';
import Inventory from './Inventory';
import Order from './Order';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            fishes: {},
            order: {}
        }
    }
    //
    addFish = (fish) => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes
        })
    }
    render(){
        console.log('this.state.fishes ', this.state.fishes)
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header />                    
                </div>
                <Order />
                <Inventory addFish={this.addFish}/>
            </div>
        )
    }
}

export default App;