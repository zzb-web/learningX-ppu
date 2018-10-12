import React from 'react';
import {InputNumber,Select} from 'antd';
const {Option} = Select;
class Cpu extends React.Component{
    constructor(props){
        super();
        this.state={
            epu: props.data.epu,
            problemMax: props.data.problemMax,
            pageType: props.data.pageType,
            depth : props.data.depth
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            epu: nextProps.data.epu,
            problemMax: nextProps.data.problemMax,
            pageType: nextProps.data.pageType,
            depth : nextProps.data.depth
        })
    }
    render(){
        const {epu,problemMax,pageType,depth} = this.state;
        let EPU;
        if(depth === 2){
            EPU = ['EPU1','EPU2','EPU3']
        }else{
            EPU = ['EPU1','EPU2']
        }
        
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
                    {depth !==2 ? <span>
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
                    </span> : null
                    }
                </div>
            </div>
        )
    }
}

export default Cpu;