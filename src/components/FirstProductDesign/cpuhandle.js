import React from 'react';
import {InputNumber,Select} from 'antd';
const {Option} = Select;
class Cpu extends React.Component{
    constructor(props){
        super();
        this.state={
            epu: props.data.epu,
            problemMax: props.data.problemMax,
            pageType: props.data.pageType
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            epu: nextProps.data.epu,
            problemMax: nextProps.data.problemMax,
            pageType: nextProps.data.pageType
        })
    }
    render(){
        const {epu,problemMax,pageType} = this.state;
        const EPU = ['EPU1','EPU2']
        const papers = ['A3','A4']
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>处理器:</div>
                <div className='title-3-content'>
                    <span className='title-4'>EPU:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder=''
                           value={EPU[epu-1]}
                           onChange={this.props.epuHandle}
                           >
                        {
                            EPU.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>

                    <span className='title-4' style={{marginLeft:30}}>题量控制:</span>
                    <InputNumber style={{width:'20%',marginLeft:10}} 
                                 onChange={this.props.topicHandle}
                                 value={problemMax}
                                 placeholder=''/>

                    <span className='title-4' style={{marginLeft:30}}>纸张大小:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder=''
                           value={pageType}
                           onChange={this.props.paperHandle}
                           >
                        {
                            papers.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>
                </div>
            </div>
        )
    }
}

export default Cpu;