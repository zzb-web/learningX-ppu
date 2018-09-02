import React from 'react';
import {Select} from 'antd';
const {Option} = Select;
class OtherMsg extends React.Component{
    render(){
        const grade = ['一','二','三','四','五','六','七','八','九','高一','高二','高三','高复','全部'];
        const subject = ['数学'];
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>其他信息:</div>
                <div className='title-3-content'>
                    <span className='title-4'>学科:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder='请选择学科'
                           onChange={this.props.subjectHandle}
                           >
                        {
                            subject.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>
                    <span className='title-4' style={{marginLeft:30}}>年级:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder='请选择年级' 
                           onChange={this.props.gradeHandle}
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