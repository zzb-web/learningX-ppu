import React from 'react';
import {Input,Select,TimePicker,Button} from 'antd';
import moment from 'moment';
const {Option} = Select;
const weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
class DocDelivery extends React.Component{
    constructor(props){
        super();
        this.state={
            deliverType: props.data.deliverType,
            deliverPriority: props.data.deliverPriority,
            deliverTime: props.data.deliverTime,
            deliverExpected: props.data.deliverExpected,  
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            deliverType: nextProps.data.deliverType,
            deliverPriority: nextProps.data.deliverPriority,
            deliverTime: nextProps.data.deliverTime,
            deliverExpected: nextProps.data.deliverExpected,  
        })
    }
    render(){
       let {deliverType,deliverPriority,deliverTime,deliveryExpect} = this.state;
       const deliveryTypes = ['立即交付','节点交付','预期交付'];
       const deliveryFirst = [];
       for(var i=0;i<11;i++){
        deliveryFirst.push(`第${i}`)
       }
       const deliveryExpects = ['8小时内','16小时内','24小时内'];
       const curDeliverType = deliveryTypes.indexOf(deliverType);
       if(curDeliverType === 0){
        deliverPriority = 0;
       }
    //    if(deliverTime.le)
        return(
            <div style={{width:'100%',height:150,marginTop:20}}>
                <div className='title-5'>文档交付:</div>
                <div className='title-4-content'>
                   <div className='service-content'>
                        <span style={{marginLeft:10}}>交付类型:</span>
                        <Select style={{width:'20%',marginLeft:10}}
                                value={deliverType}
                                onChange={this.props.deliveryType}>
                            {deliveryTypes.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                                )
                            }
                        </Select>
                        <span style={{marginLeft:30}}>交付优先:</span>
                        <Select style={{width:'20%',marginLeft:10}}
                                onChange={this.props.deliverPriority}
                                value={`第${deliverPriority}`}>
                            {deliveryFirst.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                                )
                            }
                        </Select>
                   </div>
                   {curDeliverType === -1 || curDeliverType === 1 ? <div className='service-content'>
                        <span style={{marginLeft:10}}>交付节点:</span>
                        <DeliverTime deliverTimeHandle={this.props.deliverTimeHandle}
                                     time={deliverTime[0]} 
                                    idx={0}/>
                        <span style={{marginLeft:40}}>交付节点:</span>
                        <DeliverTime deliverTimeHandle={this.props.deliverTimeHandle} 
                                    time={deliverTime[1]} 
                                     idx={1}/>
                        <span style={{marginLeft:40}}>交付节点:</span>
                        <DeliverTime deliverTimeHandle={this.props.deliverTimeHandle} 
                                     time={deliverTime[2]} 
                                     idx={2}/>
                   </div> : null}
                    {curDeliverType === -1 || curDeliverType === 2 ? <div className='service-content'>
                        <span style={{marginLeft:10}}>交付预期:</span>
                        <Select style={{width:'20%',marginLeft:10}}
                                onChange={this.props.deliverExpectedHandle}>
                            {deliveryExpects.map((item,index)=>
                                    <Option value={item} key={index}>{item}</Option>
                                    )
                                }
                        </Select>
                   </div> : null}
                </div>
            </div>
        )
    }
}

class DeliverTime extends React.Component{
        constructor(props){
            super();
            this.state={
                visible: false,
                week : props.time !== undefined ? props.time.day : '',
                date : (props.time !== undefined && props.time.time !== '') ? props.time.time : '00:00:00',
            }
        }
     componentWillMount(){
        //  console.log(this.props.time)
     }
      componentWillReceiveProps(nextProps){
        this.setState({
            week : nextProps.time !== undefined ? nextProps.time.day : '',
            date : (nextProps.time !== undefined && nextProps.time.time !== '') ? nextProps.time.time : '00:00:00',
        })
      }
      handleVisibleChange(){
        this.setState({
            visible : !this.state.visible
        })
      }
      weekChange(e){
        this.setState({
            week : e
        })
        const {date} = this.state;
        const {idx} = this.props;
        this.props.deliverTimeHandle([idx,e,date])
      }
      timeChange(time, timeString) {
        // console.log(timeString)
        this.setState({
            date : timeString
        })
        const {week} = this.state;
        const {idx} = this.props;
        // console.log(week)
        // let newweek = weeks.indexOf(week) === -1 ? '' : weeks.indexOf(week);
        // console.log(newweek)
        this.props.deliverTimeHandle([idx,week ,timeString])
      }
      closeHandle(){
        this.setState({
            visible : false
        })
      }
      clearHandle(){
          this.setState({
              week:'',
          })
          const {idx,date} = this.props;
        this.props.deliverTimeHandle([idx,'',date])
      }
    render(){
        const {visible,week,date} = this.state;
        // console.log('time',this.props.idx,date)
        let showTime = '';
        if(weeks[week] !== undefined && date !== ''){
            showTime = `${weeks[week]} ${date}`
        }
        return(
            <div style={{display:'inline-block',position:'relative',width:'20%'}}>
                <Input style={{width:'100%',marginLeft:10}} 
                       onClick={this.handleVisibleChange.bind(this)}
                       value={showTime}/> 
                <div className='deliverTime' style={visible?{display:'block'}:{display:'none'}}>
                    <Select style={{width:'80%',marginLeft:'10%'}}
                            value={week}
                            placeholder='请选择星期'
                            onChange={this.weekChange.bind(this)}>
                            {weeks.map((item,index)=>
                                <Option value={index} key={index}>{item}</Option>
                            )}
                    </Select>
                    <div className='clearWeek'
                         onClick={this.clearHandle.bind(this)}></div>
                    <TimePicker onChange={this.timeChange.bind(this)}
                                value={moment(date, "HH:mm:ss")}
                                style={{width:'80%',marginLeft:'10%'}}/>
                    <Button style={{width:'80%',marginLeft:'10%'}}
                            onClick={this.closeHandle.bind(this)}>关闭</Button>
                </div>
            </div>
        )
    }
}

export default DocDelivery;