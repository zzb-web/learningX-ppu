import React from 'react';
import {Row,Col, InputNumber, Input, Button} from 'antd';
class PersonalInfoSure extends React.Component{
    render(){
        const {data} = this.props;
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div>
                            <div>
                                <span>学习号:</span>
                                <InputNumber style={{width:160,marginLeft:10}}
                                             onChange={this.props.getLearnId}/>
                                <span style={{marginLeft:50}}>姓名:</span>
                                <Input value={data.msg.name} 
                                       disabled
                                       style={{width:160,marginLeft:10}}/>
                                <Button type='primary' 
                                        style={{width:120,marginLeft:50}}
                                        onClick={this.props.makeSure}>去确认</Button>
                            </div>
                            <div className='line'></div>
                            {
                                data.showDetail ? <div className='msg-content'>
                                <div className='msg-title'>
                                    <span className='msg-name'>{data.msg.name}</span>
                                    <span className='toConfigure'
                                          onClick={this.props.toConfigure}>去配置</span>
                                </div>
                                <div className='msg-detail'>
                                    <div>{data.msg.school}学校</div>
                                    <div>{data.msg.grade}年级</div>
                                    <div>{data.msg.class}班</div>
                                </div>
                            </div> : null
                            }
                            {
                                data.showSecond ? <div>111111111111111</div> : null
                            }
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}
export default PersonalInfoSure;