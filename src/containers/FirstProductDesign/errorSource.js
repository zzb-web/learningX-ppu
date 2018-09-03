import React from 'react';
import {InputNumber,Select} from 'antd';
import ErrorSourceComponent from '../../components/FirstProductDesign/errorSource.js';
const {Option} = Select;
class ErrorSource extends React.Component{
    constructor(props){
        super();
        this.state={
            problemSource : props.problemSource
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            problemSource : nextProps.problemSource
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