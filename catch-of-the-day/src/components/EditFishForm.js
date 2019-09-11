import React, {Component} from 'react';

class EditFishForm extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    handleChange = (e) => {
        let typed = e.target.value;
        let updatedFish = {
            ...this.props.fish,
            [e.target.name] : typed
        }
        console.log(updatedFish)
        this.props.updateFish(this.props.fishKey, updatedFish)
    }
    handleSave = () => {
        this.props.updateFish(this.props.fishKey, this.state.fish)
    }
    render(){
        let{name, price, status, desc, image} = this.props.fish;
        return (
            <div className="fish-edit">
                <input onChange={this.handleChange} name="name" type="text" value={name}/>
                <input onChange={this.handleChange} name="price" type="text" value={price}/>
                <select onChange={this.handleChange} name="status" value={status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea onChange={this.handleChange} name="desc" type="text" value={desc}></textarea>
                <input onChange={this.handleChange} type="text" name="image" value={image}/>
                <button onClick={this.handleSave}>Save</button>
            </div>
        )
    }
}

export default EditFishForm;