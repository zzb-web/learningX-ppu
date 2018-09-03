import React from 'react';
import {InputNumber,Select} from 'antd';
const {Option} = Select;
class ErrorSource extends React.Component{
    state={
        selectStatus : [false,false,false]
    }
    componentWillMount(){
        const {selectStatus} = this.state;
        const {problemSource} = this.props.data;
        if(problemSource.indexOf('课本') !==-1){
            selectStatus[0] = true
        }
        if(problemSource.indexOf('普通教辅书') !==-1){
            selectStatus[1] = true
        }
        if(problemSource.indexOf('平时试卷') !==-1){
            selectStatus[2] = true
        }
        this.setState({
            selectStatus : selectStatus
        })
    }
    componentWillReceiveProps(nextProps){
        const {selectStatus} = this.state;
        const {problemSource} = nextProps.data;
        if(problemSource.indexOf('课本') !==-1){
            selectStatus[0] = true
        }
        if(problemSource.indexOf('普通教辅书') !==-1){
            selectStatus[1] = true
        }
        if(problemSource.indexOf('平时试卷') !==-1){
            selectStatus[2] = true
        }
        this.setState({
            selectStatus : selectStatus
        })
    }

    errMark(index){
        let {selectStatus} = this.state;
        selectStatus[index] = !selectStatus[index]
        this.setState({
            selectStatus : selectStatus
        })
        let errMark = [selectStatus[0]?'课本':'',selectStatus[1]?'普通教辅书':'',selectStatus[2]?'平时试卷':''];
        let newArr = [];
        errMark.map((item,index)=>{
            if(item !== ''){
                newArr.push(item)
            }
        })
        this.props.errMark(newArr)
    }
    render(){
        const {selectStatus} = this.state;
        const errMark = ['课本','普通教辅书','平时试卷'];
        const children = [];
        errMark.map((item,index)=>{
            children.push(
                <div className='err-mark' 
                     style={selectStatus[index] ? {backgroundColor:'#0099FF',color:'#fff'}:{backgroundColor:'#fff',color:'#000'}}
                     key={index}
                     onClick={this.errMark.bind(this,index)}>{item}</div>
            )
        })
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>错题源:</div>
                <div className='title-3-content'>
                   <div className='error-source'>
                        {children}
                   </div>
                </div>
            </div>
        )
    }
}

export default ErrorSource;