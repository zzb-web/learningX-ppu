import React from 'react';
import Step1 from '../LayeredConfig/step1SelectClass.js';
import Step2 from '../LayeredConfig/step2Table.js';
import Step3 from './Step3.js';
import {Get,Post, Put} from '../../fetch/data.js';
class TargetPlan extends React.Component{
    state={
        showStep1 : true,
        showStep2 : false,
        showStep3 : false,
        students : {
            total : 0,
            learnIDs : []
        },
        schoolID : '',
        grade : '',
        msgClass : '',
        updateMsg : {},
        nums : 0,
        totalLevel : ''
    }
    classSureHandle(data,schoolID,grade,msgClass){
        this.setState({
            showStep1 : false,
            showStep2 : true,
            students : data,
            schoolID : schoolID,
            grade : grade,
            msgClass : msgClass
        })
        let putMsg = `schoolID=${schoolID}&grade=${grade}&class=${msgClass}`;
        Get(`/api/v3/staffs/classes/totalLevel/?${putMsg}`).then(resp=>{
            if(resp.status === 200){
                this.setState({
                    totalLevel : resp.data.totalLevel
                })
            }
        }).catch(err=>{

        })
    }
    getNums(value){
        this.setState({
            nums : value
        })
    }
    toStep3(){
        this.setState({
            showStep2 : false,
            showStep3 : true
        })
    }
    updateMsgHandle(data){
        this.setState({
            updateMsg : data
        })
    }
    render(){
        const {showStep1,showStep2,showStep3, students,schoolID,grade,
            msgClass,updateMsg,totalLevel} = this.state;
        return(
            <div>
                {showStep1 ? <Step1 classSureHandle={this.classSureHandle.bind(this)} type={0}/> : null}
                {showStep2 ? <Step2 students={students} 
                                    totalLevel={totalLevel}
                                    updateMsg={updateMsg}
                                    updateMsgHandle={this.updateMsgHandle.bind(this)}
                                    getNums={this.getNums.bind(this)}
                                    toStep3={this.toStep3.bind(this)}
                                    type={0}/> : null}
                 {showStep3 ? <Step3 schoolID={schoolID}
                                    totalLevel={totalLevel}
                                    grade={grade}
                                    msgClass={msgClass}
                                    /> : null}
            </div>
        )
    }
}

export default TargetPlan;