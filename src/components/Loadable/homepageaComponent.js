import React from  'react';
import Loadable from 'react-loadable';
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
});
 class ProductMLoadable extends React.Component {
  render() {
    return <ProductMComponent/>;
  }
}



export {
        PassWordFormLoadable,
        ProductMLoadable
      }
