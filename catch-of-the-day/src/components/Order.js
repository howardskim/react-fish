import React, { Component } from 'react';
import {formatPrice} from '../helpers.js'
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends Component {
    renderOrder = (key) => {
        let { fishes, order } = this.props;
        let fish = fishes[key];
        let count = order[key];
        const isAvailable = fish && fish.status === 'available';
        if (!fish) return null;
        if(!isAvailable){
            return (
                <li>
                    Sorry {fish ? fish.name : 'fish'} is no longer available
                </li>
            )
        }
        return (
            <CSSTransition classNames="order" key={key} timeout={{enter: 500, exist: 500}}>
                <li key={key}>
                <span>
                    <TransitionGroup component="span" className="count">
                        <CSSTransition classNames="count" key={count} timeout={{enter: 200, exit: 200}}>
                            <span>{count}</span>
                        </CSSTransition>
                    </TransitionGroup>
                    lbs {fish ? fish.name : ''}  {''}
                    {formatPrice(count * fish.price)}
                </span>
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