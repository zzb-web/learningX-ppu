import React from 'react';
import {Select,Button,Input,Modal,message} from 'antd';
import {Get,Put} from '../../fetch/data.js';
import moment from 'moment';
const {Option} = Select;
const {confirm} = Modal;
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D;
}


class Step2 extends React.Component{
    constructor(props){
        super();
        this.state={
            schoolID : props.data.schoolID,
            grade : props.data.grade,
            msgClass : props.data.msgClass,
            allProductId : props.data.allProductId,
            curProductIDs : props.data.curProductID,
            newProducts : props.data.newProducts,
            hasSelectId : [''],
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            allProductId : nextProps.data.allProductId,
            curProductIDs : nextProps.data.curProductID
        })
    }
    newProductChoose(num,id){
        let {hasSelectId} = this.state;
        hasSelectId[num] = id;
        this.setState({
            hasSelectId : hasSelectId
        })
    }

    addNewProduct(){
        const {hasSelectId} = this.state;
        hasSelectId.push('');
        this.setState({
            newProducts : hasSelectId
        })
    }
    submitHandle(){
        this.showConfirm()
    }
    showConfirm() {
        const that = this;
        confirm({
          title: '必须进行产品配置检查',
          content: '你确定产品配置OK?',
          onOk() {
            that.submitOK()
          },
          onCancel() {
            
          },
        });
    }


    submitOK(){
        let {hasSelectId,schoolID,grade,msgClass,curProductIDs} = this.state;
        curProductIDs = curProductIDs.concat(hasSelectId);
        let putIds = [];
        curProductIDs.map((item,index)=>{
            if(item!==''){
                putIds.push(item);
            }
        })
        let msg = {
            schoolID:schoolID,
            grade: grade,
            class: msgClass,  
            productID: putIds,
         }   
         Put(`/api/v3/staffs/classes/productID/`,msg).then(resp=>{
            if(resp.status ===200){
                message.success('操作成功');
                const {curProductIDs} = this.state;
                hasSelectId.map((item,index)=>{
                    if(curProductIDs.indexOf(item) === -1 && item!==''){
                        curProductIDs.push(item)
                    }
                })
                this.setState({
                    curProductIDs : curProductIDs,
                    hasSelectId : []
                })
            }else{
                message.error('操作失败');
            }
         }).catch(err=>{

         })
    }
    deleteUser(curProductID,idx){
        const {curProductIDs} = this.state;
        curProductIDs.splice(idx,1);
        console.log(curProductIDs)
        this.setState({
            curProductIDs : curProductIDs
        })
    }
    deleteNew(num,id){
        let {hasSelectId} = this.state;
        hasSelectId.splice(num,1)
        this.setState({
            hasSelectId : hasSelectId
        })
    }
    render(){
        const {newProducts,allProductId,hasSelectId,curProductIDs} = this.state;
        var curProductChildren = [];
        curProductIDs.map((item,index)=>{
            curProductChildren.push(
                <UseProduct key={index}
                            idx={index}
                            curProductID={item}
                            deleteUser={this.deleteUser.bind(this)}/>
            )
        })

        var NewProductChildren = [];
        console.log('??????????????sssssss',hasSelectId)
        hasSelectId.map((item,index)=>{
            NewProductChildren.push(
                <NewProduct allProductId={allProductId} 
                            key={index} 
                            num={index}
                            hasSelectId={hasSelectId}
                            curProductID={item}
                            deleteNew={this.deleteNew.bind(this)}
                            newProductChoose={this.newProductChoose.bind(this)}/>
            )
        })

        return(
            <div>
              <div style={{width:'100%',height:450,overflow:'auto'}}>
                 {
                     curProductChildren
                 }
                 {
                   NewProductChildren
                }
              </div>
              <div>
                <Button style={{width:160,marginTop:20,marginLeft:120}}
                        onClick={this.addNewProduct.bind(this)}>+产品</Button>
              </div>
              <Button type='primary'
                                style={{width:160,marginTop:20,float:'right'}}
                                onClick={this.submitHandle.bind(this)}
                                >提交</Button>
            </div>
        )
    }
}

export default Step2;

class UseProduct extends React.Component{
    constructor(props){
        super();
        this.state={
            showCur : false,            
            productData :  {
                problemCode:'E',
                gradation:1,
                depth:1,
                name: '', 
                level: '', 
                object: '',
                epu: 0,
                problemMax: '',
                pageType: 'A4',
                problemSource : [],
                serviceType: '',
                serviceLauncher: '', 
                serviceStartTime: (moment()/1000).valueOf(),
                serviceEndTime: (moment()/1000).valueOf(), 
                serviceTimes: 0,
                serviceDuration: '',
                deliverType: '',
                deliverPriority: '', 
                deliverTime: [{
                    day: '', 
                    time:'',
                },{
                    day: '',
                    time:''
                },{
                    day: '',
                    time:'',
                }],
                deliverExpected: '',
                price: '',
                subject: '',
                grade: '',
                wrongProblemStatus : 0,
                problemType : [],
                sameTypeMax : 0,
                sameTypeSource :[],
                columnCount: '' ,
                borderControl: '',
                exceptionHandler : ''
            },
            curProductID : props.curProductID,
            idx :props.idx
        }
    }
    componentWillMount(){
        const {curProductID} = this.props;
        this.getProductMsg(curProductID);
    }
    componentWillReceiveProps(nextProps){
        const {curProductID} = nextProps;
        if(curProductID != this.state.curProductID){
            this.getProductMsg(curProductID);
        }
        this.setState({
            idx : nextProps.idx,
            curProductID : curProductID,
        })
    }

    getProductMsg(curProductID){
        console.log('???????',curProductID)
        Get(`/api/v3/staffs/products/${curProductID}/`).then(resp=>{
            if(resp.status === 200){
                if(resp.data.length !== 0){
                    this.setState({
                        productData : resp.data,
                        showCur : true
                      })
                }
            }else{
                this.setState({
                    showCur : false,
                })
            }
        })
    }
    delete(){
        const {curProductID,idx} = this.props;
        this.props.deleteUser(curProductID,idx)
    }
    render(){
        const {showCur,curProductID} = this.state;
        const {gradation,depth,name,level,object,epu,problemMax,pageType,problemSource ,serviceType,serviceLauncher,
            serviceStartTime,serviceEndTime,deliverType,deliverPriority,deliverTime,
            deliverExpected,price,subject,grade,status,wrongProblemStatus,problemType,sameTypeMax,sameTypeSource,
            columnCount,borderControl,exceptionHandler} = this.state.productData;
            const EPUs = ['EPU1','EPU2','EPU3']
            const gradations = ['第1层 题目','第2层 过程','第3层 引导'];
            const depths = ['第1代 错题','第2代 类型','第3代 考试'];
            const weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            const errStatus = ['现在仍错的题','曾经错过的题'];
            const handles = ['全部标记为√再生成','全部标记为×再生成','不生成'];
            let deliverTimeMsg = '';
        deliverTime.map((item,index)=>{
            if(item.day !== '' && item.time !== ''){
            deliverTimeMsg =deliverTimeMsg +`${weeks[item.day]}_${item.time} `;
            }
        })
    

        let deliverMsg = '';
        if(deliverType === '立即交付'){
            deliverMsg = `交付优先:第0`
        }else if(deliverType === '节点交付'){
            deliverMsg = `交付优先:第${deliverPriority}/交付节点:${deliverTimeMsg}`
        }else{
            deliverMsg = `交付优先:第${deliverPriority}/交付预期:${deliverExpected}小时以内`
        }

        return(
                <div className='person-content' style={{marginTop:10,height:'auto'}}>
                    <div className='person-select' style={{border:'none'}}>
                        <div>
                        <span>产品编号:</span>
                        <Input disabled 
                                value={curProductID}
                                style={{width:160,marginLeft:20}}/>
                        </div>
                        <div>
                            <Button style={{marginLeft:80,marginTop:20}}
                                    onClick={this.delete.bind(this)}>删除</Button>
                        </div>
                    </div>
                    <div className='person-detail'>
                        <div style={{float:'left'}}>产品详情</div>
                        {showCur ? 
                        <div className='person-msg'>
                            <div>服务状态:{status?<span style={{color:'#48D61D'}}>运行</span>:<span style={{color:'#FF3547'}}>停止</span>}</div>
                            <div><span>问题:错题学习</span></div>
                            <div>{`层次:${gradations[gradation-1]}`}</div>
                            <div>{`深度:${depths[depth-1]}`}</div>
                            <div>{`总体:产品名称:${name}/产品级别:${level}/产品对象:${object}`}</div>
                            {
                                epu === 3 ? <div>{`处理器:EPU:${EPUs[epu-1]}/题量控制:${problemMax}/错题状态:${errStatus[wrongProblemStatus-1]}
                                /题目种类:${problemType}/同类题量:${sameTypeMax}/同类来源:${sameTypeSource}`}</div>:
                                <div>{`处理器:EPU:${EPUs[epu-1]}/题量控制:${problemMax}/纸张大小:${pageType}`}</div>
                            }
                            <div>{`错题源:${problemSource}`}</div>
                            {
                                epu === 3 ? <div>{`文档形式:纸张大小:${pageType}/分数栏:${columnCount}/边界控制:${borderControl}`}</div> : null
                            }
                            <div>{`服务:服务类型:${serviceType}/服务发起:${serviceLauncher}/
        服务时段:${timestampToTime(serviceStartTime)}~${timestampToTime(serviceEndTime)}`}</div>
                            <div>{`文档交付:交付类型:${deliverType}/${deliverMsg}`}</div>
                            {
                                epu === 3 ? <div>{`异常处理:${handles[exceptionHandler-1]}`}</div> : null
                            }
                            <div>{`价格:${price}元`}</div>
                            <div>{`其他信息:学科:${subject}/年级:${grade}`}</div>
                        </div> : <div className='person-msg'></div>}
                    </div>
                </div>
        )
    }
}


class NewProduct extends React.Component{
    constructor(props){
        super();
        this.state={
            hasSelectId : props.hasSelectId,
            productData :  {
                problemCode:'E',
                gradation:1,
                depth:1,
                name: '', 
                level: '', 
                object: '',
                epu: 0,
                problemMax: '',
                pageType: 'A4',
                problemSource : [],
                serviceType: '',
                serviceLauncher: '', 
                serviceStartTime: (moment()/1000).valueOf(),
                serviceEndTime: (moment()/1000).valueOf(), 
                serviceTimes: 0,
                serviceDuration: '',
                deliverType: '',
                deliverPriority: '', 
                deliverTime: [{
                    day: '', 
                    time:'',
                },{
                    day: '',
                    time : ''
                },{
                    day: '',
                    time:'',
                }],
                deliverExpected: '',
                price: '',
                subject: '',
                grade: '',
                wrongProblemStatus : 0,
                problemType : [],
                sameTypeMax : 0,
                sameTypeSource :[],
                columnCount: '' ,
                borderControl: '',
                exceptionHandler : ''
            },
            num : props.num,
            id : '',
            curProductID : ''
        }
    }
    componentWillMount(){
        const {curProductID} = this.props;
        if(curProductID !==''){
            this.getProductMsg(curProductID)
        }
        this.setState({
            curProductID : curProductID
        })
    }
    componentWillReceiveProps(nextProps){
        const {curProductID} = nextProps;
        if(curProductID !== this.state.curProductID){
            if(curProductID !== ''){
                this.getProductMsg(curProductID)
            }
        }
        this.setState({
            hasSelectId : nextProps.hasSelectId,
            num : nextProps.num,
            curProductID : curProductID
        })
    }
    getProductMsg(id){
        Get(`/api/v3/staffs/products/${id}/`).then(resp=>{
            if(resp.status === 200){
                if(resp.data.length !== 0){
                    this.setState({
                        productData : resp.data,
                        showNew : true
                      })
                }
            }else{
                this.setState({
                    showNew : false
                })
            }
        })
    }
    newProductChoose(num,id){
        this.props.newProductChoose(num,id)
        Get(`/api/v3/staffs/products/${id}/`).then(resp=>{
            if(resp.status === 200){
                if(resp.data.length !== 0){
                    this.setState({
                        productData : resp.data,
                        showNew : true,
                        id : id
                      })
                }
            }else{
                this.setState({
                    showNew : false
                })
            }
        })
    }
    deleteNew(){
        const {num,id} = this.state;
        this.props.deleteNew(num,id);
    }
    render(){
        const {allProductId,num} = this.props;
        const {hasSelectId,showNew,curProductID} = this.state;

        const {gradation,depth,name,level,object,epu,problemMax,pageType,problemSource ,serviceType,serviceLauncher,
            serviceStartTime,serviceEndTime,deliverType,deliverPriority,deliverTime,
            deliverExpected,price,subject,grade,status,wrongProblemStatus,problemType,sameTypeMax,sameTypeSource,
            columnCount,borderControl,exceptionHandler} = this.state.productData;
            const EPUs = ['EPU1','EPU2','EPU3']
            const gradations = ['第1层 题目','第2层 过程','第3层 引导'];
            const depths = ['第1代 错题','第2代 类型','第3代 考试'];
            const weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            const errStatus = ['现在仍错的题','曾经错过的题'];
            const handles = ['全部标记为√再生成','全部标记为×再生成','不生成'];
            let deliverTimeMsg = '';
        deliverTime.map((item,index)=>{
            if(item.day !== '' && item.time !== ''){
            deliverTimeMsg =deliverTimeMsg +`${weeks[item.day]}_${item.time} `;
            }
        })
    

        let deliverMsg = '';
        if(deliverType === '立即交付'){
            deliverMsg = `交付优先:第0`
        }else if(deliverType === '节点交付'){
            deliverMsg = `交付优先:第${deliverPriority}/交付节点:${deliverTimeMsg}`
        }else{
            deliverMsg = `交付优先:第${deliverPriority}/交付预期:${deliverExpected}小时以内`
        }
        return(
            <div className='person-content' style={{marginTop:10,height:'auto'}}>
                <div className='person-select' style={{border:'none'}}>
                    <div>
                    <span>产品编号:</span>
                    <Select style={{width:160,marginLeft:20}}
                            combobox
                            value={curProductID}
                            onChange={this.newProductChoose.bind(this,num)}>
                        {
                            allProductId.map((item,index)=>
                            {
                                return  hasSelectId.indexOf(item) == -1 && <Option key={index} value={item}>{item}</Option>
                            }
                           
                        )
                        }
                    </Select>
                    </div>
                    <div>
                        <Button style={{marginLeft:80,marginTop:20}}
                                onClick={this.deleteNew.bind(this)}>删除</Button>
                    </div>
                    </div>
                    <div className='person-detail'>
                        <div style={{float:'left'}}>产品详情</div>
                        { showNew ? 
                        <div className='person-msg'>
                            <div>服务状态:{status?<span style={{color:'#48D61D'}}>运行</span>:<span style={{color:'#FF3547'}}>停止</span>}</div>
                            <div><span>问题:错题学习</span></div>
                            <div>{`层次:${gradations[gradation-1]}`}</div>
                            <div>{`深度:${depths[depth-1]}`}</div>
                            <div>{`总体:产品名称:${name}/产品级别:${level}/产品对象:${object}`}</div>
                            {
                                epu === 3 ? <div>{`处理器:EPU:${EPUs[epu-1]}/题量控制:${problemMax}/错题状态:${errStatus[wrongProblemStatus-1]}
                                /题目种类:${problemType}/同类题量:${sameTypeMax}/同类来源:${sameTypeSource}`}</div>:
                                <div>{`处理器:EPU:${EPUs[epu-1]}/题量控制:${problemMax}/纸张大小:${pageType}`}</div>
                            }
                            <div>{`错题源:${problemSource}`}</div>
                            {
                                epu === 3 ? <div>{`文档形式:纸张大小:${pageType}/分数栏:${columnCount}/边界控制:${borderControl}`}</div> : null
                            }
                            <div>{`服务:服务类型:${serviceType}/服务发起:${serviceLauncher}/
        服务时段:${timestampToTime(serviceStartTime)}~${timestampToTime(serviceEndTime)}`}</div>
                            <div>{`文档交付:交付类型:${deliverType}/${deliverMsg}`}</div>
                            {
                                epu === 3 ? <div>{`异常处理:${handles[exceptionHandler-1]}`}</div> : null
                            }
                            <div>{`价格:${price}元`}</div>
                            <div>{`其他信息:学科:${subject}/年级:${grade}`}</div>
                        </div> : <div className='person-msg'></div>
                    }
                    </div>
                </div>
        )
    }
}