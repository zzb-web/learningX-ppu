import React from 'react';
import {Col,Row,TreeSelect} from 'antd';
import ProductMComponent from '../../components/ProductM/index.js';
import {Get} from '../../fetch/data.js';
class ProductM extends React.Component{
    state = {
        value: ['0-0-0'],
      }
      onChange = (value) => {
        console.log('onChange ', value, arguments);
        this.setState({ value });
      }
      queryHandle(){
          const {value} = this.state;
          console.log(value)
          let epu1=false,epu2=false,epu3=false,upscale=false,normal=false,business=false;
          if(value.indexOf('0-0')!==-1){
            epu1=true;
            epu2=true;
            epu3=true;
          }
          if(value.indexOf('0-1') !==-1){
            upscale=true;
            normal=true;
            business=true;
          }
          if(value.indexOf('0-0-0') !==-1){
            epu1=true;
          }
          if(value.indexOf('0-0-1') !==-1){
            epu2=true;
          }
          if(value.indexOf('0-0-2') !==-1){
            epu3=true;
          }
          if(value.indexOf('0-1-0') !==-1){
            upscale = true
          }
          if(value.indexOf('0-1-1') !==-1){
            normal = true
          }
          if(value.indexOf('0-1-2') !==-1){
            business = true
          }
          let msg = `epu1=${epu1}&epu2=${epu2}&epu3=${epu3}&upscale=${upscale}&normal=${normal}&business=${business}`;
          Get(`/api/v3/staffs/products/?${msg}`).then(resp=>{
              console.log(resp)
          })
      }
    render(){
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <ProductMComponent 
                            onChange={this.onChange.bind(this)}
                            queryHandle={this.queryHandle.bind(this)}
                            value={this.state.value}/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

export default ProductM;