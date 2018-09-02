import React from 'react';
import DetailComponent from '../../components/FirstProductDesign/detail.js';
class Detail extends React.Component{
    render(){
        return(
            <div>
                <DetailComponent msg={this.props.msg} 
                                 submitHandle={this.props.submitHandle}/>
            </div>
        )
    }
}

export default Detail;