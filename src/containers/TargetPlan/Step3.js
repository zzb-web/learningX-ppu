import React from 'react';
import Step3Component from '../../components/TargetPlan/Step3.js';
export default class Step3 extends React.Component{
    constructor(props){
        super();
        this.state = {
            totalLevel : props.totalLevel,
            selectLevel : '',
            selectTarget : '',
            showDetail : false,
            showTable : false
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.totalLevel !== this.state.totalLevel){
            this.setState({
                totalLevel : nextProps.totalLevel
            })
        }
    }
    selectLevel(value){
        this.setState({
            selectLevel : value
        })
    }
    selectTarget(value){
        this.setState({
            selectTarget : value
        })
    }
    toPlan(){
        const {selectLevel,selectTarget} = this.state;
        this.setState({
            showDetail : true
        })
    }
    selectTerm(){

    }
    selectSection(){

    }
    selectPart(){

    }
    selectType(){

    }
    searchHandle(){
        this.setState({
            showTable : true
        })
    }
    render(){
        const {totalLevel,showDetail,showTable} = this.state;
        return(
            <div>
                <Step3Component totalLevel={totalLevel}
                                showDetail={showDetail}
                                showTable={showTable}
                                selectLevel={this.selectLevel.bind(this)}
                                selectTarget={this.selectTarget.bind(this)}
                                toPlan={this.toPlan.bind(this)}
                                selectTerm={this.selectTerm.bind(this)}
                                selectSection={this.selectSection.bind(this)}
                                selectPart={this.selectPart.bind(this)}
                                selectType={this.selectType.bind(this)}
                                searchHandle={this.searchHandle.bind(this)}/>
            </div>
        )
    }
}