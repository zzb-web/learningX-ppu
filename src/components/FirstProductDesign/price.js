import React from 'react';
import {InputNumber,Select} from 'antd';
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
    render(){
        const {price} = this.state;
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>价格:</div>
                <div className='title-3-content'>
                    <span className='title-4'>产品单价:</span>
                   <InputNumber placeholder='输入数值必须为整数'
                                style={{width:'20%',marginLeft:10}}
                                value={price}
                                onChange={this.props.priceHandle}/>
                    <span className='yuan'>元</span>
                </div>
            </div>
        )
    }
}

export default Price;