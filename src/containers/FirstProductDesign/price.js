import React from 'react';
import {InputNumber,Select} from 'antd';
import PriceComponent from '../../components/FirstProductDesign/price.js';
const {Option} = Select;
class Price extends React.Component{
    priceHandle(value){
        this.props.priceHandle(value)
    }
    render(){
        return(
            <div>
                <PriceComponent priceHandle={this.priceHandle.bind(this)}/>
            </div>
        )
    }
}

export default Price;