import React from 'react';
import PersonalInfoSureComponent from '../../components/PersonalInfoSure/index.js';
import {message,Modal} from 'antd';
import {Get,Put} from '../../fetch/data.js';
import moment from 'moment';
const {confirm} = Modal;
class PersonalInfoSure extends React.Component{
    state={
        learnID : '',
        msg : '',
        showDetail : false,
        showSecond : false,
        allProductId : [],
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
        productID_selected : ''
    }
    makeSure(){
        const {learnID} = this.state;
        this.setState({
            msg : [],
            showDetail : false,
            showSecond: false
        })
        Get(`/api/v3/staffs/students/${learnID}/`).then(resp=>{
           if(resp.status === 200){
            this.setState({
                msg : resp.data,
                showDetail : true,
                showSecond: false
            })
           }
        })
    }
    getLearnId(value){
        this.setState({
            learnID : value
        })
    }
    toConfigure(){
        this.setState({
            showDetail : false,
            showSecond : true
        })
        //获取所有的产品
        let allProductId = []
        let msg = `epu1=true&epu2=true&epu3=true&upscale=true&normal=true&business=true`;
        Get(`/api/v3/staffs/products/?${msg}`).then(resp=>{
            if(resp.status=== 200){
                resp.data.map((item,index)=>{
                    allProductId.push(item.productID)
                })
                this.setState({
                    allProductId : allProductId
                })
            }
        })
        const data = this.state.msg;
        const curProductID = data.productID;
        Get(`/api/v3/staffs/products/${curProductID}/`).then(resp=>{
            if(resp.status === 200){
                let e = resp.data;
                this.setState({
                    productData : resp.data,
                    curProductID : curProductID
                  })
            }   
        })
    }
    configureChange(value){
        const productID = value;
        this.setState({
            productID_selected : value
        })
        Get(`/api/v3/staffs/products/${productID}/`).then(resp=>{
            if(resp.status === 200){
                this.setState({
                    productData_1 : resp.data
                  })
            }   
        })
    }
    submitOK(){
       const {productID_selected,learnID} = this.state;
       const msg = {
        productID: productID_selected
        }   
       Put(`/api/v3/staffs/students/${learnID}/productID/`,msg).then(resp=>{
        if(resp.status === 200){
            message.success('操作成功');
            this.makeSure();
        }else{
            message.error('操作失败');
        }
       })
    }
    submitHandle(){
        this.showConfirm()
    }
    showConfirm() {
        const that = this;
        confirm({
          title: '必须进行产品设计检查',
          content: '你确定产品设计OK?',
          onOk() {
            that.submitOK()
          },
          onCancel() {
            
          },
        });
      }
    render(){
        return(
            <PersonalInfoSureComponent makeSure={this.makeSure.bind(this)}
                                       getLearnId={this.getLearnId.bind(this)}
                                       toConfigure={this.toConfigure.bind(this)}
                                       configureChange={this.configureChange.bind(this)}
                                       submitHandle={this.submitHandle.bind(this)}
                                       data = {this.state}
                                       />
        )
    }
}
export default PersonalInfoSure;