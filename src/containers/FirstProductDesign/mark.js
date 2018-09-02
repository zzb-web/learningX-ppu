
import React from 'react';
class Mark extends React.Component{
    state = {
       selectIndex : 0
      }
    componentWillMount(){
        const {gradation,title,depth} = this.props;
        let idx = 0
        if(title === '层次'){
            idx = gradation-1
        }else if(title === '深度'){
            idx = depth-1
        }else{
            idx = 0
        }

        this.setState({
            selectIndex : idx
        })
    }
    componentWillReceiveProps(nextProps){
        const {gradation,title,depth} = nextProps;
        let idx = 0
        if(title === '层次'){
            idx = gradation-1
        }else if(title === '深度'){
            idx = depth-1
        }else{
            idx = 0
        }
        this.setState({
            selectIndex : idx
        })
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