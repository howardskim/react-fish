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
        let localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef){
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }
    componentDidUpdate(prevProps, prevState){
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
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
    removeFromOrder = (key) => {
        let order = {...this.state.order}
        delete order[key];
        this.setState({
            order
        })
    }
    updateFish = (key, newFish) => {
        let fishes = {...this.state.fishes};
        fishes[key] = newFish;
        this.setState({
            fishes
        })
    }
    deleteFish = (key) => {
        let fishes = {...this.state.fishes}
        // delete fishes[key]
        fishes[key] = null;
        this.setState({
            fishes
        })
    }
    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>             
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map((key) => {
                            let eachFish = this.state.fishes[key];
                            return (
                                <Fish orderKey={key} key={key} details={eachFish} addToOrder={this.addToOrder}/>
                            )
                        })}
                    </ul>       
                </div>
                <Order removeFromOrder={this.removeFromOrder} fishes={this.state.fishes} order={this.state.order} addToOrder={this.addToOrder}/>
                <Inventory storeId={this.props.match.params.storeId} deleteFish={this.deleteFish} updateFish={this.updateFish} loadSampleFishes={this.loadSampleFishes} addFish={this.addFish} fishes={this.state.fishes}/>
            </div>
        )
    }
}

export default App;