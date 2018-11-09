import React from 'react';
import ClassConfigStep1 from './Step1.js';
import ClassConfigStep2 from "./Step2.js";
import {Get} from '../../fetch/data.js';
class ClassConfig extends React.Component{
    state={
        showStep1 : true,
        showStep2 : false,
        schoolID : '',
        grade : '',
        msgClass : '',
        allProductId : [],
        curProductID : []
    }
    toConfig(schoolID,grade,msgClass){
        this.setState({
            showStep1 : false,
            showStep2 : true,
            schoolID : schoolID,
            grade : grade,
            msgClass : msgClass
        })
       let msg = `schoolID=${schoolID}&grade=${grade}&class=${msgClass}`;
       Get(`/api/v3/staffs/classes/productID/?${msg}`).then(resp=>{
           if(resp.status ===200){
               this.setState({
                   curProductID :resp.data.productID
               })
         
           }
       }).catch(err=>{

       })



       //获取所有的产品
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
    }
    render(){
        const {showStep1,showStep2,schoolID,grade,msgClass,allProductId,curProductID} = this.state;
        return(
            <div>
                {showStep1 ? <ClassConfigStep1 toConfig={this.toConfig.bind(this)}/> : null}
                {showStep2 ? <ClassConfigStep2 schoolID={schoolID}
                                                grade={grade}
                                                msgClass={msgClass}
                                                allProductId={allProductId}
                                                curProductID={curProductID}/> : null}
            </div>
        )
    }
}

export default ClassConfig;