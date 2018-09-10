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
        const treeData = [
            {
                label: 'EPU',
                value: '0-0',
                key: '0-0',
                children: [
                    {
                        label: 'EPU1',
                        value: '0-0-0',
                        key: '0-0-0',
                    },
                    {
                        label: 'EPU2',
                        value: '0-0-1',
                        key: '0-0-1',
                    },
                    {
                        label: 'EPU3',
                        value: '0-0-2',
                        key: '0-0-2',
                    }
                ],
            },
             {
                label: '产品对象',
                value: '0-1',
                key: '0-1',
                children: [
                    {
                        label: '高端试点',
                        value: '0-1-0',
                        key: '0-1-0',
                    },
                    {
                        label: '普通试点',
                        value: '0-1-1',
                        key: '0-1-1',
                    },
                    {
                        label: '商业应用',
                        value: '0-1-2',
                        key: '0-1-2',
                    },
                    {
                        label: '共享应用',
                        value: '0-1-3',
                        key: '0-1-3',
                    }
                ],
            }
        ];
        const tProps = {
            treeData,
            value: this.props.value,
            onChange: this.props.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
              width: 300
            },
          };
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
        return(
            <div>
                <div>
                    <span className='title-1'>筛选:</span>
                    <span style={{marginLeft:10}}>
                        <TreeSelect {...tProps} />
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