import React from "react";
import {Row,Col} from 'antd';
import Step1Component from '../../components/LayeredConfig/step1SelectClass.js'
import {Get} from '../../fetch/data.js'
export default class Step1 extends React.Component{
    state={
        gradeWarning : false,
        classWarning : false,
        cityWarning : false,
        schoolWarning : false,
        schools : [],
        cityMsg :['','','',''],
        schoolMsg : '',
        classMsg : ['',''],
        name_schoolID : {}
    }
    componentWillMount(){
        this.setState({
            type : this.props.type
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            type : nextProps.type
        })
    }
    schoolNameInput(value){
        console.log(value)
        if(value !== ''){
            this.setState({
                schoolWarning :false
            })
        }
        this.setState({
            schoolMsg : value
        })
    }
    dataMsgInput(cityMsg){
        console.log(cityMsg)
        if(cityMsg[1]!== ''){
            this.setState({
                cityWarning : false
            })
        }
        this.setState({
            cityMsg : cityMsg
        })
    }
    cityWarningHandle(value){
        this.setState({
            cityWarning : value
        })
    }
    schoolMsg(schools ,schoolsNames, name_schoolID){
        console.log(schools ,schoolsNames, name_schoolID)
        this.setState({
                    schools : schools,
                    schoolsNames : schoolsNames,
                    name_schoolID : name_schoolID
                })
    }
    classMsgInput(classMsg){
        console.log(classMsg)
        this.setState({
            classMsg : classMsg
        })
    }
    gradeWarningHandle(value){
        this.setState({
            gradeWarning : value
        })
    }
    classWarningHandle(value){
        this.setState({
            classWarning : value
        })
    }
    classSure(){
        const {cityMsg,schoolMsg,classMsg,name_schoolID} = this.state;
        console.log(cityMsg,schoolMsg,classMsg)
        let flag = true;
       if(cityMsg[1] === ''){
           this.setState({
            cityWarning : true
           })
           flag = false;
       }
       if(schoolMsg === ''){
           this.setState({
               schoolWarning : true
           })
           flag = false;
       }
       if(classMsg[0] === ''){
           this.setState({
             gradeWarning : true
           })
           flag = false;
       }
       if(classMsg[1] === ''){
            this.setState({
                classWarning : true
            })
            flag = false;
       }
       console.log(name_schoolID[schoolMsg])
       if(flag){
        let schoolID = name_schoolID[schoolMsg];
        let grade = classMsg[0];
        let msgClass = classMsg[1];
        let msg = `schoolID=${schoolID}&grade=${grade}&class=${msgClass}`
        Get(`/api/v3/staffs/classes/students/?${msg}`).then(resp=>{
            if(resp.status === 200){
                this.props.classSureHandle(resp.data,schoolID,grade,msgClass)
            }
        }).catch(err=>{

        })
       }
    }
    render(){
        const {type} = this.state;
        if(type === 0){
        return(
            <Row>
                <Col span={1}></Col>
                <Col span={10}>
                    <Step1Component schoolNameInput={this.schoolNameInput.bind(this)}
                                    dataMsgInput={this.dataMsgInput.bind(this)}
                                    cityWarningHandle={this.cityWarningHandle.bind(this)}
                                    schoolMsg={this.schoolMsg.bind(this)}
                                    classMsgInput={this.classMsgInput.bind(this)}
                                    gradeWarningHandle={this.gradeWarningHandle.bind(this)}
                                    classWarningHandle={this.classWarningHandle.bind(this)}
                                    classSure={this.classSure.bind(this)}
                                    data={this.state}/>
                </Col>
                <Col span={13}></Col>
            </Row>
        )
        }else{
            return(
                <Step1Component schoolNameInput={this.schoolNameInput.bind(this)}
                                    dataMsgInput={this.dataMsgInput.bind(this)}
                                    cityWarningHandle={this.cityWarningHandle.bind(this)}
                                    schoolMsg={this.schoolMsg.bind(this)}
                                    classMsgInput={this.classMsgInput.bind(this)}
                                    gradeWarningHandle={this.gradeWarningHandle.bind(this)}
                                    classWarningHandle={this.classWarningHandle.bind(this)}
                                    classSure={this.classSure.bind(this)}
                                    data={this.state}/>
            )
        }
    }
}