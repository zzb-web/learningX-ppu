import React from 'react';
import {InputNumber,Select} from 'antd';
import PriceComponent from '../../components/FirstProductDesign/price.js';
const {Option} = Select;
class Price extends React.Component{
    errMark(value){
        console.log(value)
    }
    render(){
        return(
            <div>
                <PriceComponent/>
            </div>
        )
    }
}

export default Price;