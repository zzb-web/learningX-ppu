import React from 'react';
import {Row,Col} from 'antd';

class LayeredConfig extends React.Component {
    render(){
        return(
                <Row>
                    <Col span={1}></Col>
                    <Col span={8}></Col>
                    <Col span={15}></Col>
                </Row>
        )
    }
}

export default LayeredConfig;