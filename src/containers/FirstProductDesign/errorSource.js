import React from 'react';
import {InputNumber,Select} from 'antd';
import ErrorSourceComponent from '../../components/FirstProductDesign/errorSource.js';
const {Option} = Select;
class ErrorSource extends React.Component{
    errMark(value){
        this.props.errorSourceHandle(value)
    }
    render(){
        return(
            <div>
                <ErrorSourceComponent errMark={this.errMark.bind(this)}/>
            </div>
        )
    }
}

export default ErrorSource;