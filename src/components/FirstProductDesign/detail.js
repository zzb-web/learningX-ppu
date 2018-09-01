import React from 'react';
import {InputNumber,Select,Button} from 'antd';
const {Option} = Select;
class Detail extends React.Component{
    render(){
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>详情:</div>
                <div className='title-detail-content'>
                    <div style={{marginTop:20}}>
                        <span>产品编号:</span>
                    </div>
                    <Button type='primary' 
                            style={{width:120,position:'absolute',bottom:10,right:'7%'}}
                            >提交</Button>
                </div>
            </div>
        )
    }
}

export default  Detail;