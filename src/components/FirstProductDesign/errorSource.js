import React from 'react';
import {InputNumber,Select} from 'antd';
const {Option} = Select;
class ErrorSource extends React.Component{
    state={
        selectStatus : [false,false,false,false]
    }
    componentWillMount(){
        const {selectStatus} = this.state;
        const {problemSource,epu,depth} = this.props.data;
        if(problemSource.indexOf('课本') !==-1){
            selectStatus[0] = true
        }
        if(problemSource.indexOf('普通教辅书') !==-1){
            selectStatus[1] = true
        }
        if(problemSource.indexOf('平时试卷') !==-1){
            selectStatus[2] = true
        }
        if(problemSource.indexOf('纠错本') !==-1){
            selectStatus[3] = true
        }
        this.setState({
            selectStatus : selectStatus,
            epu : epu,
            depth : depth
        })
    }
    componentWillReceiveProps(nextProps){
        const {selectStatus} = this.state;
        const {problemSource,epu,depth} = nextProps.data;
        if(problemSource.indexOf('课本') !==-1){
            selectStatus[0] = true
        }
        if(problemSource.indexOf('普通教辅书') !==-1){
            selectStatus[1] = true
        }
        if(problemSource.indexOf('平时试卷') !==-1){
            selectStatus[2] = true
        }
        if(problemSource.indexOf('纠错本') !==-1){
            selectStatus[3] = true
        }
        this.setState({
            selectStatus : selectStatus,
            epu : epu,
            depth : depth
        })
    }

    errMark(index){
        let {selectStatus} = this.state;
        selectStatus[index] = !selectStatus[index]
        this.setState({
            selectStatus : selectStatus
        })
        let errMark = [selectStatus[0]?'课本':'',selectStatus[1]?'普通教辅书':'',selectStatus[2]?'平时试卷':'',selectStatus[3]?'纠错本':''];
        let newArr = [];
        errMark.map((item,index)=>{
            if(item !== ''){
                newArr.push(item)
            }
        })
        this.props.errMark(newArr)
    }
    render(){
        const {selectStatus,epu,depth} = this.state;
        let errMark;
        if(depth === 2 && epu === 3){
            errMark = ['课本','普通教辅书','平时试卷','纠错本'];
        }else{
            errMark = ['课本','普通教辅书','平时试卷'];
        }

        const children = [];
        errMark.map((item,index)=>{
            children.push(
                <div className={epu === 3 && depth === 2 ? 'err-mark-1':'err-mark'}
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