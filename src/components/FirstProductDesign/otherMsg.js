import React from 'react';
import {InputNumber,Select} from 'antd';
const {Option} = Select;
class OtherMsg extends React.Component{
    render(){
        const grade = [];
        const subject = [];
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>其他信息:</div>
                <div className='title-3-content'>
                    <span className='title-4'>学科:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder=''
                          
                           >
                        {
                            subject.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>
                    <span className='title-4' style={{marginLeft:30}}>年级:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder=''
                          
                           >
                        {
                            grade.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>
                </div>
            </div>
        )
    }
}

export default OtherMsg;