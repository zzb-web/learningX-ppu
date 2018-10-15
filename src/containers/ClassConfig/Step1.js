import React from 'react';
import {Row,Col, Table ,Button } from "antd";
import Step1 from '../LayeredConfig/step1SelectClass.js';
class ClassConfigStep1 extends React.Component{
    constructor(){
        super();
        this.state={
            showTable : false,
            allStudentNum : 0,
            showTipMsg : false,
            students : {
                learnIDs : []
            },
        }
    }
    classSureHandle(data,schoolID,grade,msgClass){
        this.setState({
            showStep1 : false,
            showStep2 : true,
            students : data,
            allStudentNum : data.total,
            schoolID : schoolID,
            grade : grade,
            msgClass : msgClass,
            showTipMsg : true,
            showTable : true
        })
    }
    toConfig(){
        const {schoolID,grade,msgClass} = this.state;
        this.props.toConfig(schoolID,grade,msgClass);
    }
    render(){
        const {allStudentNum,showTipMsg,students,showTable} = this.state;
        const columns = [
            {
                title:'学习号',
                dataIndex : 'learnID',
                key : 'learnID',
                width : '60%'
            },
            {
                title:'姓名',
                dataIndex : 'name',
                key : 'name',
                width : '40%'
            },
        ]
        const dataSource = [];
        students.learnIDs.map((item,index)=>{
            dataSource.push({
                key : index,
                learnID : item.learnID,
                name : item.name
            })
        })
        return(
            <Row>
                <Col span={1}></Col>
                <Col span={8}>
                    <Step1 classSureHandle={this.classSureHandle.bind(this)} type={1}/>
                    {
                        showTipMsg ?<div className='save-success'>
                                                    <span style={{color:'#108ee9'}}>学生总数:{allStudentNum}</span>
                                                </div> : null
                            }
                </Col>
                <Col span={4}></Col>
                <Col span={10}>
                    {
                        showTable ? <div style={{marginTop:50,textAlign:'center'}}>
                                        <Table columns={columns}
                                            bordered={true}
                                            pagination={false}
                                            dataSource={dataSource}
                                            scroll={{x:false,y:300}}
                                                />
                                         <Button size='large' 
                                                 type='primary'
                                                 style={{width:300,marginTop:30}}
                                                 onClick={this.toConfig.bind(this)}>去配置</Button>
                                    </div> : null
                    }
                </Col>
                <Col span={1}></Col>
            </Row>
        )
    }
}

export default ClassConfigStep1;