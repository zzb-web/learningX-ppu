import React from  'react';
import Loadable from 'react-loadable';
import PersonalInfoSure from '../../containers/PersonalInfoSure/index.js';
import ProductM from '../../containers/ProductM/index.js'
import FirstProductDesign from '../../containers/FirstProductDesign/index.js';
// import LayeredConfig from '../../containers/LayeredConfig/index.js';
function MyLoadingComponent({ error }) {
    if (error) {
      return <div>Error!</div>;
    } else {
      return <div>Loading...</div>;
    }
  }


const PassWordFormComponent = Loadable({
  loader: () => import('../PassWord/index.js'),
  loading: MyLoadingComponent,
});
 class PassWordFormLoadable extends React.Component {
  render() {
    return <PassWordFormComponent/>;
  }
}

const ProductMComponent = Loadable({
  loader: () => import('../../containers/ProductM/index.js'),
  loading: MyLoadingComponent,
  render(loaded,props){
    return <ProductM setKey={props.setKey}/>
  }
});
 class ProductMLoadable extends React.Component {
  render() {
    return <ProductMComponent setKey={this.props.setKey}/>;
  }
}

const FirstProductDesignComponent = Loadable({
  loader: () => import('../../containers/FirstProductDesign/index.js'),
  loading: MyLoadingComponent,
  render(loaded,props){
    return <FirstProductDesign msg={props.msg} resetWay={props.resetWay}/>
  }
});
 class FirstProductDesignLoadable extends React.Component {
  render() {
    return <FirstProductDesignComponent msg={this.props.msg} resetWay={this.props.resetWay}/>;
  }
}

const PersonalInfoSureComponent = Loadable({
  loader: () => import('../../containers/PersonalInfoSure/index.js'),
  loading: MyLoadingComponent,
  render(loaded,props){
    return <PersonalInfoSure/>
  }
});
 class PersonalInfoSureLoadable extends React.Component {
  render() {
    return <PersonalInfoSureComponent/>;
  }
}


const LayeredConfigComponent = Loadable({
  loader: () => import('../../containers/LayeredConfig/index.js'),
  loading: MyLoadingComponent,
});
 class LayeredConfigLoadable extends React.Component {
  render() {
    return <LayeredConfigComponent/>;
  }
}

const ClassConfigComponent = Loadable({
  loader: () => import('../../containers/ClassConfig/index.js'),
  loading: MyLoadingComponent,
});
 class ClassConfigLoadable extends React.Component {
  render() {
    return <ClassConfigComponent/>;
  }
}

const StudentLayeredComponent = Loadable({
  loader: () => import('../../containers/StudentLayered/index.js'),
  loading: MyLoadingComponent,
});
 class StudentLayeredLoadable extends React.Component {
  render() {
    return <StudentLayeredComponent/>;
  }
}

const TargetPlanComponent = Loadable({
  loader: () => import('../../containers/TargetPlan/index.js'),
  loading: MyLoadingComponent,
});
 class TargetPlanLoadable extends React.Component {
  render() {
    return <TargetPlanComponent/>;
  }
}



export {
        PassWordFormLoadable,
        ProductMLoadable,
        FirstProductDesignLoadable,
        PersonalInfoSureLoadable,
        LayeredConfigLoadable,
        ClassConfigLoadable,
        StudentLayeredLoadable,
        TargetPlanLoadable
      }
