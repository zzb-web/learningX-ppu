import React from 'react';
import {InputNumber,Select,Button} from 'antd';
const {Option} = Select;
class Detail extends React.Component{
    render(){
        return(
            <div style={{width:'100%',height:200,marginTop:20}}>
                <div className='title-detail'>详情:</div>
                <div className='title-detail-content'>
                    <div>{this.props.msg}</div>
                    <Button type='primary' 
                            style={{width:120,position:'absolute',bottom:10,right:'7%'}}
                            onClick={this.props.submitHandle}
                            >提交</Button>
                </div>
            </div>
        )
    }
}

export default  Detail;