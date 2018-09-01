import React from 'react';
import CpuComponent from '../../components/FirstProductDesign/cpuhandle.js';
class Cpu extends React.Component{
    state={
        epu: 1,
        problemMax: 1,
        pageType: 'A4'
    }
    epuHandle(value){
        let epu;
        if(value === 'EPU1'){
            epu = 1;
        }else{
            epu = 2;
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
                              paperHandle={this.paperHandle.bind(this)}/>
            </div>
        )
    }
}

export default Cpu;