import React from 'react';
import {TreeSelect,Button,Table} from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
class ProductM extends React.Component{
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
                key: 'name',
            },
            {
                title: '服务状态',
                dataIndex: 'serviceState',
                key: 'serviceState',
            },
            {
                title: '服务状态',
                dataIndex: 'serviceState',
                key: 'serviceState',
            },
            {
                title: '总体',
                dataIndex: 'population',
                key: 'population',
            },
            {
                title: '处理器',
                dataIndex: 'cpu',
                key: 'cpu',
            },
            {
                title: '错题源',
                dataIndex: 'errorSource',
                key: 'errorSource',
            },
            {
                title: '服务',
                dataIndex: 'service',
                key: 'service',
            },
            {
                title: '文档交付',
                dataIndex: 'documentDelivery',
                key: 'documentDelivery',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '其他信息',
                dataIndex: 'otherMsg',
                key: 'otherMsg',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
            },
        ]
        const dataSource = []
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
                <div style={{marginTop:30}}>
                    <Table columns={columns}
                            bordered={true}
                            pagination={false}
                            dataSource={dataSource}
                            scroll={{x:false,y:300}}
                                />
                </div>
            </div>
        )
    }
}

export default ProductM;