import React from 'react';
import {Input,Select} from 'antd';
const {Option} = Select;
class DocumentForm extends React.Component{
    constructor(props){
        super();
        this.state={
            pageType: props.data.pageType, 
            columnCount: props.data.columnCount, 
            borderControl: props.data.borderControl,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            pageType: nextProps.data.pageType, 
            columnCount: nextProps.data.columnCount, 
            borderControl: nextProps.data.borderControl,
        })
    }
    render(){
        const {pageType,columnCount,borderControl} = this.state;
        const papers = ['A3','A4'];
        const scores = [1,2,3,4];
        const borderControls = ['纸张数','题目数']
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>文档形式:</div>
                <div className='title-3-content'>
                    <span className='title-4'>纸张大小:</span>
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

                    <span className='title-4' style={{marginLeft:30}}>分数栏:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder=''
                        //    value={columnCount}
                           onChange={this.props.scoreHandle}
                        >
                        {
                            scores.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>

                    <span className='title-4' style={{marginLeft:30}}>边界控制:</span>
                    <Select style={{width:'20%',marginLeft:10}} 
                           placeholder=''
                           value={borderControl}
                           onChange={this.props.borderControlHandle}
                           >
                        {
                            borderControls.map((item,index)=>
                                <Option value={item} key={index}>{item}</Option>
                            )
                        }
                    </Select>
                </div>
            </div>
        )
    }
}

export default DocumentForm;