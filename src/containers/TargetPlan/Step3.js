import React from 'react';
import Step3Component from '../../components/TargetPlan/Step3.js';
import {message} from 'antd';
import { Get, Post,Delete } from '../../fetch/data.js';
import axios from 'axios';
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
            term : '',
            showDetail : false,
            showTable : false,
            sections : [],
            currentSections : [],
            defaultSections : '',
            currentChapterNum : '',
            currentSectionNum : '',
            type : '',
            targetsData : [],
            copyData : [],
            targetWarning : false,
            levelWarning : false,
            termWarning : false,
            chapterWarning : false,
            sectionWarning : false,
            selectChapter : ''
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
            selectLevel : value,
            levelWarning : false
        })
    }
    selectTarget(value){
        this.setState({
            target : value,
            targetWarning : false
        })
    }
    toPlan(){
        const {selectLevel, target} = this.state;
        if(selectLevel === ''){
            this.setState({
                levelWarning : true
            })
        }
        if(target === ''){
            this.setState({
                targetWarning : true
            })
        }
        if(selectLevel !== '' && target !== ''){
            this.setState({
                showDetail : true
            })
        }
    }
    selectTerm(value){
        this.setState({
            term : value,
            termWarning : false,
            showTable : false,
            currentChapterNum : '',
            currentSectionNum : '',
            selectChapter : '',
            defaultSections : '',
            currentSections : []
        })
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
            selectChapter : value,
            currentSections : value === 0 ? [] :this.state.chapters_sections[value],
            defaultSections : '',
            currentChapterNum : value === 0 ? 0 : Number(value.split('_')[1]),
            currentSectionNum : value === 0 ? '' : 1,
            chapterWarning : false,
            sectionWarning : false
        })
    }
    selectPart(value){
        this.setState({
            defaultSections : value,
            currentSectionNum : value === 0 ? 0 : Number(value.split('_')[1]),
            sectionWarning : false
        })
    }
    selectType(e){
        this.setState({
            type : e.target.value
        })
    }
    searchHandle(){
        const {schoolID,grade,msgClass,selectLevel,target,currentChapterNum,currentSectionNum,type,term} = this.state;
        if(term === ''){
            this.setState({
                termWarning : true
            })
        }

        if(currentChapterNum === ''){
            this.setState({
                chapterWarning : true
            })
        }

        if(currentSectionNum === ''){
            this.setState({
                sectionWarning : true
            })
        }

        if(term !== '' && currentChapterNum !== '' && currentSectionNum !== ''){
        let msg = `schoolID=${schoolID}&grade=${grade}&class=${msgClass}&level=${selectLevel}&target=${target}&chapter=${currentChapterNum}&section=${currentSectionNum}&typename=${type}`;
        Get(`/api/v3/staffs/classes/targets/?${msg}`).then(resp=>{
            if(resp.status === 200){
                this.setState({
                    targetsData : resp.data,
                    copyData : JSON.parse(JSON.stringify(resp.data)),
                    showTable : true
                })
            }
        }).catch(err=>{

        })
       
        }
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
            let postMsg = {
                schoolID: schoolID,  
                grade: grade,  
                class: msgClass,  
                level: selectLevel, 
                targets: [],
            }
            copyData.map((item,index)=>{
                if(!item.status){
                    postMsg.targets.push({
                        chapter: item.chapter,
                        section: item.section,  
                        typename: item.typename
                    })
                }
            })
            Post('/api/v3/staffs/classes/targets/',postMsg).then(resp=>{
                if(resp.status === 200){
                    message.success('操作成功');
                    this.searchHandle();
                }else{
                    message.error('操作失败');
                }
            }).catch(err=>{

            })
            break;
            case '4':
            let postMsg_1 = {
                schoolID: schoolID,  
                grade: grade,  
                class: msgClass,  
                level: selectLevel, 
                targets: [],
            }
            copyData.map((item,index)=>{
                postMsg_1.targets.push({
                    chapter: item.chapter,
                    section: item.section,  
                    typename: item.typename
                })
            })
            Delete('/api/v3/staffs/classes/targets/',postMsg_1).then(resp=>{
                if(resp.status === 200){
                    message.success('操作成功');
                    this.searchHandle();
                }else{
                    message.error('操作失败');
                }
            }).catch(err=>{

            })
            break;
        }
    }
    render(){
        return(
            <div>
                <Step3Component data={this.state}
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