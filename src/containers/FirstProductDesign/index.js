import React from 'react';
import {Col,Row,message,Modal} from 'antd';
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
import {Post,Get,Put} from '../../fetch/data.js';
import moment from 'moment';
const {confirm} = Modal;
class FirstProductDesign extends React.Component{
    state = {
        showModal : false,
        problemCode:'E',
        gradation:1,
        depth:1,
        height:500,
        name: '',  // 产品名称
        level: '',  // 产品级别
        object: '',  // 产品对象
        epu: '',  // EPU, 1 2
        problemMax: '',  // 题量控制
        pageType: '',    // 纸张类型，"A3"或者"A4"、
        problemSource : [],
        serviceType: '',  // 服务类型
        serviceLauncher: '',  // 服务发起
        serviceStartTime: (moment()/1000).valueOf(),  // 服务开始时间, unix时间戳
        serviceEndTime: (moment()/1000).valueOf(),  // 服务结束时间, unix时间戳
        serviceTimes: 0,  // 服务次数
        serviceDuration: '',  // 服务时长
        deliverType: '',  // 交付类型
        deliverPriority: '',  // 交付优先级
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
        deliverExpected: '',  // 交付预期，预期多少小时内
        price: '',  // 单价
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
        return Y+M+D;
    }
    submitHandle(){
        this.showConfirm()
    }
    submitOK(){
        let {problemCode,gradation,depth,name,level,object,epu,problemMax,pageType,problemSource ,serviceType,serviceLauncher,
            serviceStartTime,serviceEndTime,deliverType,deliverPriority,deliverTime,
            deliverExpected,price,subject,grade,way} = this.state
            var newdeliverTime = [];
            deliverTime.map((item,index)=>{
                if(item !== ''&& item.day !==''&& item.time !==''){
                    newdeliverTime.push(item)
                }
            })
            let deliverPriority_1 = 0;
            let deliverTime_1 = [];
            let deliverExpected_1 = 0;
            if(deliverType === '立即交付'){
               
            }else if(deliverType === '节点交付'){
                deliverTime_1 = newdeliverTime;
                deliverPriority_1 = deliverPriority;
            }else{
                deliverExpected_1 = deliverExpected;
                deliverPriority_1 = deliverPriority;
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
            serviceStartTime: parseInt(serviceStartTime),
            serviceEndTime: parseInt(serviceEndTime),
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
        if(way === 1){
            const {productID} = this.state;
            Put(`/api/v3/staffs/products/${productID}/`,postMsg).then(resp=>{
                if(resp.status === 200){
                    message.success('操作成功');
                }else{
                    message.error('操作失败');
                }
            })
        }else{
            Post('/api/v3/staffs/products/',postMsg).then(resp=>{
                if(resp.status === 200){
                    message.success('操作成功');
                }else{
                    message.error('操作失败');
                }
            })
        }
        
    }
    showConfirm() {
        const that = this;
        confirm({
          title: '必须进行产品设计检查',
          content: '你确定产品设计OK?',
          onOk() {
            that.submitOK()
          },
          onCancel() {
            
          },
        });
      }
    componentWillMount(){
        const height = document.documentElement.clientHeight;
        const way = this.props.msg.way;
        this.setState({
            height : height,
            way : way
        })
        if(way === 1 || way === 2){
            let productID = this.props.msg.productID;
            // console.log(productID)
            this.setState({
                productID : productID
            })
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
                        price : e.price,
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
            if(item.day !== '' && item.time !== ''){
                deliverTimeMsg =deliverTimeMsg +`${weeks[item.day]}_${item.time} `;
            }
        })
        let deliverMsg = '';
        if(deliverType === '立即交付'){
            deliverMsg = `交付优先:第0`
        }else if(deliverType === '节点交付'){
            deliverMsg = <span>
                            <span style={deliverPriority ===''?{color:'red'}:null}>交付优先</span>:{deliverPriority}|
                            <span style={deliverTimeMsg ===''?{color:'red'}:null}>交付节点</span>:{deliverTimeMsg}
                        </span>
        }else{
            deliverMsg = <span>
                            <span style={deliverPriority ===''?{color:'red'}:null}>交付优先</span>:{deliverPriority}|
                            <span style={deliverExpected ===''?{color:'red'}:null}>交付预期</span>:{deliverExpected}小时以内
                        </span>
        }
        const detailMsg = <div>
                            <div><span>问题:错题学习</span></div>
                            <div>{`层次:${gradations[gradation-1]}`}</div>
                            <div>{`深度:${depths[depth-1]}`}</div>
                            <div>总体:<span style={name===''?{color:'red'}:null}>产品名称</span>:{name}|
                                      <span style={level===''?{color:'red'}:null}>产品级别</span>:{level}|
                                      <span style={object===''?{color:'red'}:null}>产品对象</span>:{object}
                            </div>
                            <div>处理器:<span style={epu===''?{color:'red'}:null}>EPU</span>:{EPUs[epu-1]}|
                                        <span style={problemMax===''?{color:'red'}:null}>题量控制</span>:{problemMax}|
                                        <span style={pageType===''?{color:'red'}:null}>纸张大小</span>:{pageType}
                            </div>
                            <div>错题源:<span style={problemSource.length===0?{color:'red'}:null}>错题源</span>:{`${problemSource}`}</div>
                            <div>服务:<span style={serviceType===''?{color:'red'}:null}>服务类型</span>:{serviceType}|
                                      <span style={serviceLauncher===''?{color:'red'}:null}>服务发起</span>:{serviceLauncher}|
                                      <span style={this.timestampToTime(serviceStartTime)==='' || this.timestampToTime(serviceEndTime) === '' ?{color:'red'}:null}>服务时段</span>:{this.timestampToTime(serviceStartTime)}~{this.timestampToTime(serviceEndTime)}
                            </div>
                            <div>文档交付:<span style={deliverType===''?{color:'red'}:null}>交付类型</span>:{deliverType}|{deliverMsg}</div> 
                            <div><span style={price ==='' || parseInt(price,10) === 0?{color:'red'}:null}>价格</span>:{price}元</div>
                            <div>其他信息:<span style={subject===''?{color:'red'}:null}>学科</span>:{subject}|
                                         <span style={grade===''?{color:'red'}:null}>年级</span>:{grade}
                            </div>     
                          </div>
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
                        <Population populationHandle={this.populationHandle.bind(this)} 
                                    name={name} 
                                    level={level} 
                                    object={object}/>
                        <Cpu cpuHandle={this.cpuHandle.bind(this)} epu={epu} problemMax={problemMax} pageType={pageType}/>
                        <ErrorSource errorSourceHandle={this.errorSourceHandle.bind(this)} problemSource={problemSource}/>
                        <Service serviceHandle={this.serviceHandle.bind(this)} 
                                 serviceType={serviceType} 
                                 serviceLauncher={serviceLauncher} 
                                 serviceStartTime={serviceStartTime} 
                                 serviceEndTime={serviceEndTime}/>
                        <DocDelivery deliverHandle={this.deliverHandle.bind(this)}
                                     deliverType={deliverType}
                                     deliverPriority={deliverPriority}
                                     deliverTime={deliverTime}
                                     deliverExpected={deliverExpected}/>
                        <Price priceHandle={this.priceHandle.bind(this)} price={price}/>
                        <OtherMsg otherMsgHandle={this.otherMsgHandle.bind(this)}
                                  subject={subject}
                                  grade={grade}/>
                        <AddService/>
                        <Detail msg={detailMsg} submitHandle={this.submitHandle.bind(this)}/>
                    </Col>
                    {/* <Col span={1}></Col> */}
                </Row>
            </div>
        )
    }
}

export default FirstProductDesign;