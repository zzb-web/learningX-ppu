import React from 'react';
import {Input,Select,TimePicker,Button} from 'antd';
const {Option} = Select;
const weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
class DocDelivery extends React.Component{
    state={
        
    }
    render(){
       const deliveryType = ['立即交付','节点交付','预期交付'];
       const deliveryFirst = [];
       for(var i=0;i<11;i++){
        deliveryFirst.push(`第${i}`)
       }
       const deliveryExpect = ['8小时内','16小时内','24小时内'];
        return(
            <div style={{width:'100%',height:150,marginTop:20}}>
                <div className='title-5'>文档交付:</div>
                <div className='title-4-content'>
                   <div className='service-content'>
                        <span style={{marginLeft:10}}>交付类型:</span>
                        <Select style={{width:'20%',marginLeft:10}}
                                onChange={this.props.deliveryType}>
                            {deliveryType.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                                )
                            }
                        </Select>
                        <span style={{marginLeft:30}}>交付优先:</span>
                        <Select style={{width:'20%',marginLeft:10}}
                                onChange={this.props.deliverPriority}>
                            {deliveryFirst.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                                )
                            }
                        </Select>
                   </div>
                   <div className='service-content'>
                        <span style={{marginLeft:10}}>交付节点:</span>
                        <DeliverTime/>
                        <span style={{marginLeft:40}}>交付节点:</span>
                        <DeliverTime/>
                        <span style={{marginLeft:40}}>交付节点:</span>
                        <DeliverTime/>
                   </div>
                   <div className='service-content'>
                        <span style={{marginLeft:10}}>交付预期:</span>
                        <Select style={{width:'20%',marginLeft:10}}>
                            {deliveryExpect.map((item,index)=>
                                    <Option value={item} key={index}>{item}</Option>
                                    )
                                }
                        </Select>
                   </div>
                </div>
            </div>
        )
    }
}

class DeliverTime extends React.Component{
        state = {
            visible: false,
            week : '',
            date : ''
        }
      handleVisibleChange(){
        this.setState({
            visible : !this.state.visible
        })
      }
      weekChange(e){
        this.setState({
            week : weeks[e]
        })
      }
      timeChange(time, timeString) {
        this.setState({
            date : timeString
        })
      }
      closeHandle(){
        this.setState({
            visible : false
        })
      }
    render(){
        const {visible,week,date} = this.state;
        return(
            <div style={{display:'inline-block',position:'relative',width:'20%'}}>
                <Input style={{width:'100%',marginLeft:10}} 
                       onClick={this.handleVisibleChange.bind(this)}
                       value={`${week} ${date}`}/> 
                <div className='deliverTime' style={visible?{display:'block'}:{display:'none'}}>
                    <Select style={{width:'80%',marginLeft:'10%'}}
                            placeholder='请选择星期'
                            onChange={this.weekChange.bind(this)}>
                            {weeks.map((item,index)=>
                                <Option value={index} key={index}>{item}</Option>
                            )}
                    </Select>
                    <TimePicker onChange={this.timeChange.bind(this)}
                                style={{width:'80%',marginLeft:'10%'}}/>
                    <Button style={{width:'80%',marginLeft:'10%'}}
                            onClick={this.closeHandle.bind(this)}>关闭</Button>
                </div>
            </div>
        )
    }
}

export default DocDelivery;