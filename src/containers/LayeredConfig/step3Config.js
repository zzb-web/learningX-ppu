import React from "react";
import {Row,Col,message,Modal} from 'antd';
import Step3Component from '../../components/LayeredConfig/step3Config.js'
import {Get,Put} from '../../fetch/data.js'
import moment from 'moment';
const {confirm} = Modal;
export default class Step3 extends React.Component{
    constructor(props){
        super();
        this.state={
            schoolID : props.schoolID,
            grade : props.grade,
            msgClass : props.msgClass,
            level : '-1',
            allProductId : [],
            showDetail : false,
            productID_selected : '',
            showNew : false,
            productData_1 : {
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
                },{
                    day: '',
                    time:'',
                }],
                deliverExpected: '',
                price: '',
                subject: '',
                grade: '',
            },
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
                },{
                    day: '',
                    time:'',
                }],
                deliverExpected: '',
                price: '',
                subject: '',
                grade: '',
            },
            curProductID : '',
            showCur : false,
            showNew : false,
        }
    }
    componentWillMount(){
        const type = this.props.type;
        this.setState({
            type : type
        })
        if(type === 1){
            this.toConfig();
        }
    }
    componentWillReceiveProps(nextProps){
        const type = nextProps.type;
        this.setState({
            schoolID : nextProps.schoolID,
            grade : nextProps.grade,
            msgClass : nextProps.msgClass,
            type : type
        })
        if(type === 1){
            this.toConfig();
        }
    }
    selectLevel(value){
        console.log(value)
        this.setState({
            level : value
        })
    }
    toConfig(){
        const {schoolID,grade,msgClass,level} = this.state;
        let msg = `schoolID=${schoolID}&grade=${grade}&class=${msgClass}&level=${level}`;
        Get(`/api/v3/staffs/classes/productID/?${msg}`).then(resp=>{
            if(resp.status ===200){
                let curProductID = resp.data.productID;
                Get(`/api/v3/staffs/products/${curProductID}/`).then(resp=>{
                    if(resp.status === 200){
                        let e = resp.data;
                        if(resp.data.length !== 0){
                            this.setState({
                                productData : resp.data,
                                showCur : true
                              })
                        }
                        this.setState({
                            curProductID : curProductID
                          })
                    }   
                })
            }
        }).catch(err=>{

        })

        let allProductId = []
        let msg_1 = `epu=-1&object=all`;
        Get(`/api/v3/staffs/products/?${msg_1}`).then(resp=>{
            if(resp.status=== 200){
                resp.data.map((item,index)=>{
                    if(item.status){
                        allProductId.push(item.productID)
                    }
                })
                this.setState({
                    allProductId : allProductId
                })
            }
        })
        this.setState({
            showDetail : true
        })
    }
    configureChange(value){
        const productID = value;
        this.setState({
            productID_selected : value
        })
        Get(`/api/v3/staffs/products/${productID}/`).then(resp=>{
            if(resp.status === 200){
                if(resp.data.length !==0){
                    this.setState({
                        productData_1 : resp.data,
                        showNew : true
                      })
                }else{
                    this.setState({
                        showNew : false
                    })
                }
                
            }   
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
        const {productID_selected,learnID,level,schoolID,grade,msgClass,type} = this.state;
        let msg;
        if(type === 0){
            msg = {
                schoolID:schoolID,
                grade: grade,
                class: msgClass,  
                productID: productID_selected,
                level : level
             }   
        }else{
            msg = {
                schoolID:schoolID,
                grade: grade,
                class: msgClass,  
                productID: productID_selected,
             }   
        }

        Put(`/api/v3/staffs/classes/productID/`,msg).then(resp=>{
         if(resp.status === 200){
             message.success('操作成功');
             Get(`/api/v3/staffs/products/${productID_selected}/`).then(resp=>{
                 if(resp.status === 200){
                     let e = resp.data;
                     if(resp.data.length !== 0){
                         this.setState({
                             productData : resp.data,
                             showCur : true
                           })
                     }
                     this.setState({
                         curProductID : productID_selected,
                         productID_selected : '',
                         showNew : false
                       })
                 }   
             })
 
         }else{
             message.error('操作失败');
         }
        })
     }
    render(){
        return(
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Step3Component selectLevel={this.selectLevel.bind(this)}
                                    toConfig={this.toConfig.bind(this)}
                                    configureChange={this.configureChange.bind(this)}
                                    submitHandle={this.submitHandle.bind(this)}
                                    data={this.state}/>
                </Col>
                <Col span={1}></Col>
            </Row>
        )
    }
}