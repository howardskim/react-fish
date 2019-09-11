import React, {Component} from 'react';

class AddFishForm extends Component{
    
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    createFish = (e) => {
        e.preventDefault();
        let newFish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        }
        this.props.addFish(newFish);
        e.currentTarget.reset();
    }
    render(){
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input ref={this.nameRef} placeholder="name" name="name" type="text"/>
                <input ref={this.priceRef} placeholder="price" name="price" type="text" />
                <select ref={this.statusRef} name="status" id="">
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea ref={this.descRef} name="desc" placeholder="desc" ></textarea>
                <input ref={this.imageRef} placeholder="image" name="image" type="text" />
                <button type="submit">+ Add Fish</button>


            </form>
        )
    }
}

export default AddFishForm;