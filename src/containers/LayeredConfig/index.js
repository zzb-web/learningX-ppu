import React from 'react';
import Step1 from './step1SelectClass.js';
import Step2 from './step2Table.js';
import Step3 from './step3Config.js'
import {Put,Post,Get} from '../../fetch/data.js'
import {message} from "antd";
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
    step2SureHandle(){
        const {updateMsg,nums,schoolID,grade,msgClass,students} = this.state;
        if(nums !== 0){
            let postMsg = {
                schoolID: schoolID,
                grade: grade,
                class: msgClass,
                totalLevel: nums,
            }
            Post(`/api/v3/staffs/classes/totalLevel/`,postMsg).then(resp=>{
    
            }).catch(err=>{

            })
            let updateArr = []
            for(var key in updateMsg){
                updateArr.push(key)
            }
            if(updateArr.length === students.total){
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
                this.setState({
                    showStep2 : false,
                    showStep3 : true
                })
            }else{
                message.error('有学生未选择新层级');
            }
        }else{
                 message.error('有学生未选择新层级');
        }
    }
    updateMsgHandle(data){
        this.setState({
            updateMsg : data
        })
    }
    render(){
        const {showStep1,showStep2,showStep3, students,schoolID,grade,
            msgClass,updateMsg,totalLevel,nums} = this.state;
        return(
            <div>
                {showStep1 ? <Step1 classSureHandle={this.classSureHandle.bind(this)} type={0}/> : null}
                {showStep2 ? <Step2 students={students} 
                                    totalLevel={totalLevel}
                                    updateMsg={updateMsg}
                                    updateMsgHandle={this.updateMsgHandle.bind(this)}
                                    getNums={this.getNums.bind(this)}
                                    step2SureHandle={this.step2SureHandle.bind(this)}/> : null}
                {showStep3 ? <Step3 schoolID={schoolID}
                                    nums={nums}
                                    grade={grade}
                                    msgClass={msgClass}
                                    type={0}/> : null}
            </div>
        )
    }
}

export default LayeredConfig;