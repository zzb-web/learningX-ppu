import React from 'react';
import ClassConfigStep1 from './Step1.js';
import ClassConfigStep2 from "./Step2.js";
class ClassConfig extends React.Component{
    state={
        showStep1 : true,
        showStep2 : false,
        schoolID : '',
        grade : '',
        msgClass : ''
    }
    toConfig(schoolID,grade,msgClass){
        this.setState({
            showStep1 : false,
            showStep2 : true,
            schoolID : schoolID,
            grade : grade,
            msgClass : msgClass
        })
    }
    render(){
        const {showStep1,showStep2,schoolID,grade,msgClass} = this.state;
        return(
            <div>
                {showStep1 ? <ClassConfigStep1 toConfig={this.toConfig.bind(this)}/> : null}
                {showStep2 ? <ClassConfigStep2 schoolID={schoolID}
                                                grade={grade}
                                                msgClass={msgClass}/> : null}
            </div>
        )
    }
}

export default ClassConfig;