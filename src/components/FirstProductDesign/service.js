import React from 'react';
import moment from 'moment';
import {InputNumber,Select,DatePicker} from 'antd';
const {Option} = Select;
const { RangePicker } = DatePicker;
class Service extends React.Component{
    constructor(props){
        super();
        this.state={
            serviceType: props.data.serviceType, 
            serviceLauncher: props.data.serviceLauncher,
            serviceStartTime: props.data.serviceStartTime,  
            serviceEndTime: props.data.serviceEndTime, 
            serviceTimes: 0,  
            serviceDuration: '',
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            serviceType: nextProps.data.serviceType, 
            serviceLauncher: nextProps.data.serviceLauncher,
            serviceStartTime: nextProps.data.serviceStartTime,  
            serviceEndTime: nextProps.data.serviceEndTime, 
        })
    }
    render(){
        const {serviceType,serviceLauncher,serviceStartTime,serviceEndTime} = this.state;
        let serviceStartTime_1 =moment.unix(serviceStartTime).format('YYYY-MM-DD HH:mm');
        let serviceEndTime_1 =moment.unix(serviceEndTime).format('YYYY-MM-DD HH:mm');
        const serviceTypes = ['自助','简约','全包'];
        const serviceStart = ['用户','系统']
        return(
            <div style={{width:'100%',height:150,marginTop:20}}>
                <div className='title-5'>服务:</div>
                <div className='title-4-content'>
                   <div className='service-content'>
                        <span style={{marginLeft:10}}>服务类型:</span>
                        <Select style={{width:'20%',marginLeft:10}}
                                value={serviceType}
                                onChange={this.props.serviceType}>
                            {serviceTypes.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                                )
                            }
                        </Select>

                        <span style={{marginLeft:30}}>服务发起:</span>
                        <Select style={{width:'20%',marginLeft:10}}
                                value={serviceLauncher}
                                onChange={this.props.serviceLauncher}>
                            {serviceStart.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                                )
                            }
                        </Select>
                   </div>
                   <div className='service-content'>
                    <span style={{marginLeft:10}}>服务时段:</span>
                    <RangePicker
                        style={{marginLeft:10}}
                        // showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD"
                        value={[moment(serviceStartTime_1,'YYYY-MM-DD'),moment(serviceEndTime_1,'YYYY-MM-DD')]}
                        placeholder={['Start Time', 'End Time']}
                        onChange={this.props.serviceTimeChange}
                        onOk={this.props.serviceTimeOk}
                        />
                   </div>
                   {/* <div className='service-content'>
                   <span style={{marginLeft:10}}>服务次数:</span>
                        <Select style={{width:'20%',marginLeft:10}}>
                          
                        </Select>

                        <span style={{marginLeft:30}}>服务时长:</span>
                        <Select style={{width:'20%',marginLeft:10}}>
                            
                        </Select>
                   </div> */}
                </div>
            </div>
        )
    }
}

export default Service;