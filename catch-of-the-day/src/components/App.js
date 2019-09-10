import React, {Component} from 'react';
import Header from './Header.js';
import Inventory from './Inventory';
import Order from './Order';
import fishes from '../sample-fishes'
import Fish from './Fish';
import base from '../base.js';


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            fishes: {},
            order: {}
        }
    }
    componentDidMount(){
        let {params} = this.props.match
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }
    componentDidUpdate(prevProps, prevState){
        console.log(this.state.order)
        localStorage.setItem(this.props.match.params.storeId, this.state.order)
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    //
    addFish = (fish) => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes
        })
    }
    loadSampleFishes = () => {
        this.setState({
            fishes: fishes
        })
    }
    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 ||  1;
        this.setState({
            order
        })
    }
    render(){
        console.log('this.state ', this.state)
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header />             
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map((key) => {
                            let eachFish = this.state.fishes[key];
                            return (
                                <Fish orderKey={key} key={key} details={eachFish} addToOrder={this.addToOrder}/>
                            )
                        })}
                    </ul>       
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} addToOrder={this.addToOrder}/>
                <Inventory loadSampleFishes={this.loadSampleFishes} addFish={this.addFish}/>
            </div>
        )
    }
}

export default App;