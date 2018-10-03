import React from 'react';
import {Select,Button,Table,Menu, Dropdown, Icon} from 'antd';
import CityCommon from '../Common/cityCommon.js'
import GradeClassCommon from '../Common/gradeclassCommon.js';
const {Option} = Select;
class Step2 extends React.Component {
    constructor(props){
        super();
        this.state = {
            students : props.students,
            showNew :　props.showNew,
            nums : props.nums,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            students : nextProps.students,
            showNew : nextProps.showNew,
            nums : nextProps.nums
        })
    }
    sureHandle(){
        this.props.step2SureHandle()
    }
    everyChange(index,value){
        this.props.everyChange(index,value)
    }
    render(){
        const {students,showNew,nums} = this.state;
        let menus = [],newChildren = [];
        for(let i=2;i<=10;i++){
            menus.push(
                 <Menu.Item key={i}>{i}</Menu.Item>
          )
        }
        const menu = (
            <Menu onClick={this.props.newHandle}>
                {menus}
            </Menu>
          );
        
          for(let i=1;i<=nums;i++){
            newChildren.push(
                <Option value={i} key={i}>{i}</Option>
          )
        }

        let total = students.total;
        let columns = [
            {
                title:'学习号',
                dataIndex : 'learnID',
                key : 'learnID',
                width : '20%'
            },
            {
                title:<span>姓名(总计<span style={{color:'#108ee9'}}>{total}</span>人)</span>,
                dataIndex : 'name',
                key : 'name',
                width:'20%'
            },
            {
                title:'现有分层情况',
                dataIndex : 'now',
                key : 'now',
                width:'30%',
                sorter: (a, b) =>a.now-b.now,
            },
            {
                title:<span>新层级设定<span className='newClass'><Dropdown overlay={menu} trigger={['click']}>
                                                <a className="ant-dropdown-link" href="">
                                                新层数 <Icon type="down" />
                                                </a>
                                            </Dropdown></span></span>,
                dataIndex : 'new',
                key : 'new',
                width : '30%'
            }
        ]
        let dataSource = []
        students.learnIDs.map((item,index)=>{
            dataSource.push({
                key : index,
                learnID : item.learnID,
                name : item.name,
                now : item.level === -1 ? '/' : item.level,
                // new :  showNew ? <Dropdown overlay={menu_1} trigger={['click']}>
                //                     <a className="ant-dropdown-link" href="">
                //                     层级序号 <Icon type="down" />
                //                     </a>
                //                 </Dropdown> : ''
                new : showNew ? <Select style={{width:120}} onChange={this.everyChange.bind(this,index)}>
                                    {newChildren}
                                </Select> : null
            })
        })
        return(
                <div style={{textAlign:'center'}}>
                    <Table columns={columns}
                            bordered={true}
                            pagination={false}
                            dataSource={dataSource}
                            scroll={{x:false,y:300}}
                                />
                    <Button type='primary' 
                            size='large' 
                            style={{width:300,marginTop:50}}
                            onClick={this.sureHandle.bind(this)}>确认</Button>
                </div>
        )
    }
}

export default Step2;