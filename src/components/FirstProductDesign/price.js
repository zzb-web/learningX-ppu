import React from 'react';
import {InputNumber,Select} from 'antd';
const {Option} = Select;
class Price extends React.Component{
    render(){
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>错题源:</div>
                <div className='title-3-content'>
                   <InputNumber placeholder='输入数值必须为整数'
                                style={{width:'20%',marginLeft:70}}/>
                    <span className='yuan'>元</span>
                </div>
            </div>
        )
    }
}

export default Price;