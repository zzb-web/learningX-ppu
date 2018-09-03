import React from 'react';
import {Select} from 'antd';
const {Option} = Select;
class OtherMsg extends React.Component{
    constructor(props){
        super();
        this.state={
            subject : props.data.subject,
            grade : props.data.grade
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            subject : nextProps.data.subject,
            grade : nextProps.data.grade
        })
    }
    render(){
        const {subject,grade} = this.state;
        const grades = ['一','二','三','四','五','六','七','八','九','高一','高二','高三','高复','全部'];
        const subjects = ['数学'];
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>其他信息:</div>
                <div className='title-3-content'>
                    <span className='title-4'>学科:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder='请选择学科'
                           value={subject}
                           onChange={this.props.subjectHandle}
                           >
                        {
                            subjects.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>
                    <span className='title-4' style={{marginLeft:30}}>年级:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder='请选择年级' 
                           value={grade}
                           onChange={this.props.gradeHandle}
                           >
                        {
                            grades.map((item,index)=>
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