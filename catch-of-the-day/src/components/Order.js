import React, { Component } from 'react';
import {formatPrice} from '../helpers.js'
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends Component {
    renderOrder = (key) => {
        let { fishes, order } = this.props;
        let fish = fishes[key];
        let count = order[key];
        const isAvailable = fish && fish.status === 'available';
        if(!isAvailable){
            return (
                <li>
                    Sorry {fish ? fish.name : 'fish'} is no longer available
                </li>
            )
        }
        return (
            <CSSTransition classNames="order" key={key} timeout={{enter: 250, exist: 250}}>

                <li key={key}>
                {count} lbs {fish ? fish.name : ''}  {''}
                {formatPrice(count * fish ? fish.price : '')}
                <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                </li>
            </CSSTransition>
        )
    }
    render() {
        let{fishes, order} = this.props;
        const orderIds = Object.keys(order);
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
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
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