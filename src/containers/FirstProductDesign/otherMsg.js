import React from 'react';
import OtherMsgComponent from '../../components/FirstProductDesign/otherMsg.js';
class OtherMsg extends React.Component{
    state={
        subject: '',
        grade: '',
    }
    subjectHandle(value){
        this.setState({
            subject : value
        })
        const {grade} = this.state;
        this.props.otherMsgHandle([value,grade])
    }
    gradeHandle(value){
        this.setState({
            grade : value
        })
        const {subject} = this.state;
        this.props.otherMsgHandle([subject,value])
    }
    render(){
        return(
            <div>
                <OtherMsgComponent subjectHandle={this.subjectHandle.bind(this)}
                                   gradeHandle={this.gradeHandle.bind(this)}/>
            </div>
        )
    }
}

export default OtherMsg;