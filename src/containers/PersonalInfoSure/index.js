import React from 'react';
import PersonalInfoSureComponent from '../../components/PersonalInfoSure/index.js';
import {Get} from '../../fetch/data.js';
class PersonalInfoSure extends React.Component{
    state={
        learnID : '',
        msg : '',
        showDetail : false,
        showSecond : false
    }
    makeSure(){
        const {learnID} = this.state;
        Get(`/api/v3/staffs/students/${learnID}/`).then(resp=>{
           if(resp.status === 200){
            this.setState({
                msg : resp.data,
                showDetail : true,
                showSecond: false
            })
           }
        })
    }
    getLearnId(value){
        this.setState({
            learnID : value
        })
    }
    toConfigure(){
        this.setState({
            showDetail : false,
            showSecond : true
        })
    }
    render(){
        return(
            <PersonalInfoSureComponent makeSure={this.makeSure.bind(this)}
                                       getLearnId={this.getLearnId.bind(this)}
                                       toConfigure={this.toConfigure.bind(this)}
                                       data = {this.state}
                                       />
        )
    }
}
export default PersonalInfoSure;