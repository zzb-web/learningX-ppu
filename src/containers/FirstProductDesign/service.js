import React from 'react';
import ServiceComponent from '../../components/FirstProductDesign/service.js';
class Service extends React.Component{
    constructor(props){
        super();
        this.state={
            serviceType: props.serviceType, 
            serviceLauncher: props.serviceLauncher,
            serviceStartTime: props.serviceStartTime,  
            serviceEndTime: props.serviceEndTime, 
            serviceTimes: 0,  
            serviceDuration: '',
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            serviceType: nextProps.serviceType, 
            serviceLauncher: nextProps.serviceLauncher,
            serviceStartTime: nextProps.serviceStartTime,  
            serviceEndTime: nextProps.serviceEndTime, 
        })
    }
    serviceType(value){
        this.setState({
            serviceType : value
        })
        const {serviceLauncher,serviceStartTime,serviceEndTime} = this.state;
        this.props.serviceHandle([value,serviceLauncher,serviceStartTime,serviceEndTime])
    }
    serviceLauncher(value){
        this.setState({
            serviceLauncher : value
        })
        const {serviceType,serviceStartTime,serviceEndTime} = this.state;
        this.props.serviceHandle([serviceType,value,serviceStartTime,serviceEndTime])
    }
    serviceTimeChange(value, dateString){
        const serviceStartTime = Date.parse(value[0]._d)/1000;
        const serviceEndTime = Date.parse(value[1]._d)/1000;
        this.setState({
            serviceStartTime : serviceStartTime,  
            serviceEndTime:serviceEndTime
        })
        const {serviceType,serviceLauncher} = this.state;
        this.props.serviceHandle([serviceType,serviceLauncher,serviceStartTime,serviceEndTime])
    }
    serviceTimeOk(value){
        const serviceStartTime = Date.parse(value[0]._d)/1000;
        const serviceEndTime = Date.parse(value[1]._d)/1000;
        this.setState({
            serviceStartTime : serviceStartTime,  
            serviceEndTime:serviceEndTime
        })
        const {serviceType,serviceLauncher} = this.state;
        this.props.serviceHandle([serviceType,serviceLauncher,serviceStartTime,serviceEndTime])
    }
    serviceTimes(value){
        
    }
    render(){
        return(
            <div>
                <ServiceComponent serviceType={this.serviceType.bind(this)}
                                  serviceLauncher={this.serviceLauncher.bind(this)}
                                  serviceTimeChange={this.serviceTimeChange.bind(this)}
                                  serviceTimeOk={this.serviceTimeOk.bind(this)}
                                //   serviceTimes={this.serviceTimes.bind(this)}
                                  data={this.state}
                                  />
            </div>
        )
    }
}

export default Service;