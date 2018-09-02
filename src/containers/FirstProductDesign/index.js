import React from 'react';
import {Col,Row,TreeSelect} from 'antd';
import Mark from './mark.js';
import Population from './population.js';
import Cpu from './cpuhandle.js';
import ErrorSource from './errorSource.js';
import Service from './service.js';
import DocDelivery from './docDelivery.js';
import Price from './price.js';
import OtherMsg from './otherMsg.js';
import AddService from './addService.js';
import Detail from './detail.js';
import {Post,Get} from '../../fetch/data.js';
class FirstProductDesign extends React.Component{
    state = {
        problemCode:'E',
        gradation:1,
        depth:1,
        height:500,
        name: '',  // 产品名称
        level: '',  // 产品级别
        object: '',  // 产品对象
        epu: 0,  // EPU, 1 2
        problemMax: '',  // 题量控制
        pageType: 'A4',    // 纸张类型，"A3"或者"A4"、
        problemSource : [],
        serviceType: '',  // 服务类型
        serviceLauncher: '',  // 服务发起
        serviceStartTime: '',  // 服务开始时间, unix时间戳
        serviceEndTime: '',  // 服务结束时间, unix时间戳
        serviceTimes: 0,  // 服务次数
        serviceDuration: '',  // 服务时长
        deliverType: '',  // 交付类型
        deliverPriority: 0,  // 交付优先级
        deliverTime: [{
            day: '',  // 周日0,周一到周六分别是1到6,
            time:'',  // 时间，格式按照"08:00:00"
        },{
            day: '',  // 周日0,周一到周六分别是1到6,
            time:'',  // 时间，格式按照"08:00:00"
        },{
            day: '',  // 周日0,周一到周六分别是1到6,
            time:'',  // 时间，格式按照"08:00:00"
        }],   // 交付节点
        deliverExpected: 0,  // 交付预期，预期多少小时内
        price: 0,  // 单价
        subject: '',  // 学科
        grade: '',  // 年级（全部直接用“全部”
        way : 0,
        productID : ''
      }
    markClick(value){   
        let type = value[0];
        let val = value[1];
        switch(type){
            case '问题':
            this.setState({problemCode:'E'});
            break;
            case '层次':
            this.setState({gradation:val+1});
            break;
            case '深度':
            this.setState({depth:val+1});
            break;
            default:
            break;
        }
    }
    populationHandle(value){
        this.setState({
            name : value[0],
            level : value[1],
            object : value[2]
        })
    }
    cpuHandle(value){
        this.setState({
            epu: value[0],
            problemMax: value[1],
            pageType: value[2]
        })
    }
    errorSourceHandle(value){
        this.setState({
            problemSource : value
        })
    }
    serviceHandle(value){
        this.setState({
            serviceType: value[0], 
            serviceLauncher: value[1], 
            serviceStartTime: value[2], 
            serviceEndTime: value[3],
        })
    }
    deliverHandle(value){
        this.setState({
            deliverType: value[0],
            deliverPriority: value[1], 
            deliverTime: value[2],
            deliverExpected: value[3]
        })
    }
    priceHandle(value){
        this.setState({
            price : value
        })
    }
    otherMsgHandle(value){
        this.setState({
            subject: value[0],
            grade: value[1]
        })
    }
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    }
    submitHandle(){
        let {problemCode,gradation,depth,name,level,object,epu,problemMax,pageType,problemSource ,serviceType,serviceLauncher,
            serviceStartTime,serviceEndTime,deliverType,deliverPriority,deliverTime,
            deliverExpected,price,subject,grade} = this.state
            var newdeliverTime = [];
            deliverTime.map((item,index)=>{
                if(item !== ''&& item.day !==''&& item.time !==''){
                    newdeliverTime.push(item)
                }
            })
            console.log(deliverType);
            let deliverPriority_1 = 0;
            let deliverTime_1 = [];
            let deliverExpected_1 = 0;
            if(deliverType === '立即交付'){
                deliverPriority_1 = deliverPriority;
            }else if(deliverType === '节点交付'){
                deliverTime_1 = newdeliverTime;
            }else{
                deliverExpected_1 = deliverExpected;
            }
        let postMsg = {
            problemCode:problemCode,
            gradation: gradation,
            depth:depth,
            name: name, 
            level: level, 
            object: object,  
            epu: epu, 
            problemMax:problemMax, 
            pageType: pageType, 
            problemSource : problemSource,
            serviceType: serviceType,
            serviceLauncher: serviceLauncher, 
            serviceStartTime: serviceStartTime,
            serviceEndTime: serviceEndTime,
            // serviceTimes: serviceTimes,
            // serviceDuration: serviceDuration,
            deliverType: deliverType,
            deliverPriority: deliverPriority_1,
            deliverTime: deliverTime_1,
            deliverExpected: deliverExpected_1,
            price: price,
            subject: subject,
            grade: grade
        }
        console.log(postMsg)
        Post('/api/v3/staffs/products/',postMsg).then(resp=>{
            
        })
    }
    componentWillMount(){
        const height = document.documentElement.clientHeight;
        this.setState({
            height : height
        })
        const way = this.props.msg.way;
        console.log('99999999999999999',way)
        if(way === 1){
            let productID = this.props.msg.productID;
            Get(`/api/v3/staffs/products/${productID}/`).then(resp=>{
                if(resp.status === 200){
                    let e = resp.data;
                    this.setState({
                        problemCode: e.problemCode,
                        gradation: e.gradation,
                        depth: e.depth,
                        name: e.name,
                        level: e.level,
                        object: e.object,
                        epu: e.epu,
                        problemMax: e.problemMax,
                        pageType: e.pageType,
                        problemSource : e.problemSource,
                        serviceType: e.serviceType,
                        serviceLauncher: e.serviceLauncher,
                        serviceStartTime: e.serviceStartTime,
                        serviceEndTime: e.serviceEndTime,
                        serviceTimes: e.serviceTimes,
                        serviceDuration: e.serviceDuration, 
                        deliverType: e.deliverType,
                        deliverPriority: e.deliverPriority, 
                        deliverTime:e.deliverTime,
                        deliverExpected: e.deliverExpected, 
                        subject: e.subject, 
                        grade: e.grade, 
                      })
                }   
            })
            
        }
    }
    componentWillUnmount(){
        this.props.resetWay()
    }
    render(){
        const {height,problemCode,gradation,depth,name,level,object,epu,problemMax,pageType,problemSource ,serviceType,serviceLauncher,
                serviceStartTime,serviceEndTime,deliverType,deliverPriority,deliverTime,
                deliverExpected,price,subject,grade} = this.state
        const EPUs = ['EPU1','EPU2']
        const gradations = ['第1层 题目','第2层 过程','第3层 引导'];
        const depths = ['第1代 错题','第2代 类型','第3代 考试'];
        const weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
        let deliverTimeMsg = '';
        deliverTime.map((item,index)=>{
            deliverTimeMsg =deliverTimeMsg +`${weeks[item.day]}_${item.time} `;
        })
        const msg = `问题:${'错题学习'}/层次:${gradations[gradation-1]}/深度:${depths[depth-1]}/产品名称:${name}/产品级别:${level}/产品对象:${object}/EPU:${EPUs[epu-1]}/题量控制:${problemMax}
        /纸张大小:${pageType}/错题源:${problemSource}/服务类型:${serviceType}/服务发起:${serviceLauncher}/
        服务时段:${this.timestampToTime(serviceStartTime)}~${this.timestampToTime(serviceEndTime)}/交付类型:${deliverType}/
        交付优先:第${deliverPriority}/交付节点:${deliverTimeMsg}/交付预期:${deliverExpected}小时以内/价格:${price}元/
        学科:${subject}/年级:${grade}`;
        return(
            <div style={{backgroundColor:'#efefef',height:height-150,overflow:'auto'}}>
                <Row>
                    <Col span={1}></Col>
                    <Col span={23}>
                        <div className='title-large-content'>
                            <div>错题学习机制</div>
                            <div>支撑产品设计</div>
                        </div>
                        <Mark title='问题' textArr={['错题学习']} markClick={this.markClick.bind(this)}/>
                        <Mark title='层次' textArr={gradations} gradation={gradation} markClick={this.markClick.bind(this)}/>
                        <Mark title='深度' textArr={depths} depth={depth} markClick={this.markClick.bind(this)}/>     
                        <Population populationHandle={this.populationHandle.bind(this)}/>
                        <Cpu cpuHandle={this.cpuHandle.bind(this)}/>
                        <ErrorSource errorSourceHandle={this.errorSourceHandle.bind(this)}/>
                        <Service serviceHandle={this.serviceHandle.bind(this)}/>
                        <DocDelivery deliverHandle={this.deliverHandle.bind(this)}/>
                        <Price priceHandle={this.priceHandle.bind(this)}/>
                        <OtherMsg otherMsgHandle={this.otherMsgHandle.bind(this)}/>
                        <AddService/>
                        <Detail msg={msg} submitHandle={this.submitHandle.bind(this)}/>
                    </Col>
                    {/* <Col span={1}></Col> */}
                </Row>
            </div>
        )
    }
}

export default FirstProductDesign;