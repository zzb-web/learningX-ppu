import React from 'react';
import PopulationComponent from '../../components/FirstProductDesign/population.js';
class Population extends React.Component{
    constructor(props){
        super();
        this.state={
            name: props.name, 
            level: props.level, 
            object: props.object,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            name : nextProps.name,
            level : nextProps.level,
            object : nextProps.object
        })
    }
    productInput(e){
        this.setState({
            name : e.target.value
        })
        const {level,object} = this.state;
        this.props.populationHandle([e.target.value,level,object])
    }
    productLevel(value){
        this.setState({
            level : value
        })
        const {name,object} = this.state;
        this.props.populationHandle([name,value,object])
    }
    productObj(value){
        this.setState({
            object : value
        })
        const {level,name} = this.state;
        this.props.populationHandle([name,level,value])
    }
    render(){
        return(
            <div>
                <PopulationComponent productInput={this.productInput.bind(this)}
                                     productLevel={this.productLevel.bind(this)}
                                     productObj={this.productObj.bind(this)}
                                     data={this.state}/>
            </div>
        )
    }
}

export default Population;