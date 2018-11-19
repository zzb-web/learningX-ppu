import React from 'react';
import {Row,Col,Select,Button,Table,Input,Menu,Dropdown,Icon} from 'antd';
const {Option} = Select;
export default class Step3Component extends React.Component{
    constructor(props){
        super();
        this.state = {
            totalLevel : props.totalLevel,
            showDetail : props.showDetail,
            showTable : props.showTable,
            sections : props.sections,
            currentSections : props.currentSections,
            defaultSections : props.defaultSections,
            targetsData : props.targetsData,
            target : props.target
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.totalLevel !== this.state.totalLevel){
            this.setState({
                totalLevel : nextProps.totalLevel
            })
        }
        if(nextProps.showDetail !== this.state.showDetail){
            this.setState({
                showDetail : nextProps.showDetail
            })
        }
        if(nextProps.showTable !== this.state.showTable){
            this.setState({
                showTable : nextProps.showTable
            })
        }
        if(nextProps.selectPart !== this.state.selectTarget){
            this.setState({
                target : nextProps.target
            })
        } 
        this.setState({
            sections : nextProps.sections,
            currentSections : nextProps.currentSections,
            defaultSections : nextProps.defaultSections,
            targetsData : nextProps.targetsData,
        })
    }
    operationHandle(data,value){
        this.props.operationHandle(data,value)
    }
    render(){
        const {totalLevel,showDetail,showTable,sections,currentSections,defaultSections,targetsData,target} = this.state;
        let children = [];
        for(let i=1;i<=totalLevel;i++){
            children.push(
                <Option value={i} key={i}>{i}</Option>
            )
        }

        const targets = ['单元考试','期中考试','期末考试','中考']
        let targetChildren = [];
        targets.map((item,index)=>{
            targetChildren.push(
                <Option value={item} key={index}>{item}</Option>
            )
        })

        const terms = ['全部','七上','七下','八上','八下','九上','九下']
        const tremChildren = [];
        terms.map((item,index)=>{
            tremChildren.push(
                <Option value={item} key={index}>{item}</Option>
            )
        })

        const sectionsChildren = [];
        sections.map((item,index)=>{
            sectionsChildren.push(
                <Option value={item} key={index}>{`第${item.split('_')[1]}章`}<span style={{marginLeft:10}}>{item.split('_')[0]}</span></Option>
            )
        })

        const partsChildren = [];
        currentSections.map((item,index)=>{
            partsChildren.push(
                <Option value={item} key={index}>{`第${item.split('_')[1]}节`}<span style={{marginLeft:10}}>{item.split('_')[0]}</span></Option>
            )
        })


        const columns = [
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width:'10%'
            },
            {
                title: '章序号',
                dataIndex: 'numberSection',
                key: 'numberSection',
                width:'10%'
            },
            {
                title: '节序号',
                dataIndex: 'numberPart',
                key: 'numberPart',
                width:'10%'
            },
            {
                title: '题型名称',
                dataIndex: 'type',
                key: 'type',
                width:'20%'
            },
            {
                title: '最新原始知识点',
                dataIndex: 'new',
                key: 'new',
                width:'20%'
            },
            {
                title: `${target}概率`,
                dataIndex: 'rate',
                key: 'rate',
                width:'15%'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width:'15%'
            },
        ];

        const dataSource = [];
        targetsData.map((item,index)=>{
            let menu = (
                <Menu onClick={this.operationHandle.bind(this,item)}>
                  <Menu.Item key={1}>详情</Menu.Item>
                  <Menu.Item key={2}>加入</Menu.Item>
                  <Menu.Item key={3}>删除</Menu.Item>
                </Menu>
              );
            dataSource.push({
                key : index,
                status : item.status ? <span style={{color:'#108ee9'}}>已加入</span> : <span style={{color:'red'}}>未加入</span>,
                numberSection : item.chapter,
                numberPart : item.section,
                type : item.typename,
                new : item.originalKP,
                operation : <Dropdown overlay={menu}>
                                <a style={{color:'rgb(0, 153, 255)'}}>
                                选择操作 <Icon type="down" />
                                </a>
                            </Dropdown>
            })
        })
        let menu_fast = (
            <Menu onClick={this.props.fastHandle}>
              <Menu.Item key={1}>仅显示已加入</Menu.Item>
              <Menu.Item key={2}>仅显示未加入</Menu.Item>
              <Menu.Item key={3}>全部加入规划</Menu.Item>
              <Menu.Item key={4}>全部删除规划</Menu.Item>
            </Menu>
          );
        return(
            
            <div>
                <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <div>
                        <span className='book-title'>层级序号:</span>
                        <Select style={{width:200,marginLeft:20}}
                                onChange={this.props.selectLevel}>
                            {children}
                        </Select>

                        <span className='book-title'>目标:</span>
                        <Select style={{width:200,marginLeft:20}}
                                onChange={this.props.selectTarget}>
                            {targetChildren}
                        </Select>

                        <Button type='primary' 
                                style={{width:120,marginLeft:50}}
                                onClick={this.props.toPlan}>去规划</Button>
                    </div>
                    <div className='line'></div>
                    <div>
                        {
                            showDetail ? <div style={{marginTop:30}}>
                                            <div>
                                                <span className='book-title'>学期:</span>
                                                <Select style={{width:200,marginLeft:20}}
                                                        onChange={this.props.selectTerm}>
                                                    {tremChildren}
                                                </Select>

                                                <span className='book-title'>章:</span>
                                                <Select style={{width:200,marginLeft:20}}
                                                        onChange={this.props.selectSection}>
                                                    {sectionsChildren}
                                                </Select>

                                                <span className='book-title'>节:</span>
                                                <Select style={{width:200,marginLeft:20}}
                                                        value={defaultSections===''?currentSections[0]:defaultSections}
                                                        onChange={this.props.selectPart}>
                                                    {partsChildren}
                                                </Select>
                                            </div>   
                                            <div style={{marginTop:30}}>
                                                <span className='book-title'>题型名称:</span>
                                                <Input style={{width:200,marginLeft:20}} onChange={this.props.selectType}/>

                                                <Button type='primary' 
                                                        style={{width:120,marginLeft:330}}
                                                        onClick={this.props.searchHandle}>搜索</Button>
                                            </div>
                                        </div> : null
                        }
                    </div>
                    <div>
                        {
                            showTable ? <div style={{marginTop:30}}>
                                             <Table columns={columns}
                                                    bordered={true}
                                                    pagination={false}
                                                    dataSource={dataSource}
                                                    scroll={{x:false,y:200}}
                                                        />
                                        <div style={{marginTop:30}}>
                                            <Dropdown overlay={menu_fast}>
                                                <Button type='primary' 
                                                        style={{width:120,float:'right',marginRight:30}}
                                                        >
                                                            快捷操作 <Icon type="down" />
                                                            </Button>
                                            </Dropdown>
                                        </div>
                                        </div> : null
                        }
                    </div>
                </Col>
                <Col span={1}></Col>
            </Row>
            </div>
        )
    }
}