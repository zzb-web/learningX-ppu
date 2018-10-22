import React from 'react';
import Step1 from '../LayeredConfig/step1SelectClass.js';
import Step2 from '../LayeredConfig/step2Table.js';
// import Step3 from '../LayeredConfig/step3Config.js'
import {Put,Post,Get} from '../../fetch/data.js'
import {message,Modal} from "antd";
const {confirm} = Modal;
class StudentLayered extends React.Component {
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
        const {updateMsg,nums,students} = this.state;
        if(nums !== 0){
            let updateArr = []
            for(var key in updateMsg){
                updateArr.push(key)
            }
            if(updateArr.length === students.total){
                    const that = this;
                    confirm({
                      title: '必须进行学生分层检查',
                      content: '确定学生分层OK?',
                      onOk() {
                        that.submitOK()
                      },
                      onCancel() {
                        
                      },
                    });
            }else{
                message.error('有学生未选择新层级');
            }
        }else{
                 message.error('有学生未选择新层级');
        }
    }
    submitOK(){
        const {updateMsg,nums,schoolID,grade,msgClass} = this.state;
        let postMsg = {
            schoolID: schoolID,
            grade: grade,
            class: msgClass,
            totalLevel: nums,
        }
        Post(`/api/v3/staffs/classes/totalLevel/`,postMsg).then(resp=>{

        }).catch(err=>{

        })

        let putMsg = [];
        for(var key in updateMsg){
            putMsg.push({
                learnID: Number(key),
                level: updateMsg[key]
            })
        }
        Put(`/api/v3/staffs/classes/students/level/`,putMsg).then(resp=>{
            if(resp.status === 200){
                message.success('操作成功')
            }else{
                message.error('操作失败');
            }
        }).catch(err=>{

        })
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
                                    step2SureHandle={this.step2SureHandle.bind(this)}
                                    type={1}/> : null}
            </div>
        )
    }
}

export default StudentLayered;