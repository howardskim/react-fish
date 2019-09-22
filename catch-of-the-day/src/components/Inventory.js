import React, {Component} from 'react';
import base, { firebaseApp } from '../base';
import firebase from 'firebase'; 
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';


class Inventory extends Component{
    state = {
        uid: null,
        owner: null
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.authHandler({
                    user
                })
            }
        })
    }
    authHandler = async (authData) => {
        //1. Look Up the current store in the database
        const store = await base.fetch(this.props.storeId, {
            context: this
        })
        if(!store.owner){
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        };
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid,

        })

        //2. if there is no owner associated with the store, then claim it
        //3. set the state of the inventory component to reflect the current user
    }
    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler)
    }
    logout = async () => {
        await firebase.auth().signOut();
        this.setState({
            uid: null
        })
    }
    render(){
        const logout = <button onClick={this.logout}>Log Out!</button>
        //1. check if user is logged in
        if(!this.state.uid){
            return <Login authenticate={this.authenticate} />
        }
        //2. check if they're not the owner of the store
        if(this.state.uid !== this.state.owner){
            return (
                <div>
                    <p>Sorry, you are not the owner!</p>
                    {logout}
                </div>
            )
        }
        //3. then they must be the owner, just render the inventory!
        return(
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map((key) => {
                    let fish = this.props.fishes[key];
                    return (
                        <EditFishForm key={key} fishKey={key} deleteFish={this.props.deleteFish} updateFish={this.props.updateFish} fish={fish} />
                    )
                })}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory