import React from 'react';
import {Row,Col,Select,Button,Table} from 'antd';
const {Option} = Select;
export default class Step3Component extends React.Component{
    constructor(props){
        super();
        this.state = {
            totalLevel : props.totalLevel,
            showDetail : props.showDetail,
            showTable : props.showTable
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
    }
    render(){
        const {totalLevel,showDetail,showTable} = this.state;
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

        const terms = ['全部','7上','7下','8上','8下','9上','9下']
        const tremChildren = [];
        terms.map((item,index)=>{
            tremChildren.push(
                <Option value={item} key={index}>{item}</Option>
            )
        })

        const sections = [];
        const sectionsChildren = [];
        sections.map((item,index)=>{
            sectionsChildren.push(
                <Option value={item} key={index}>{item}</Option>
            )
        })

        const parts = [];
        const partsChildren = [];
        parts.map((item,index)=>{
            partsChildren.push(
                <Option value={item} key={index}>{item}</Option>
            )
        })

        const types = [];
        const typesChildren = [];
        types.map((item,index)=>{
            typesChildren.push(
                <Option value={item} key={index}>{item}</Option>
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
                title: 'xx考试概率',
                dataIndex: 'rate',
                key: 'rate',
                width:'15%'
            },
            {
                title: '操作',
                dataIndex: 'operatin',
                key: 'operatin',
                width:'15%'
            },
        ];

        const dataSource = [];

        return(
            
            <div>
                <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <div>
                        <span className='book-title'>层级序号:</span>
                        <Select style={{width:300,marginLeft:20}}
                                onChange={this.props.selectLevel}>
                            {children}
                        </Select>

                        <span className='book-title'>目标:</span>
                        <Select style={{width:300,marginLeft:20}}
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
                                                <Select style={{width:300,marginLeft:20}}
                                                        onChange={this.props.selectTerm}>
                                                    {tremChildren}
                                                </Select>

                                                <span className='book-title'>章:</span>
                                                <Select style={{width:300,marginLeft:20}}
                                                        onChange={this.props.selectSection}>
                                                    {sectionsChildren}
                                                </Select>

                                                <span className='book-title'>节:</span>
                                                <Select style={{width:300,marginLeft:20}}
                                                        onChange={this.props.selectPart}>
                                                    {partsChildren}
                                                </Select>
                                            </div>   
                                            <div style={{marginTop:30}}>
                                                <span className='book-title'>题型名称:</span>
                                                <Select style={{width:300,marginLeft:20}}
                                                        onChange={this.props.selectType}>
                                                    {typesChildren}
                                                </Select>

                                                <Button type='primary' 
                                                        style={{width:120,marginLeft:500}}
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
                                                    scroll={{x:false,y:300}}
                                                        />
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