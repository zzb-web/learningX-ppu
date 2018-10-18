import React from 'react';
import {Select,Button,Table,Menu, Dropdown, Icon,Input} from 'antd';
import moment from 'moment';
const {Option} = Select;
class Step3 extends React.Component {
    state = {
        showModal : false,
        problemCode:'E',
        gradation:1,
        depth:1,
        height:500,
        name: '',
        level: '',
        object: '',
        epu: 0,
        problemMax: '',
        pageType: 'A4',
        problemSource : [],
        serviceType: '',
        serviceLauncher: '',
        serviceStartTime: (moment()/1000).valueOf(),
        serviceEndTime: (moment()/1000).valueOf(),
        serviceTimes: 0,
        serviceDuration: '',
        deliverType: '',
        deliverPriority: '',
        deliverTime: [{
            day: '',
            time:'',
        },{
            day: '',
            time:'',
        },{
            day: '',
            time:'',
        }],
        deliverExpected: '',
        price: '',
        subject: '',
        grade: '',
        // way : 0,
        problemCode_1:'E',
        gradation_1:1,
        depth_1:1,
        name_1: '', 
        level_1: '', 
        object_1: '',
        epu_1: 0,
        problemMax_1: '',
        pageType_1: 'A4',
        problemSource_1 : [],
        serviceType_1: '', 
        serviceLauncher_1: '',
        serviceStartTime_1: (moment()/1000).valueOf(),
        serviceEndTime_1: (moment()/1000).valueOf(),
        serviceTimes_1: 0, 
        serviceDuration_1: '', 
        deliverType_1: '', 
        deliverPriority_1: '',  
        deliverTime_1: [{
            day: '',  
            time:'', 
        },{
            day: '',
            time:'',
        },{
            day: '',
            time:'',
        }], 
        deliverExpected_1: '',
        price_1: '',
        subject_1: '',
        grade_1: '',
      }
      timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D;
    }
    componentWillMount(){
        this.setState({
            allProductId : this.props.data.allProductId,
            showDetail : this.props.data.showDetail,
            problemCode_1: this.props.data.productData_1.problemCode,
            gradation_1: this.props.data.productData_1.gradation,
            depth_1: this.props.data.productData_1.depth,
            name_1: this.props.data.productData_1.name,
            level_1: this.props.data.productData_1.level,
            object_1: this.props.data.productData_1.object,
            epu_1: this.props.data.productData_1.epu,
            problemMax_1: this.props.data.productData_1.problemMax,
            pageType_1: this.props.data.productData_1.pageType,
            problemSource_1 : this.props.data.productData_1.problemSource,
            serviceType_1: this.props.data.productData_1.serviceType,
            serviceLauncher_1: this.props.data.productData_1.serviceLauncher,
            serviceStartTime_1: this.props.data.productData_1.serviceStartTime,
            serviceEndTime_1: this.props.data.productData_1.serviceEndTime,
            serviceTimes_1: this.props.data.productData_1.serviceTimes,
            serviceDuration_1: this.props.data.productData_1.serviceDuration, 
            deliverType_1: this.props.data.productData_1.deliverType,
            deliverPriority_1: this.props.data.productData_1.deliverPriority, 
            deliverTime_1:this.props.data.productData_1.deliverTime,
            deliverExpected_1: this.props.data.productData_1.deliverExpected, 
            price_1 : this.props.data.productData_1.price,
            subject_1: this.props.data.productData_1.subject, 
            grade_1: this.props.data.productData_1.grade,
            status_1 : this.props.data.productData_1.status,
            productID_selected :  this.props.data.productID_selected,

            wrongProblemStatus_1 :this.props.data.productData_1.wrongProblemStatus,
            problemType_1 : this.props.data.productData_1.problemType,
            sameTypeMax_1:this.props.data.productData_1.sameTypeMax,
            sameTypeSource_1 :this.props.data.productData_1.sameTypeSource,
            columnCount_1: this.props.data.productData_1.columnCount ,
            borderControl_1: this.props.data.productData_1.borderControl,
            exceptionHandler_1 : this.props.data.productData_1.exceptionHandler,

            curProductID :this.props.data.curProductID,
            problemCode: this.props.data.productData.problemCode,
            gradation: this.props.data.productData.gradation,
            depth: this.props.data.productData.depth,
            name: this.props.data.productData.name,
            level: this.props.data.productData.level,
            object: this.props.data.productData.object,
            epu: this.props.data.productData.epu,
            problemMax: this.props.data.productData.problemMax,
            pageType: this.props.data.productData.pageType,
            problemSource : this.props.data.productData.problemSource,
            serviceType: this.props.data.productData.serviceType,
            serviceLauncher: this.props.data.productData .serviceLauncher,
            serviceStartTime: this.props.data.productData.serviceStartTime,
            serviceEndTime: this.props.data.productData.serviceEndTime,
            serviceTimes: this.props.data.productData.serviceTimes,
            serviceDuration: this.props.data.productData.serviceDuration, 
            deliverType: this.props.data.productData.deliverType,
            deliverPriority: this.props.data.productData.deliverPriority, 
            deliverTime:this.props.data.productData.deliverTime,
            deliverExpected: this.props.data.productData.deliverExpected, 
            price : this.props.data.productData.price,
            subject: this.props.data.productData.subject, 
            grade: this.props.data.productData.grade,
            status : this.props.data.productData.status,

            wrongProblemStatus :this.props.data.productData.wrongProblemStatus,
            problemType : this.props.data.productData.problemType,
            sameTypeMax:this.props.data.productData.sameTypeMax,
            sameTypeSource :this.props.data.productData.sameTypeSource,
            columnCount: this.props.data.productData.columnCount ,
            borderControl: this.props.data.productData.borderControl,
            exceptionHandler : this.props.data.productData.exceptionHandler,

            showNew : this.props.data.showNew,
            showCur : this.props.data.showCur,
            type : this.props.data.type,

            nums : this.props.data.nums,
            unConfig : this.props.data.unConfig
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            allProductId : nextProps.data.allProductId,
            showDetail : nextProps.data.showDetail,
            problemCode_1: nextProps.data.productData_1.problemCode,
            gradation_1: nextProps.data.productData_1.gradation,
            depth_1: nextProps.data.productData_1.depth,
            name_1: nextProps.data.productData_1.name,
            level_1: nextProps.data.productData_1.level,
            object_1: nextProps.data.productData_1.object,
            epu_1: nextProps.data.productData_1.epu,
            problemMax_1: nextProps.data.productData_1.problemMax,
            pageType_1: nextProps.data.productData_1.pageType,
            problemSource_1 : nextProps.data.productData_1.problemSource,
            serviceType_1: nextProps.data.productData_1.serviceType,
            serviceLauncher_1: nextProps.data.productData_1.serviceLauncher,
            serviceStartTime_1: nextProps.data.productData_1.serviceStartTime,
            serviceEndTime_1: nextProps.data.productData_1.serviceEndTime,
            serviceTimes_1: nextProps.data.productData_1.serviceTimes,
            serviceDuration_1: nextProps.data.productData_1.serviceDuration, 
            deliverType_1: nextProps.data.productData_1.deliverType,
            deliverPriority_1: nextProps.data.productData_1.deliverPriority, 
            deliverTime_1:nextProps.data.productData_1.deliverTime,
            deliverExpected_1: nextProps.data.productData_1.deliverExpected, 
            price_1 : nextProps.data.productData_1.price,
            subject_1: nextProps.data.productData_1.subject, 
            grade_1: nextProps.data.productData_1.grade,
            status_1 : nextProps.data.productData_1.status,
            productID_selected : nextProps.data.productID_selected,

            wrongProblemStatus_1 :nextProps.data.productData_1.wrongProblemStatus,
            problemType_1 : nextProps.data.productData_1.problemType,
            sameTypeMax_1:nextProps.data.productData_1.sameTypeMax,
            sameTypeSource_1 :nextProps.data.productData_1.sameTypeSource,
            columnCount_1: nextProps.data.productData_1.columnCount ,
            borderControl_1: nextProps.data.productData_1.borderControl,
            exceptionHandler_1 : nextProps.data.productData_1.exceptionHandler,

            curProductID : nextProps.data.curProductID,
            problemCode: nextProps.data.productData.problemCode,
            gradation: nextProps.data.productData.gradation,
            depth: nextProps.data.productData.depth,
            name: nextProps.data.productData.name,
            level: nextProps.data.productData.level,
            object: nextProps.data.productData.object,
            epu: nextProps.data.productData.epu,
            problemMax: nextProps.data.productData.problemMax,
            pageType: nextProps.data.productData.pageType,
            problemSource : nextProps.data.productData.problemSource,
            serviceType: nextProps.data.productData.serviceType,
            serviceLauncher: nextProps.data.productData .serviceLauncher,
            serviceStartTime: nextProps.data.productData.serviceStartTime,
            serviceEndTime: nextProps.data.productData.serviceEndTime,
            serviceTimes: nextProps.data.productData.serviceTimes,
            serviceDuration: nextProps.data.productData.serviceDuration, 
            deliverType: nextProps.data.productData.deliverType,
            deliverPriority: nextProps.data.productData.deliverPriority, 
            deliverTime:nextProps.data.productData.deliverTime,
            deliverExpected: nextProps.data.productData.deliverExpected, 
            price : nextProps.data.productData.price,
            subject: nextProps.data.productData.subject, 
            grade: nextProps.data.productData.grade,
            status : nextProps.data.productData.status,

            wrongProblemStatus :nextProps.data.productData.wrongProblemStatus,
            problemType : nextProps.data.productData.problemType,
            sameTypeMax:nextProps.data.productData.sameTypeMax,
            sameTypeSource :nextProps.data.productData.sameTypeSource,
            columnCount: nextProps.data.productData.columnCount ,
            borderControl: nextProps.data.productData.borderControl,
            exceptionHandler : nextProps.data.productData.exceptionHandler,

            showNew : nextProps.data.showNew,
            showCur : nextProps.data.showCur,
            type : nextProps.data.type,

            nums : nextProps.data.nums,
            unConfig : nextProps.data.unConfig
        })
    }

    render(){
        const {nums,unConfig} = this.state;
        unConfig.sort((a,b)=>a-b)
        let children = [];
        for(let i=1;i<=nums;i++){
            children.push(
                <Option value={i}>{i}</Option>
            )
        }
        const {problemCode,gradation,depth,name,level,object,epu,problemMax,pageType,problemSource ,serviceType,serviceLauncher,
            serviceStartTime,serviceEndTime,deliverType,deliverPriority,deliverTime,
            deliverExpected,price,subject,grade,allProductId,curProductID,status,showNew,showCur,showDetail,wrongProblemStatus,problemType,sameTypeMax,sameTypeSource,
            columnCount,borderControl,exceptionHandler} = this.state
            const {problemCode_1,gradation_1,depth_1,name_1,level_1,object_1,epu_1,problemMax_1,pageType_1,problemSource_1 ,serviceType_1,serviceLauncher_1,
                serviceStartTime_1,serviceEndTime_1,deliverType_1,deliverPriority_1,deliverTime_1,
                deliverExpected_1,price_1,subject_1,grade_1,status_1,productID_selected,type,wrongProblemStatus_1,problemType_1,sameTypeMax_1,sameTypeSource_1,
                columnCount_1,borderControl_1,exceptionHandler_1} = this.state;
            const EPUs = ['EPU1','EPU2','EPU3']
            const gradations = ['第1层 题目','第2层 过程','第3层 引导'];
            const depths = ['第1代 错题','第2代 类型','第3代 考试'];
            const weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            const errStatus = ['现在仍错的题','曾经错过的题'];
            const handles = ['全部标记为√再生成','全部标记为×再生成','不生成'];
            let deliverTimeMsg = '';
        deliverTime.map((item,index)=>{
            if(item.day !== '' && item.time !== ''){
            deliverTimeMsg =deliverTimeMsg +`${weeks[item.day]}_${item.time} `;
            }
        })
        let deliverTimeMsg_1 = '';
        deliverTime_1.map((item,index)=>{
            if(item.day !== '' && item.time !== ''){
            deliverTimeMsg_1 =deliverTimeMsg_1 +`${weeks[item.day]}_${item.time} `;
            }
        })

        let deliverMsg = '';
        if(deliverType === '立即交付'){
            deliverMsg = `交付优先:第0`
        }else if(deliverType === '节点交付'){
            deliverMsg = `交付优先:第${deliverPriority}/交付节点:${deliverTimeMsg}`
        }else{
            deliverMsg = `交付优先:第${deliverPriority}/交付预期:${deliverExpected}小时以内`
        }

        let deliverMsg_1 = '';
        if(deliverType_1 === '立即交付'){
            deliverMsg_1 = `交付优先:第0`
        }else if(deliverType_1 === '节点交付'){
            deliverMsg_1 = `交付优先:第${deliverPriority_1}/交付节点:${deliverTimeMsg_1}`
        }else{
            deliverMsg_1 = `交付优先:第${deliverPriority_1}/交付预期:${deliverExpected_1}小时以内`
        }
        
        return(
                <div>
                    {
                        type === 0 ? <div>
                                            <div>
                                                <span>层级序号:</span>
                                                <Select style={{width:300,marginLeft:20}}
                                                        onChange={this.props.selectLevel}>
                                                    {children}
                                                </Select>
                                                <Button type='primary' 
                                                        style={{width:120,marginLeft:50}}
                                                        onClick={this.props.toConfig}>去配置</Button>
                                                {
                                                    unConfig.length !== 0 ?<span style={{marginLeft:20}}>第{`${unConfig}`}层级未配置</span>:null
                                                }
                                            </div>
                                            <div className='line'></div>
                                         </div> : null
                    }
                    {
                                showDetail ? <div style={{width:'100%',height:400,marginTop:30}}>
                                    <div className='person-box'>
                                        <div className='person-title'>在用产品</div>
                                        <div className='person-content'>
                                            <div className='person-select'>
                                                <span>产品编号:</span>
                                                <Input disabled 
                                                       value={curProductID}
                                                       style={{width:160,marginLeft:20}}/>
                                            </div>
                                            <div className='person-detail'>
                                                <div style={{float:'left'}}>产品详情</div>
                                                {showCur ? 
                                                <div className='person-msg'>
                                                    <div>服务状态:{status?<span style={{color:'#48D61D'}}>运行</span>:<span style={{color:'#FF3547'}}>停止</span>}</div>
                                                    <div><span>问题:错题学习</span></div>
                                                    <div>{`层次:${gradations[gradation-1]}`}</div>
                                                    <div>{`深度:${depths[depth-1]}`}</div>
                                                    <div>{`总体:产品名称:${name}/产品级别:${level}/产品对象:${object}`}</div>
                                                    {
                                                        epu === 3 ? <div>{`处理器:EPU:${EPUs[epu-1]}/题量控制:${problemMax}/错题状态:${errStatus[wrongProblemStatus-1]}
                                                        /题目种类:${problemType}/同类题量:${sameTypeMax}/同类来源:${sameTypeSource}`}</div>:
                                                        <div>{`处理器:EPU:${EPUs[epu-1]}/题量控制:${problemMax}/纸张大小:${pageType}`}</div>
                                                    }
                                                    <div>{`错题源:${problemSource}`}</div>
                                                    {
                                                        epu === 3 ? <div>{`文档形式:纸张大小:${pageType}/分数栏:${columnCount}/边界控制:${borderControl}`}</div> : null
                                                    }
                                                    <div>{`服务:服务类型:${serviceType}/服务发起:${serviceLauncher}/
                                服务时段:${this.timestampToTime(serviceStartTime)}~${this.timestampToTime(serviceEndTime)}`}</div>
                                                    <div>{`文档交付:交付类型:${deliverType}/${deliverMsg}`}</div>
                                                    {
                                                        epu === 3 ? <div>{`异常处理:${handles[exceptionHandler-1]}`}</div> : null
                                                    }
                                                    <div>{`价格:${price}元`}</div>
                                                    <div>{`其他信息:学科:${subject}/年级:${grade}`}</div>
                                                </div> : <div className='person-msg'></div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='personBox'>
                                        <div className='person-title'>配置新品</div>
                                        <div className='person-content'>
                                        <div className='person-select'>
                                            <span>产品编号:</span>
                                            <Select style={{width:160,marginLeft:20}}
                                                    combobox
                                                    value={productID_selected}
                                                    onChange={this.props.configureChange}>
                                                {
                                                    allProductId.map((item,index)=>
                                                    <Option key={index} value={item}>{item}</Option>
                                                )
                                                }
                                            </Select>
                                            </div>
                                            <div className='person-detail'>
                                                <div style={{float:'left'}}>产品详情</div>
                                                { showNew ? 
                                                <div className='person-msg'>
                                                    <div>服务状态:{status_1?<span style={{color:'#48D61D'}}>运行</span>:<span style={{color:'#FF3547'}}>停止</span>}</div>
                                                    <div><span>问题:错题学习</span></div>
                                                    <div>{`层次:${gradations[gradation_1-1]}`}</div>
                                                    <div>{`深度:${depths[depth_1-1]}`}</div>
                                                    <div>{`总体:产品名称:${name_1}/产品级别:${level_1}/产品对象:${object_1}`}</div>
                                                    {
                                                        epu_1 === 3 ? <div>{`处理器:EPU:${EPUs[epu_1-1]}/题量控制:${problemMax_1}/错题状态:${errStatus[wrongProblemStatus_1-1]}
                                                        /题目种类:${problemType_1}/同类题量:${sameTypeMax_1}/同类来源:${sameTypeSource_1}`}</div>:
                                                        <div>{`处理器:EPU:${EPUs[epu_1-1]}/题量控制:${problemMax_1}/纸张大小:${pageType_1}`}</div>
                                                    }
                                                    <div>{`错题源:${problemSource_1}`}</div>
                                                    {
                                                        epu_1 === 3 ? <div>{`文档形式:纸张大小:${pageType_1}/分数栏:${columnCount_1}/边界控制:${borderControl_1}`}</div> : null
                                                    }
                                                    <div>{`服务:服务类型:${serviceType_1}/服务发起:${serviceLauncher_1}/
                                服务时段:${this.timestampToTime(serviceStartTime_1)}~${this.timestampToTime(serviceEndTime_1)}`}</div>
                                                    <div>{`文档交付:交付类型:${deliverType_1}/${deliverMsg_1}`}</div>
                                                    {
                                                        epu_1 === 3 ? <div>{`异常处理:${handles[exceptionHandler_1-1]}`}</div> : null
                                                    }
                                                    <div>{`价格:${price_1}元`}</div>
                                                    <div>{`其他信息:学科:${subject_1}/年级:${grade_1}`}</div>
                                                </div> : <div className='person-msg'></div>
                                            }
                                                <Button type='primary'
                                                        style={{width:120,marginTop:20,float:'right'}}
                                                        onClick={this.props.submitHandle}
                                                        >提交</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div> : null
                            }
                </div>
        )
    }
}

export default Step3;