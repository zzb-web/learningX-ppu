import React from 'react';
import {InputNumber,Select} from 'antd';
import PriceComponent from '../../components/FirstProductDesign/price.js';
const {Option} = Select;
class Price extends React.Component{
    constructor(props){
        super();
        this.state={
            price : props.price
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            price : nextProps.price
        })
    }
    priceHandle(value){
        this.props.priceHandle(value)
    }
    render(){
        const {price} = this.state;
        return(
            <div>
                <PriceComponent priceHandle={this.priceHandle.bind(this)}
                                price={price}/>
            </div>
        )
    }
}

export default Price;