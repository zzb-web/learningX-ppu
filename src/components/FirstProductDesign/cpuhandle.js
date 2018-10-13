import React from 'react';
import {InputNumber,Select} from 'antd';
import Mark from '../../containers/FirstProductDesign/mark.js';
const {Option} = Select;
class Cpu extends React.Component{
    constructor(props){
        super();
        this.state={
            epu: props.data.epu,
            problemMax: props.data.problemMax,
            pageType: props.data.pageType,
            depth : props.data.depth,
            wrongProblemStatus : props.data.wrongProblemStatus,
            problemType : props.data.problemType,
            sameTypeMax : props.data.sameTypeMax,
            sameTypeSource : props.data.sameTypeSource,
            selectStatus : [false,false,false],
            selectStatus_2 : [false,false,false],
        }
    }
    compnentWillMount(){
        let {problemType,sameTypeSource} = this.props.data;
        let {selectStatus,selectStatus_2} = this.state;
        if(problemType.indexOf('错题') !==-1){
            selectStatus[0] = true
        }
        if(problemType.indexOf('同类型题') !==-1){
            selectStatus[1] = true
        }
        if(problemType.indexOf('培优题') !==-1){
            selectStatus[2] = true
        }
        if(sameTypeSource.indexOf('在用书本资料') !==-1){
            selectStatus_2[0] = true
        }
        if(sameTypeSource.indexOf('做过的试卷') !==-1){
            selectStatus_2[1] = true
        }
        if(sameTypeSource.indexOf('外部题目') !==-1){
            selectStatus_2[2] = true
        }
        this.setState({
            selectStatus :selectStatus,
            selectStatus_2 : selectStatus_2
        })
    }
    componentWillReceiveProps(nextProps){
        let {problemType,sameTypeSource} = nextProps.data;
        let {selectStatus,selectStatus_2} = this.state;
        if(problemType.indexOf('错题') !==-1){
            selectStatus[0] = true
        }
        if(problemType.indexOf('同类型题') !==-1){
            selectStatus[1] = true
        }
        if(problemType.indexOf('培优题') !==-1){
            selectStatus[2] = true
        }

        if(sameTypeSource.indexOf('在用书本资料') !==-1){
            selectStatus_2[0] = true
        }
        if(sameTypeSource.indexOf('做过的试卷') !==-1){
            selectStatus_2[1] = true
        }
        if(sameTypeSource.indexOf('外部题目') !==-1){
            selectStatus_2[2] = true
        }
        this.setState({
            epu: nextProps.data.epu,
            problemMax: nextProps.data.problemMax,
            pageType: nextProps.data.pageType,
            depth : nextProps.data.depth,
            wrongProblemStatus : nextProps.data.wrongProblemStatus,
            problemType : problemType,
            sameTypeMax : nextProps.data.sameTypeMax,
            sameTypeSource : nextProps.data.sameTypeSource,
            selectStatus : selectStatus,
            selectStatus_2 : selectStatus_2
        })
    }

    topicTypeMark(index){
        let {selectStatus} = this.state;
        selectStatus[index] = !selectStatus[index]
        this.setState({
            selectStatus : selectStatus
        })
        let problemType = [selectStatus[0]?'错题':'',selectStatus[1]?'同类型题':'',selectStatus[2]?'培优题':''];
        let newArr = [];
        problemType.map((item,index)=>{
            if(item !== ''){
                newArr.push(item)
            }
        })
        this.props.problemTypeHandle(newArr)
    }

    
    sameSourceMark(index){
        let {selectStatus_2} = this.state;
        selectStatus_2[index] = !selectStatus_2[index]
        this.setState({
            selectStatus_2 : selectStatus_2
        })
        let sameTypeSource = [selectStatus_2[0]?'在用书本资料':'',selectStatus_2[1]?'做过的试卷':'',selectStatus_2[2]?'外部题目':''];
        let newArr = [];
        sameTypeSource.map((item,index)=>{
            if(item !== ''){
                newArr.push(item)
            }
        })
        this.props.sameTypeSourceHandle(newArr)
    }

    render(){
        const {epu,problemMax,pageType,depth,selectStatus,selectStatus_2,wrongProblemStatus,sameTypeMax} = this.state;
        let EPU;
        if(depth === 2){
            EPU = ['EPU1','EPU2','EPU3']
        }else{
            EPU = ['EPU1','EPU2']
        }
        
        const papers = ['A3','A4'];
        const errStatus = ['现在仍错的题','曾经错过的题'];
        const sameTopic = [1,2,3,4,5]
        const topicType = ['错题','同类型题','培优题'];
        const sameSource = ['在用书本资料','做过的试卷','外部题目'];
        const topicTypeChildren = [];
        const sameSourceChildren = [];
        topicType.map((item,index)=>{
            topicTypeChildren.push(
                <span className='multiOne' 
                     style={selectStatus[index] ? {backgroundColor:'#0099FF',color:'#fff'}:{backgroundColor:'#fff',color:'#000'}}
                     key={index}
                     onClick={this.topicTypeMark.bind(this,index)}>{item}</span>
            )
        })
        sameSource.map((item,index)=>{
            sameSourceChildren.push(
                <span className='multiOne' 
                     style={selectStatus_2[index] ? {backgroundColor:'#0099FF',color:'#fff'}:{backgroundColor:'#fff',color:'#000'}}
                     key={index}
                     onClick={this.sameSourceMark.bind(this,index)}>{item}</span>
            )
        })
        return(
            <div style={epu === 3&& depth===2 ? {width:'100%',height:150,marginTop:20}:{width:'100%',height:100,marginTop:20}}>
                <div className={epu === 3 && depth===2 ? 'title-5':'title-3'}>处理器:</div>
                <div className={epu === 3 && depth===2 ? 'title-4-content' : 'title-3-content'}>
                    <div className={epu === 3&& depth===2 ? 'service-content' : ''}>
                        <span className='title-4'>EPU:</span>
                        <Select style={{width:'20%',marginLeft:10}} 
                            placeholder=''
                            value={EPU[epu-1]}
                            onChange={this.props.epuHandle}
                            >
                            {
                                EPU.map((item,index)=>
                                    <Option value={item} key={index}>{item}</Option>
                                )
                            }
                        </Select>

                        <span className='title-4' style={{marginLeft:30}}>题量控制:</span>
                        <InputNumber style={{width:'20%',marginLeft:10}} 
                                    onChange={this.props.topicHandle}
                                    value={problemMax}
                                    placeholder=''/>
                        {epu !== 3 || depth !==2 ? <span>
                            <span className='title-4' style={{marginLeft:30}}>纸张大小:</span>
                            <Select style={{width:'20%',marginLeft:10}} 
                                placeholder=''
                                value={pageType}
                                onChange={this.props.paperHandle}
                                >
                                {
                                    papers.map((item,index)=>
                                        <Option value={item} key={index}>{item}</Option>
                                    )
                                }
                            </Select>
                        </span> : null
                        }
                    </div>
                    {
                        epu === 3&& depth===2 ? <div className='service-content'>
                                        <span className='title-4'>错题状态:</span>
                                            <Select style={{width:'20%',marginLeft:10}} 
                                                placeholder=''
                                                value={errStatus[wrongProblemStatus-1]}
                                                onChange={this.props.errStatusHandle}
                                                >
                                                {
                                                   errStatus.map((item,index)=>
                                                        <Option value={index+1} key={index}>{item}</Option>
                                                    )
                                                }
                                        </Select>
                                        
                                        <span className='title-4' style={{marginLeft:30}}>题目种类:</span>
                                        <span className='multiBox' style={{marginLeft:10}}>
                                            {topicTypeChildren}
                                        </span>
                                        

                                    </div> : null
                    }
                    {
                        epu === 3&& depth===2 ? <div className='service-content'>
                                        <span className='title-4'>同类题量:</span>
                                            <Select style={{width:'20%',marginLeft:10}} 
                                                placeholder=''
                                                value={sameTypeMax}
                                                onChange={this.props.sameTypeMaxHandle}
                                                >
                                                {
                                                   sameTopic.map((item,index)=>
                                                        <Option value={item} key={index}>{item}</Option>
                                                    )
                                                }
                                        </Select>

                                        <span className='title-4' style={{marginLeft:30}}>同类来源:</span>
                                        <span className='multiBox' style={{marginLeft:10}}>
                                            {sameSourceChildren}
                                        </span>
                                    </div> : null
                    }
                </div>
            </div>
        )
    }
}

export default Cpu;