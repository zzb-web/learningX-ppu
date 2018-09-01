import React from 'react';
import {InputNumber,Select,DatePicker} from 'antd';
const {Option} = Select;
const { RangePicker } = DatePicker;
class Service extends React.Component{
   
    render(){
        const serviceType = ['自动','简约','全包'];
        const serviceStart = ['用户','系统']
        return(
            <div style={{width:'100%',height:150,marginTop:20}}>
                <div className='title-5'>服务:</div>
                <div className='title-4-content'>
                   <div className='service-content'>
                        <span style={{marginLeft:10}}>服务类型:</span>
                        <Select style={{width:'20%',marginLeft:10}}
                                onChange={this.props.serviceType}>
                            {serviceType.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                                )
                            }
                        </Select>

                        <span style={{marginLeft:30}}>服务发起:</span>
                        <Select style={{width:'20%',marginLeft:10}}
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
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
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