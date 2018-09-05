import React from 'react';
import {Row,Col, InputNumber, Input, Button, Select} from 'antd';
import moment from 'moment';
const {Option} = Select;
class PersonalInfoSure extends React.Component{
    state = {
        showModal : false,
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
        // way : 0,
        problemCode_1:'E',
        gradation_1:1,
        depth_1:1,
        name_1: '',  // 产品名称
        level_1: '',  // 产品级别
        object_1: '',  // 产品对象
        epu_1: 0,  // EPU, 1 2
        problemMax_1: '',  // 题量控制
        pageType_1: 'A4',    // 纸张类型，"A3"或者"A4"、
        problemSource_1 : [],
        serviceType_1: '',  // 服务类型
        serviceLauncher_1: '',  // 服务发起
        serviceStartTime_1: (moment()/1000).valueOf(),  // 服务开始时间, unix时间戳
        serviceEndTime_1: (moment()/1000).valueOf(),  // 服务结束时间, unix时间戳
        serviceTimes_1: 0,  // 服务次数
        serviceDuration_1: '',  // 服务时长
        deliverType_1: '',  // 交付类型
        deliverPriority_1: '',  // 交付优先级
        deliverTime_1: [{
            day: '',  // 周日0,周一到周六分别是1到6,
            time:'',  // 时间，格式按照"08:00:00"
        },{
            day: '',  // 周日0,周一到周六分别是1到6,
            time:'',  // 时间，格式按照"08:00:00"
        },{
            day: '',  // 周日0,周一到周六分别是1到6,
            time:'',  // 时间，格式按照"08:00:00"
        }],   // 交付节点
        deliverExpected_1: '',  // 交付预期，预期多少小时内
        price_1: '',  // 单价
        subject_1: '',  // 学科
        grade_1: '',  // 年级（全部直接用“全部”
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
    componentWillMount(){
        this.setState({
            allProductId : this.props.data.allProductId,
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
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            allProductId : nextProps.data.allProductId,
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
        })
    }
    render(){
        const {problemCode,gradation,depth,name,level,object,epu,problemMax,pageType,problemSource ,serviceType,serviceLauncher,
            serviceStartTime,serviceEndTime,deliverType,deliverPriority,deliverTime,
            deliverExpected,price,subject,grade,allProductId,curProductID} = this.state
            const {problemCode_1,gradation_1,depth_1,name_1,level_1,object_1,epu_1,problemMax_1,pageType_1,problemSource_1 ,serviceType_1,serviceLauncher_1,
                serviceStartTime_1,serviceEndTime_1,deliverType_1,deliverPriority_1,deliverTime_1,
                deliverExpected_1,price_1,subject_1,grade_1} = this.state
                console.log(curProductID)
            const EPUs = ['EPU1','EPU2']
            const gradations = ['第1层 题目','第2层 过程','第3层 引导'];
            const depths = ['第1代 错题','第2代 类型','第3代 考试'];
            const weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
            let deliverTimeMsg = '';
        deliverTime.map((item,index)=>{
            deliverTimeMsg =deliverTimeMsg +`${weeks[item.day]}_${item.time} `;
        })
        let deliverTimeMsg_1 = '';
        deliverTime_1.map((item,index)=>{
            deliverTimeMsg_1 =deliverTimeMsg_1 +`${weeks[item.day]}_${item.time} `;
        })
        const {data} = this.props;
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div>
                            <div>
                                <span>学习号:</span>
                                <InputNumber style={{width:160,marginLeft:10}}
                                             onChange={this.props.getLearnId}/>
                                <span style={{marginLeft:50}}>姓名:</span>
                                <Input value={data.msg.name} 
                                       disabled
                                       style={{width:160,marginLeft:10}}/>
                                <Button type='primary' 
                                        style={{width:120,marginLeft:50}}
                                        onClick={this.props.makeSure}>去确认</Button>
                            </div>
                            <div className='line'></div>
                            {
                                data.showDetail ? <div className='msg-content'>
                                <div className='msg-title'>
                                    <span className='msg-name'>{data.msg.name}</span>
                                    <span className='toConfigure'
                                          onClick={this.props.toConfigure}>去配置</span>
                                </div>
                                <div className='msg-detail'>
                                    <div>{data.msg.school}学校</div>
                                    <div>{data.msg.grade}年级</div>
                                    <div>{data.msg.class}班</div>
                                </div>
                            </div> : null
                            }
                            {
                                data.showSecond ? <div style={{width:'100%',height:400,marginTop:30}}>
                                    <div className='person-box'>
                                        <div className='person-title'>在线产品</div>
                                        <div className='person-content'>
                                            <div className='person-select'>
                                                <span>产品编号:</span>
                                                <Input disabled 
                                                       value={curProductID}
                                                       style={{width:160,marginLeft:20}}/>
                                            </div>
                                            <div className='person-detail'>
                                                <div style={{float:'left'}}>产品详情</div>
                                                <div className='person-msg'>
                                                    <div>服务状态</div>
                                                    <div><span>问题:错题学习</span></div>
                                                    <div>{`层次:${gradations[gradation-1]}`}</div>
                                                    <div>{`深度:${depths[depth-1]}`}</div>
                                                    <div>{`总体:产品名称:${name}/产品级别:${level}/产品对象:${object}`}</div>
                                                    <div>{`处理器:EPU:${EPUs[epu-1]}/题量控制:${problemMax}/纸张大小:${pageType}`}</div>
                                                    <div>{`错题源:${problemSource}`}</div>
                                                    <div>{`服务:服务类型:${serviceType}/服务发起:${serviceLauncher}/
                                服务时段:${this.timestampToTime(serviceStartTime)}~${this.timestampToTime(serviceEndTime)}`}</div>
                                                    <div>{`文档交付:交付类型:${deliverType}/
                                交付优先:第${deliverPriority}/交付节点:${deliverTimeMsg}/交付预期:${deliverExpected}小时以内`}</div>
                                                    <div>{`价格:${price}元`}</div>
                                                    <div>{`其他信息:学科:${subject}/年级:${grade}`}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='personBox'>
                                        <div className='person-title'>配置新品</div>
                                        <div className='person-content'>
                                        <div className='person-select'>
                                            <span>产品编号:</span>
                                            <Select style={{width:160,marginLeft:20}}
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
                                                <div className='person-msg'>
                                                    <div>服务状态</div>
                                                    <div><span>问题:错题学习</span></div>
                                                    <div>{`层次:${gradations[gradation_1-1]}`}</div>
                                                    <div>{`深度:${depths[depth_1-1]}`}</div>
                                                    <div>{`总体:产品名称:${name_1}/产品级别:${level_1}/产品对象:${object_1}`}</div>
                                                    <div>{`处理器:EPU:${EPUs[epu_1-1]}/题量控制:${problemMax_1}/纸张大小:${pageType_1}`}</div>
                                                    <div>{`错题源:${problemSource}`}</div>
                                                    <div>{`服务:服务类型:${serviceType_1}/服务发起:${serviceLauncher_1}/
                                服务时段:${this.timestampToTime(serviceStartTime_1)}~${this.timestampToTime(serviceEndTime_1)}`}</div>
                                                    <div>{`文档交付:交付类型:${deliverType_1}/
                                交付优先:第${deliverPriority_1}/交付节点:${deliverTimeMsg_1}/交付预期:${deliverExpected_1}小时以内`}</div>
                                                    <div>{`价格:${price_1}元`}</div>
                                                    <div>{`其他信息:学科:${subject_1}/年级:${grade_1}`}</div>
                                                </div>
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
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}
export default PersonalInfoSure;