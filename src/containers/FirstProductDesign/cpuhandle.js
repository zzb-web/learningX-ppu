import React from 'react';
import CpuComponent from '../../components/FirstProductDesign/cpuhandle.js';
class Cpu extends React.Component{
    constructor(props){
        super();
        this.state={
            epu: props.epu,
            problemMax: props.problemMax,
            pageType: props.pageType,
            depth : props.depth
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            epu: nextProps.epu,
            problemMax: nextProps.problemMax,
            pageType: nextProps.pageType,
            depth : nextProps.depth
        })
    }
    epuHandle(value){
        let epu;
        if(value === 'EPU1'){
            epu = 1;
        }else if(value ==='EPU2'){
            epu = 2;
        }else{
            epu = 3;
        }
        this.setState({
            epu : epu
        })
        const {problemMax,pageType} = this.state;
        this.props.cpuHandle([epu,problemMax,pageType])
    }
    topicHandle(value){
        const {epu,pageType} = this.state;
        this.props.cpuHandle([epu,value,pageType])
    }
    paperHandle(value){
        const {epu,problemMax} = this.state;
        this.props.cpuHandle([epu,problemMax,value])
    }
    render(){
        return(
            <div>
                <CpuComponent epuHandle={this.epuHandle.bind(this)}
                              topicHandle={this.topicHandle.bind(this)}
                              paperHandle={this.paperHandle.bind(this)}
                              data={this.state}/>
            </div>
        )
    }
}

export default Cpu;