import React from 'react';
import DocumentFormComponent from '../../components/FirstProductDesign/documentForm.js';
class DocumentForm extends React.Component{
    constructor(props){
        super();
        this.state={
            pageType: props.pageType, 
            columnCount: props.columnCount, 
            borderControl: props.borderControl,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            pageType: nextProps.pageType, 
            columnCount: nextProps.columnCount, 
            borderControl: nextProps.borderControl,
        })
    }
    paperHandle(value){
        this.setState({
            pageType : value
        })
        this.props.paperHandle(value)
    }
    scoreHandle(value){
        this.setState({
            columnCount : value
        })
        this.props.scoreHandle(value)
    }
    borderControlHandle(value){
        this.setState({
            borderControl : value
        })
        this.props.borderControlHandle(value)
    }
    render(){
        return(
            <div>
                <DocumentFormComponent paperHandle={this.paperHandle.bind(this)}
                                        scoreHandle={this.scoreHandle.bind(this)}
                                        borderControlHandle={this.borderControlHandle.bind(this)}
                                     data={this.state}/>
            </div>
        )
    }
}

export default DocumentForm;