import React from 'react';
import {Col,Row,TreeSelect} from 'antd';
import Mark from './mark.js';
import {Get} from '../../fetch/data.js';
class FirstProductDesign extends React.Component{
    state = {
       question:0,
       arrangement:0,
       depth:0
      }
    markClick(value){   
        let type = value[0];
        let val = value[1];
        switch(type){
            case '问题':
            this.setState({question:val});
            break;
            case '层次':
            this.setState({arrangement:val});
            break;
            case '深度':
            this.setState({depth:val});
            break;
            default:
            break;
        }
    }
    render(){
        return(
            <div style={{backgroundColor:'#efefef',height:'100%'}}>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div className='title-large-content'>
                            <div>错题学习机制</div>
                            <div>支撑产品设计</div>
                        </div>
                        <Mark title='问题' textArr={['错题学习']} markClick={this.markClick.bind(this)}/>
                        <Mark title='层次' textArr={['第1层 题目','第2层 过程','第3层 引导']} markClick={this.markClick.bind(this)}/>
                        <Mark title='深度' textArr={['第1代 错题','第2代 类型','第3代 考试']} markClick={this.markClick.bind(this)}/>     
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

export default FirstProductDesign;