import React from 'react';
import {InputNumber,Select,Button} from 'antd';
const {Option} = Select;
class AddService extends React.Component{
    render(){
        return(
            <div style={{width:'100%',height:100,marginTop:20}}>
                <div className='title-3'>附加服务:</div>
                <div className='title-3-content'>
                    <Button style={{width:200,border:'1px solid rgb(0, 153, 255)',marginLeft:70}}>＋服务点</Button>
                </div>
            </div>
        )
    }
}

export default AddService;