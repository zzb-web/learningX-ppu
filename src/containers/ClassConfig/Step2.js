import React from 'react';
import Step2 from '../LayeredConfig/step3Config.js';
class ClassConfigStep2 extends React.Component{  
    constructor(props){
        super();
        this.state={
            schoolID : props.schoolID,
            grade : props.grade,
            msgClass : props.msgClass
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            schoolID : nextProps.schoolID,
            grade : nextProps.grade,
            msgClass : nextProps.msgClass
        })
    }
    render(){
        const {schoolID,grade,msgClass} = this.state;
        return(
            <Step2 schoolID={schoolID}
                    grade={grade}
                    msgClass={msgClass}
                    type={1}/>
        )
    }
}

export default ClassConfigStep2;