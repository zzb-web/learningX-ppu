import React from 'react';
import DocDeliveryComponent from '../../components/FirstProductDesign/docDelivery.js';
class DocDelivery extends React.Component{
    constructor(props){
        super();
        this.state={
            deliverType: props.deliverType,
            deliverPriority: props.deliverPriority,
            deliverTime: props.deliverTime,
            deliverExpected: props.deliverExpected,  
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            deliverType: nextProps.deliverType,
            deliverPriority: nextProps.deliverPriority,
            deliverTime: nextProps.deliverTime,
            deliverExpected: nextProps.deliverExpected,  
        })
    }
    deliveryType(value){
        this.setState({
            deliverType : value
        })
        const {deliverPriority,deliverTime,deliverExpected} = this.state;
        this.props.deliverHandle([value,deliverPriority,deliverTime,deliverExpected])
    }
    deliverPriority(value){
        const deliverPriority = Number(value.split('第')[1]);
        this.setState({
            deliverPriority : deliverPriority
        })
        const {deliverType,deliverTime,deliverExpected} = this.state;
        this.props.deliverHandle([deliverType,deliverPriority,deliverTime,deliverExpected])
    }
    deliverTimeHandle(value){
        const {deliverTime} = this.state;
        deliverTime[value[0]] = {
            day: value[1], 
            time:value[2]
        }
        console.log(deliverTime);
        this.setState({
            deliverTime : deliverTime
        })
        // var newArr = [];
        // deliverTime.map((item,index)=>{
        //     if(item !== ''&& item.day !==''&& item.time !==''){
        //         newArr.push(item)
        //     }
        // })
        const {deliverType,deliverPriority,deliverExpected} = this.state;
        this.props.deliverHandle([deliverType,deliverPriority,deliverTime,deliverExpected])
    }
    deliverExpectedHandle(value){
        const deliverExpected = Number(value.split('小')[0]);
        this.setState({
            deliverExpected : deliverExpected
        })
        const {deliverType,deliverPriority,deliverTime} = this.state;
        this.props.deliverHandle([deliverType,deliverPriority,deliverTime,deliverExpected])
    }
    render(){
        const {deliverType} = this.state;
        console.log(this.state.deliverTime)
        return(
            <div>
                <DocDeliveryComponent deliveryType={this.deliveryType.bind(this)}
                                      deliverType= {deliverType}
                                      deliverPriority={this.deliverPriority.bind(this)}
                                      deliverTimeHandle={this.deliverTimeHandle.bind(this)}
                                      deliverExpectedHandle={this.deliverExpectedHandle.bind(this)}
                                      data={this.state}/>
            </div>
        )
    }
}

export default DocDelivery;