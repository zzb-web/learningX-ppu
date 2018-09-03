import React from 'react';
import OtherMsgComponent from '../../components/FirstProductDesign/otherMsg.js';
class OtherMsg extends React.Component{
    constructor(props){
        super();
        this.state={
            subject : props.subject,
            grade : props.grade
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            subject : nextProps.subject,
            grade : nextProps.grade
        })
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
                                   gradeHandle={this.gradeHandle.bind(this)}
                                   data={this.state}/>
            </div>
        )
    }
}

export default OtherMsg;