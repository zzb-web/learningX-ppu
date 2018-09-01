import React from 'react';
import DocDeliveryComponent from '../../components/FirstProductDesign/docDelivery.js';
class DocDelivery extends React.Component{
    state={
        deliverType: '',
        deliverPriority: 0,
        deliverTime: [{
            day: 0, 
            time:'',
        }],
        deliverExpected: 0,  
    }
    deliveryType(value){
        this.setState({
            deliverType : value
        })
        const {deliverPriority,deliverTime,deliverExpected} = this.state;
        this.props.deliverHandle(value,deliverPriority,deliverTime,deliverExpected)
    }
    deliverPriority(value){
        const deliverPriority = Number(value[1]);
        this.setState({
            deliverPriority : deliverPriority
        })
        const {deliverType,deliverTime,deliverExpected} = this.state;
        this.props.deliverHandle([deliverType,deliverPriority,deliverTime,deliverExpected])
    }
    render(){
        return(
            <div>
                <DocDeliveryComponent deliveryType={this.deliveryType.bind(this)}
                                      deliverPriority={this.deliverPriority.bind(this)}/>
            </div>
        )
    }
}

export default DocDelivery;