
import React from 'react';
class Mark extends React.Component{
    state = {
       selectIndex : 0
      }
    markClick(value){
        this.setState({
            selectIndex : value[1]
        })
        this.props.markClick(value)
    }
    render(){
        const {textArr} = this.props;
        const {selectIndex} = this.state;
        let children = []
        textArr.map((item,index)=>{
            children.push(
                 <div className='mark'
                      style={selectIndex === index ? {backgroundColor:'#0099FF',color:'#fff'}:{backgroundColor:'#fff',color:'#000'}}
                      onClick={this.markClick.bind(this,[this.props.title,index])}>{item}</div>
            )
        })
        return(
            <div style={{width:'100%',height:30,marginTop:20}}>
                <div className='title-2'>{this.props.title}:</div>
                {children}
            </div>
        )
    }
}

export default Mark;