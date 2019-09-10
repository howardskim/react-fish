import React, {Component} from 'react';
import {formatPrice} from '../helpers';

class Fish extends Component{
    render(){
        let { details, addToOrder, orderKey} = this.props;
        let {desc, image, name, price, status} = details
        const isAvailable = status === 'available' ? true : false;
        return(
            <li className="menu-fish">
                <img src={image} alt=""/>
                <h3 className="fish-name">{name}
                <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button onClick={() => addToOrder(orderKey)} disabled={!isAvailable}>{isAvailable ? 'Add To Order' : 'Sold Out'}</button>
            </li>
        )
    }
}

export default Fish;