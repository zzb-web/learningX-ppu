import React from 'react';
import Step2 from '../../components/ClassConfig/Step2.js';
class ClassConfigStep2 extends React.Component{  
    constructor(props){
        super();
        this.state={
            schoolID : props.schoolID,
            grade : props.grade,
            msgClass : props.msgClass,
            allProductId : props.allProductId,
            curProductID : props.curProductID
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            schoolID : nextProps.schoolID,
            grade : nextProps.grade,
            msgClass : nextProps.msgClass,
            allProductId : nextProps.allProductId,
            curProductID : nextProps.curProductID
        })
    }

    render(){
        return(
            <Step2 data={this.state}/>
        )
    }
}

export default ClassConfigStep2;