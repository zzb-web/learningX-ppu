import React from 'react';
import {TreeSelect,Button,Table, Select, Menu, Dropdown,Icon} from 'antd';
const {Option} = Select;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const EPUs = ['EPU1','EPU2']

class ProductM extends React.Component{
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D;
    }
    operationHandle(data,value){
        this.props.operaHandle(data,value.key)
    }
    render(){
        const columns = [
            {
                title: '产品编号/设计日期',
                dataIndex: 'productNum',
                key: 'productNum',
                width:'13%'
            },
            {
                title: '服务状态',
                dataIndex: 'serviceState',
                key: 'serviceState',
                width:'10%'
            },
            {
                title: '总体',
                dataIndex: 'population',
                key: 'population',
                width:'8%'
            },
            {
                title: '处理器',
                dataIndex: 'cpu',
                key: 'cpu',
                width:'12%'
            },
            {
                title: '错题源',
                dataIndex: 'errorSource',
                key: 'errorSource',
                width:'10%'
            },
            {
                title: '服务',
                dataIndex: 'service',
                key: 'service',
                width:'13%'
            },
            {
                title: '文档交付',
                dataIndex: 'documentDelivery',
                key: 'documentDelivery',
                width:'8%'
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                width:'8%'
            },
            {
                title: '其他信息',
                dataIndex: 'otherMsg',
                key: 'otherMsg',
                width:'8%'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width:'10%'
            }
        ]
        const dataSource = []
        const {productData,showTable,operaValue} = this.props;
        productData.map((item,index)=>{
            let menu = (
                <Menu onClick={this.operationHandle.bind(this,[item.productID,item.status])}>
                  <Menu.Item key={1}>产品修改</Menu.Item>
                  <Menu.Item key={2}>叠加新品</Menu.Item>
                  <Menu.Item key={3}>{item.status ? '停止' :'运行'}</Menu.Item>
                </Menu>
              );
            dataSource.push({
                key : item.productID,
                productNum : <div>
                                <div>{item.productID}</div>
                                <div>{this.timestampToTime(item.date)}</div>
                            </div>,
                serviceState : <span style={item.status?{color:'#48D61D'}:{color:'#FF3547'}}>{item.status?'运行':'停止'}</span>,
                population :<div>
                                <div>{item.name}</div>
                                <div>{item.level}</div>
                                <div>{item.object}</div>
                            </div>,
                cpu : <div>
                          <div>EPU : {EPUs[item.epu-1]}</div>
                          <div>题量 : {item.problemMax}</div>
                          <div>纸张 : {item.pageType}</div>
                      </div>,
                errorSource: <div>
                                <div>{item.problemSource[0]}</div>
                                <div>{item.problemSource[1]}</div>
                                <div>{item.problemSource[2]}</div>
                            </div>,
                service : <div>
                            <div>{item.serviceType}</div>
                            <div>{item.serviceLauncher}</div>
                            <div>{this.timestampToTime(item.serviceStartTime)}~{this.timestampToTime(item.serviceEndTime)}</div>
                          </div>,
                documentDelivery : <div>
                                        <div>{item.deliverType}</div>
                                        <div>第{item.deliverPriority}</div>
                                    </div>,
                price : item.price,
                otherMsg : <div>
                                <div>{item.subject}</div>
                                <div>{item.grade}年级</div>
                            </div>,
                operation :  <Dropdown overlay={menu}>
                                <a style={{color:'rgb(0, 153, 255)'}}>
                                操作 <Icon type="down" />
                                </a>
                            </Dropdown>
            })
        })
        const objects = ['高端试点','普通试点','商业应用','共享应用','全部'];
        return(
            <div>
                <div>
                    <span className='title-1'>筛选:</span>
                    <span style={{marginLeft:10}}>
                        <Select style={{width:150}} 
                                placeholder='请选择EPU'
                                onChange={this.props.onEPUChange}>
                            <Option value='1'>EPU1</Option>
                            <Option value='2'>EPU2</Option>
                            <Option value='-1'>全部</Option>
                        </Select>
                        <Select style={{width:150,marginLeft:30}} 
                                placeholder='请选择产品对象'
                                onChange={this.props.onObjectChange}>
                            {objects.map((item,index)=><Option key={index} value={item}>{item}</Option>)}
                        </Select>
                    </span>
                    <Button type='primary' 
                            style={{width:180,marginLeft:30}}
                            onClick={this.props.queryHandle}>查询</Button>
                </div>  
                {showTable ? <div style={{marginTop:30}}>
                    <Table columns={columns}
                            bordered={true}
                            pagination={false}
                            dataSource={dataSource}
                            scroll={{x:false,y:300}}
                                />
                </div> : null}
            </div>
        )
    }
}

export default ProductM;