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
import {Get} from '../../fetch/data.js';
class FirstProductDesign extends React.Component{
    state = {
        problemCode:'E',
        gradation:1,
        depth:1,
        height:500,
        name: '',  // 产品名称
        level: '无',  // 产品级别
        object: '高端试点',  // 产品对象
        epu: 1,  // EPU, 1 2
        problemMax: 1,  // 题量控制
        pageType: 'A4',    // 纸张类型，"A3"或者"A4"、
        problemSource : [],
        serviceType: '',  // 服务类型
        serviceLauncher: '',  // 服务发起
        serviceStartTime: 0,  // 服务开始时间, unix时间戳
        serviceEndTime: 0,  // 服务结束时间, unix时间戳
        serviceTimes: 0,  // 服务次数
        serviceDuration: '',  // 服务时长

        deliverType: '',  // 交付类型
        deliverPriority: 0,  // 交付优先级
        deliverTime: [{
            day: 0,  // 周日0,周一到周六分别是1到6,
            time:'',  // 时间，格式按照"08:00:00"
        }],   // 交付节点
        deliverExpected: 0,  // 交付预期，预期多少小时内
        price: 0,  // 单价
        subject: '',  // 学科
        grade: '',  // 年级（全部直接用“全部”）
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
        console.log(value)
    }
    componentWillMount(){
        const height = document.documentElement.clientHeight;
        this.setState({
            height : height
        })
    }
    render(){
        const {height} = this.state;
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
                        <Mark title='层次' textArr={['第1层 题目','第2层 过程','第3层 引导']} markClick={this.markClick.bind(this)}/>
                        <Mark title='深度' textArr={['第1代 错题','第2代 类型','第3代 考试']} markClick={this.markClick.bind(this)}/>     
                        <Population populationHandle={this.populationHandle.bind(this)}/>
                        <Cpu cpuHandle={this.cpuHandle.bind(this)}/>
                        <ErrorSource errorSourceHandle={this.errorSourceHandle.bind(this)}/>
                        <Service serviceHandle={this.serviceHandle.bind(this)}/>
                        <DocDelivery deliverHandle={this.deliverHandle.bind(this)}/>
                        <Price/>
                        <OtherMsg/>
                        <AddService/>
                        <Detail/>
                    </Col>
                    {/* <Col span={1}></Col> */}
                </Row>
            </div>
        )
    }
}

export default FirstProductDesign;