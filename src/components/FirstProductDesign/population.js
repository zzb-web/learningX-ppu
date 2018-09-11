import React from 'react';
import {Input,Select} from 'antd';
const {Option} = Select;
class Population extends React.Component{
    constructor(props){
        super();
        this.state={
            name: props.data.name, 
            level: props.data.level, 
            object: props.data.object,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            name : nextProps.data.name,
            level : nextProps.data.level,
            object : nextProps.data.object
        })
    }
    render(){
        const {name,level,object} = this.state;
        // console.log(name)
        const productLevel = ['入门型','进阶型','高阶型']
        const productObj = ['高端试点','普通试点','共享应用','商业应用']
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>总体:</div>
                <div className='title-3-content'>
                    <span className='title-4'>产品名称:</span>
                    <Input style={{width:'20%',marginLeft:10}} 
                           placeholder='请输入产品名称'
                           value={name}
                           onChange={this.props.productInput}/>

                    <span className='title-4' style={{marginLeft:30}}>产品级别:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder=''
                           value={level}
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
                           value={object}
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