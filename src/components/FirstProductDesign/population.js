import React from 'react';
import {Input,Select} from 'antd';
const {Option} = Select;
class Population extends React.Component{
    render(){
        const productLevel = ['无','入门型','进阶型','高阶型']
        const productObj = ['高端试点','普通试点','共享应用','商业应用']
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>总体:</div>
                <div className='title-3-content'>
                    <span className='title-4'>产品名称:</span>
                    <Input style={{width:'20%',marginLeft:10}} 
                           placeholder='请输入产品名称'
                           onChange={this.props.productInput}/>

                    <span className='title-4' style={{marginLeft:30}}>产品级别:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder=''
                           onChange={this.props.productLevel}>
                        {
                            productLevel.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>

                    <span className='title-4' style={{marginLeft:30}}>产品对象:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder=''
                           onChange={this.props.productObj}>
                        {
                            productObj.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>
                </div>
            </div>
        )
    }
}

export default Population;