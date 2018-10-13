import React from 'react';
import AbnormalHandleComponent from '../../components/FirstProductDesign/abnormalHandle.js';
class AbnormalHandle extends React.Component{
    constructor(props){
        super();
        this.state={
            exceptionHandler : props.exceptionHandler
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            exceptionHandler : nextProps.exceptionHandler
        })
    }
    abnormalHandle(value){
        this.setState({
            subject : value+1
        })
        this.props.abnormalHandle(value+1)
    }
    render(){
        return(
            <div>
                <AbnormalHandleComponent 
                                   abnormalHandle={this.abnormalHandle.bind(this)}
                                   data={this.state}/>
            </div>
        )
    }
}

export default AbnormalHandle;