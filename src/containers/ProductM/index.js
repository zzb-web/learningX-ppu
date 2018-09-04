import React from 'react';
import {Col,Row,TreeSelect} from 'antd';
import ProductMComponent from '../../components/ProductM/index.js';
import {Get,Put} from '../../fetch/data.js';
class ProductM extends React.Component{
    state = {
        value: ['0-0-0'],
        productData : [],
        showTable : false
      }
      onChange = (value) => {
        this.setState({ value });
      }
      queryHandle(){
          const {value} = this.state;
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
              if(resp.status=== 200){
                this.setState({
                  productData : resp.data,
                  showTable :true
                })
              }
          })
      }
      operaHandle(data,value){
        const productID = data[0]
        if(value === 1){
          this.props.setKey('2',1,productID)
        }else if(value === 2){
          this.props.setKey('2',2,productID)
        }else{
          let msg = {
            status : !data[1]
          }
          Put(`/api/v3/staffs/products/${productID}/status/`,msg).then(resp=>{
            if(resp.status === 200){
              this.queryHandle()
            }
          })
        }
      }
    render(){
      const {productData,value,showTable} = this.state;
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <ProductMComponent 
                            onChange={this.onChange.bind(this)}
                            queryHandle={this.queryHandle.bind(this)}
                            operaHandle={this.operaHandle.bind(this)}
                            value={value}
                            productData={productData}
                            showTable={showTable}/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

export default ProductM;