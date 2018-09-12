import React from 'react';
import {Col,Row,TreeSelect} from 'antd';
import ProductMComponent from '../../components/ProductM/index.js';
import {Get,Put} from '../../fetch/data.js';
class ProductM extends React.Component{
    state = {
        productData : [],
        showTable : false,
        operaValue : '',
        epuValue : '',
        objectValue : ''
      }
      onEPUChange(value){
        this.setState({
          epuValue : value
        })
      }
      onObjectChange(value){
        if(value === '全部'){
          value = 'all'
        }
        this.setState({
          objectValue : value
        })
      }
      queryHandle(){
          const {epuValue,objectValue} = this.state;
          
          let msg = `epu=${epuValue}&object=${objectValue}`;
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
        if(value === '1'){
          this.props.setKey('2',1,productID)
        }else if(value === '2'){
          this.props.setKey('2',2,productID)
        }else{
          let msg = {
            status : !data[1]
          }
          Put(`/api/v3/staffs/products/${productID}/status/`,msg).then(resp=>{
            if(resp.status === 200){
              this.queryHandle()
              this.setState({
                operaValue : ''
              })
            }
          })
        }
      }
    render(){
      const {productData,value,showTable,operaValue} = this.state;
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <ProductMComponent 
                            onEPUChange={this.onEPUChange.bind(this)}
                            onObjectChange={this.onObjectChange.bind(this)}
                            queryHandle={this.queryHandle.bind(this)}
                            operaHandle={this.operaHandle.bind(this)}
                            value={value}
                            operaValue={operaValue}
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