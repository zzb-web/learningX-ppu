import React from 'react';
import {InputNumber,Select} from 'antd';
const {Option} = Select;
class Cpu extends React.Component{
    render(){
        const EPU = ['EPU1','EPU2']
        const papers = ['A3','A4']
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>处理器:</div>
                <div className='title-3-content'>
                    <span className='title-4'>EPU:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder=''
                           onChange={this.props.epuHandle}
                           >
                        {
                            EPU.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>

                    <span className='title-4' style={{marginLeft:30}}>题量控制:</span>
                    <InputNumber style={{width:'20%',marginLeft:10}} 
                                 onChange={this.props.topicHandle}
                                 placeholder=''/>

                    <span className='title-4' style={{marginLeft:30}}>纸张大小:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder=''
                           onChange={this.props.paperHandle}
                           >
                        {
                            papers.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>
                </div>
            </div>
        )
    }
}

export default Cpu;