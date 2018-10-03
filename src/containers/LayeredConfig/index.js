import React from 'react';
import Step1 from './step1SelectClass.js';
import Step2 from './step2Table.js';
import Step3 from './step3Config.js'
import {Put} from '../../fetch/data.js'
class LayeredConfig extends React.Component {
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
        updateMsg : {}
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
    }
    step2SureHandle(){
        const {updateMsg} = this.state;
        if(!this._objIsEmpty(updateMsg)){
            let putMsg = [];
            for(var key in updateMsg){
                putMsg.push({
                    learnID: Number(key),
                    level: updateMsg[key]
                })
            }
            Put(`/api/v3/staffs/classes/students/level/`,putMsg).then(resp=>{

            }).catch(err=>{

            })
        }
        
        this.setState({
            showStep2 : false,
            showStep3 : true
        })
    }
    _objIsEmpty(obj) {
        for(var key in obj) {
            return false;
        }
            return true;
    }
    updateMsgHandle(data){
        this.setState({
            updateMsg : data
        })
    }
    render(){
        const {showStep1,showStep2,showStep3, students,schoolID,grade,msgClass,updateMsg} = this.state;
        return(
            <div>
                {showStep1 ? <Step1 classSureHandle={this.classSureHandle.bind(this)}/> : null}
                {showStep2 ? <Step2 students={students} 
                                    updateMsg={updateMsg}
                                    updateMsgHandle={this.updateMsgHandle.bind(this)}
                                    step2SureHandle={this.step2SureHandle.bind(this)}/> : null}
                {showStep3 ? <Step3 schoolID={schoolID}
                                    grade={grade}
                                    msgClass={msgClass}/> : null}
            </div>
        )
    }
}

export default LayeredConfig;