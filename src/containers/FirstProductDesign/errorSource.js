import React from 'react';
import {InputNumber,Select} from 'antd';
import ErrorSourceComponent from '../../components/FirstProductDesign/errorSource.js';
const {Option} = Select;
class ErrorSource extends React.Component{
    constructor(props){
        super();
        this.state={
            problemSource : props.problemSource,
            epu : props.epu,
            depth : props.depth
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            problemSource : nextProps.problemSource,
            epu : nextProps.epu,
            depth : nextProps.depth
        })
    }
    errMark(value){
        this.props.errorSourceHandle(value)
    }
    render(){
        return(
            <div>
                <ErrorSourceComponent errMark={this.errMark.bind(this)}
                                        data = {this.state}/>
            </div>
        )
    }
}

export default ErrorSource;