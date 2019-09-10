import React, { Component } from 'react';
import {formatPrice} from '../helpers.js'
class Order extends Component {
    renderOrder = (key) => {
        let { fishes, order } = this.props;
        let fish = fishes[key];
        let count = order[key];
        return (
            <li>
            {count} lbs {fish.name}  {' '}
            {formatPrice(count * fish.price)}
            </li>
        )
    }
    render() {
        let{fishes, order} = this.props;
        const orderIds = Object.keys(order);
        console.log('orderIds ', orderIds);
        const total = orderIds.reduce((prevTotal, key)=>{
            let fish = fishes[key];
            let count = order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable){
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0)
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul>
                    {orderIds.map(this.renderOrder)}
                </ul>
                <div className="total">
                    <strong>
                        {formatPrice(total)}
                    </strong>
                </div>
            </div>
        )
    }
}

export default Order