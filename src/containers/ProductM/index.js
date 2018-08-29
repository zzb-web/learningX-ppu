import React from 'react';
import {Col,Row,TreeSelect} from 'antd';
import ProductMComponent from '../../components/ProductM/index.js';
class ProductM extends React.Component{
    state = {
        value: ['0-0-0'],
      }
      onChange = (value) => {
        console.log('onChange ', value, arguments);
        this.setState({ value });
      }
    render(){
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <ProductMComponent 
                            onChange={this.onChange.bind(this)}
                            value={this.state.value}/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

export default ProductM;