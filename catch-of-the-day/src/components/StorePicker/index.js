import React, { Component } from 'react';
import {getFunName} from '../../helpers.js';

class StorePicker extends Component {
    myInput = React.createRef();
    goToStore = (e) => {
        e.preventDefault();
        console.log('this.props ', this.props)
        console.log(getFunName())
        console.log(this.myInput.current.value)
        let value = this.myInput.current.value;
        let {history} = this.props;
        history.push(`/store/${value}`)
    }
    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input 
                    required 
                    type="text" 
                    placeholder="Store Name" 
                    defaultValue={getFunName()}
                    ref={this.myInput}
                />
                <button type="submit">Visit Store -></button>
            </form>
        )
    }
}

export default StorePicker;