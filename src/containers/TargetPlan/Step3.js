import React from 'react';
import Step3Component from '../../components/TargetPlan/Step3.js';
import {message} from 'antd';
import { Get, Post,Delete } from '../../fetch/data.js';
export default class Step3 extends React.Component{
    constructor(props){
        super();
        this.state = {
            schoolID : props.schoolID,
            grade : props.grade,
            msgClass : props.msgClass,
            totalLevel : props.totalLevel,
            selectLevel : '',
            target : '',
            showDetail : false,
            showTable : false,
            sections : [],
            currentSections : [],
            defaultSections : '',
            currentChapterNum : 0,
            currentSectionNum : 0,
            type : '',
            targetsData : [],
            copyData : []
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.totalLevel !== this.state.totalLevel){
            this.setState({
                totalLevel : nextProps.totalLevel
            })
        }
        this.setState({
            schoolID : nextProps.schoolID,
            grade : nextProps.grade,
            msgClass : nextProps.msgClass,
        })
    }
    selectLevel(value){
        this.setState({
            selectLevel : value
        })
    }
    selectTarget(value){
        this.setState({
            target : value
        })
    }
    toPlan(){
        this.setState({
            showDetail : true
        })
    }
    selectTerm(value){
        Get(`/api/v3/staffs/info/chapsSects/?semester=${value}`).then(resp=>{
            if(resp.status === 200){
                let chapters = [];
                let chapters_sections = {};
                resp.data.map((item,index)=>{
                    if(chapters.indexOf(`${item.chapterName}_${item.chapter}`)===-1){
                        chapters.push(`${item.chapterName}_${item.chapter}`);
                    }
                    if(chapters_sections[`${item.chapterName}_${item.chapter}`] === undefined){
                        chapters_sections[`${item.chapterName}_${item.chapter}`] = [];
                        chapters_sections[`${item.chapterName}_${item.chapter}`].push(`${item.sectionName}_${item.section}`);
                    }else{
                        chapters_sections[`${item.chapterName}_${item.chapter}`].push(`${item.sectionName}_${item.section}`);
                    }
                })
                this.setState({
                    sections : chapters,
                    chapters_sections : chapters_sections
                })
            }
        }).then(err=>{

        })
    }
    selectSection(value){
        this.setState({
            currentSections : this.state.chapters_sections[value],
            defaultSections : '',
            currentChapterNum : Number(value.split('_')[1]),
            currentSectionNum : 1
        })
    }
    selectPart(value){
        this.setState({
            defaultSections : value,
            currentSectionNum : Number(value.split('_')[1])
        })
    }
    selectType(e){
        this.setState({
            type : e.target.value
        })
    }
    searchHandle(){
        const {schoolID,grade,msgClass,selectLevel,target,currentChapterNum,currentSectionNum,type} = this.state;
        let msg = `schoolID=${schoolID}&grade=${grade}&class=${msgClass}&level=${selectLevel}&target=${target}&chapter=${currentChapterNum}&section=${currentSectionNum}&typename=${type}`;
        Get(`/api/v3/staffs/classes/targets/?${msg}`).then(resp=>{
            if(resp.status === 200){
                this.setState({
                    targetsData : resp.data,
                    copyData : JSON.parse(JSON.stringify(resp.data))
                })
            }
        }).catch(err=>{

        })
        this.setState({
            showTable : true
        })
    }
    operationHandle(data,value){
        const {schoolID,grade,msgClass,selectLevel} = this.state;
        let postMsg = {
            schoolID: schoolID,  
            grade: grade,  
            class: msgClass,  
            level: selectLevel, 
            targets: [{
                chapter: data.chapter,
                section: data.section,  
                typename: data.typename
            }],
        }
        let key = value.key;
        if(key === '1'){

        }else if(key === '2'){
            Post('/api/v3/staffs/classes/targets/',postMsg).then(resp=>{
                if(resp.status === 200){
                    message.success('操作成功');
                    this.searchHandle();
                }else{
                    message.error('操作失败');
                }
            }).catch(err=>{

            })
        }else{
            Delete('/api/v3/staffs/classes/targets/',postMsg).then(resp=>{
                if(resp.status === 200){
                    message.success('操作成功');
                    this.searchHandle();
                }else{
                    message.error('操作失败');
                }
            }).catch(err=>{

            })
        }
    }
    fastHandle(value){
        let {copyData} = this.state;
        const {schoolID,grade,msgClass,selectLevel} = this.state;
        let key = value.key;
        switch(key){
            case '1':
            let added = [];
            copyData.map((item,index)=>{
                if(item.status){
                    added.push(item)
                }
            })
            this.setState({
                targetsData : added
            })
            break;
            case '2':
            let noAdded = [];
            copyData.map((item,index)=>{
                if(!item.status){
                    noAdded.push(item)
                }
            })
            this.setState({
                targetsData : noAdded
            })
            break;
            case '3':
            copyData.map((item,index)=>{
                if(!item.status){
                    let postMsg = {
                        schoolID: schoolID,  
                        grade: grade,  
                        class: msgClass,  
                        level: selectLevel, 
                        targets: [{
                            chapter: item.chapter,
                            section: item.section,  
                            typename: item.typename
                        }],
                    }
                    Post('/api/v3/staffs/classes/targets/',postMsg).then(resp=>{
                        if(resp.status === 200){
                            this.searchHandle();
                        }else{
                            
                        }
                    }).catch(err=>{
        
                    })
                }
            })
            break;
            case '4':
            copyData.map((item,index)=>{
                    let postMsg = {
                        schoolID: schoolID,  
                        grade: grade,  
                        class: msgClass,  
                        level: selectLevel, 
                        targets: [{
                            chapter: item.chapter,
                            section: item.section,  
                            typename: item.typename
                        }],
                    }
                    Delete('/api/v3/staffs/classes/targets/',postMsg).then(resp=>{
                        if(resp.status === 200){
                            this.searchHandle();
                        }else{
                            
                        }
                    }).catch(err=>{
        
                    })
            })
            break;
        }
    }
    render(){
        const {totalLevel,showDetail,showTable,sections,currentSections,defaultSections,targetsData,target} = this.state;
        return(
            <div>
                <Step3Component totalLevel={totalLevel}
                                showDetail={showDetail}
                                showTable={showTable}
                                sections={sections}
                                currentSections={currentSections}
                                defaultSections={defaultSections}
                                targetsData={targetsData}
                                target={target}
                                selectLevel={this.selectLevel.bind(this)}
                                selectTarget={this.selectTarget.bind(this)}
                                toPlan={this.toPlan.bind(this)}
                                selectTerm={this.selectTerm.bind(this)}
                                selectSection={this.selectSection.bind(this)}
                                selectPart={this.selectPart.bind(this)}
                                selectType={this.selectType.bind(this)}
                                searchHandle={this.searchHandle.bind(this)}
                                operationHandle={this.operationHandle.bind(this)}
                                fastHandle={this.fastHandle.bind(this)}/>
            </div>
        )
    }
}