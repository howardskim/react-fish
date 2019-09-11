import React, {Component} from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends Component{
    render(){
        return(
            <div className="inventory">
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map((key) => {
                    console.log(key)
                    let fish = this.props.fishes[key];
                    return (
                        <EditFishForm key={key} fishKey={key} updateFish={this.props.updateFish} fish={fish} />
                    )
                })}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory