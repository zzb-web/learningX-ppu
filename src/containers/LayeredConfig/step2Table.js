import React from "react";
import {Row,Col} from 'antd';
import Step2Component from '../../components/LayeredConfig/step2Table.js'
import {Get} from '../../fetch/data.js'
export default class Step2 extends React.Component{
    state={
        nums : 0
    }
    newHandle(value){
        this.setState({
            nums : Number(value.key),
        })
        this.props.getNums(Number(value.key))
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            nums : nextProps.nums,
        })
    }
    everyChange(index,value){
        const {students,updateMsg} = this.props;
        const learnIDs = students.learnIDs;
        // 更新层级信息
        updateMsg[learnIDs[index].learnID] = value;
        this.props.updateMsgHandle(updateMsg)

        students.learnIDs[index].newLevel = value;

        this.setState({
            students : students
        })
    }
    render(){
        const {nums} = this.state
        let showNew = false;
        if(nums > 0){
            showNew = true
        }
        return(
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Step2Component students={this.props.students}
                                    type={this.props.type}
                                    totalLevel={this.props.totalLevel}
                                    showNew={showNew}
                                    nums={nums}
                                    newHandle={this.newHandle.bind(this)}
                                    everyChange={this.everyChange.bind(this)}
                                    toStep3={this.props.toStep3}
                                    step2SureHandle={this.props.step2SureHandle}/>
                </Col>
                <Col span={1}></Col>
            </Row>
        )
    }
}