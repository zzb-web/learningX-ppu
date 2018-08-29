import React from 'react';
import {TreeSelect,Button} from 'antd';
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
        return(
            <div>
                <div>
                    <span className='title-1'>筛选:</span>
                    <span style={{marginLeft:10}}>
                        <TreeSelect {...tProps} />
                    </span>
                    <Button type='primary' style={{width:180,marginLeft:30}}>查询</Button>
                </div>  
            </div>
        )
    }
}

export default ProductM;