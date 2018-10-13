import React from 'react';
import {Select} from 'antd';
const {Option} = Select;
class AbnormalHandle extends React.Component{
    constructor(props){
        super();
        this.state={
            exceptionHandler : props.data.exceptionHandler,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            exceptionHandler : nextProps.data.exceptionHandler
        })
    }
    render(){
        const {exceptionHandler} = this.state;
        const handles = ['全部标记为√再生成','全部标记为×再生成','不生成'];
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>异常处理:</div>
                <div className='title-3-content'>
                    <span className='title-4'>未标记:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder='请选择学科'
                           value={handles[exceptionHandler-1]}
                           onChange={this.props.abnormalHandle}
                           >
                        {
                            handles.map((item,index)=>
                                <Option value={index} key={index}>{item}</Option>
                            )
                        }
                    </Select>
                </div>
            </div>
        )
    }
}

export default AbnormalHandle;