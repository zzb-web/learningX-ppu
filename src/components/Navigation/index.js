import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {Get, Post} from '../../fetch/data.js';
import { withRouter } from 'react-router';
// import UserMsgForm from '../UserMsg/index.js';
import {
           PassWordFormLoadable,
           ProductMLoadable,
           FirstProductDesignLoadable,
           PersonalInfoSureLoadable,
          //  PersonalInfoConfigureLoadable
          LayeredConfigLoadable
      } from '../Loadable/homepageaComponent.js';
import axios from 'axios';
import './style.css';
import GradeClassCommon from '../Common/gradeclassCommon.js';
const { Header, Sider, Content} = Layout;
const {SubMenu} = Menu;
class Navigation extends Component {
  state = {
    collapsed: true,
    key: '1',
    subKey : ['sub1'],
    showUser : 'none',
    contentHeight :　0,
    userMsg : {},
    userName : '',
    phone:'',
    gender:'',
    hideMenu : false,
    msg : {
      way : 0,
      productID : ''
    }
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  clickHandle(e) {
    this.setState({
      key: e.key
    })
  }
  usermsgHandle(){
    this.setState({
      key : ''
    })
  }
  passwordHandle(){
    this.setState({
      key : ''
    })
  }
  userMouseEnter(e){
    this.setState({
      showUser : 'block'
    })
  } 
  userMouseLeave(e){
    this.setState({
      showUser : 'none'
    })
  }
  logoutHandle(){
    var result =Post('/api/v3/staffs/me/logout/');
    result.then((response)=>{
      if(response.status === 200){
        this.props.history.push('/')
      }
    })
  }
  menuHandle(){
    sessionStorage.hideMenu = true;
    this.setState({
      hideMenu : true
    })
  }
  componentWillMount(){
    axios.defaults.withCredentials = true;
     if(sessionStorage.staffId === undefined){
        this.props.history.push('/');
     }
     const hideMenu = sessionStorage.hideMenu;
     var flag;
     if(hideMenu === undefined || hideMenu === "false"){
        flag = false;
     }else{
        flag = true;
     }
     this.setState({
       hideMenu : flag
     })
  }
  onOpenChange(e){
    this.setState({
      subKey : e
    })
  }
  setKey(value,way,productID){
    const {msg} = this.state;
    msg.way = way;
    msg.productID = productID;
    this.setState({
      key : value,
      msg : msg
    })
  }
  resetWay(){
    const {msg} = this.state;
    msg.way = 0;
    msg.productID = '';
    this.setState({
      msg : msg
    })
  }
  render() {
    const {userName,hideMenu,subKey,key,msg} = this.state;
    const {staffId} = sessionStorage
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width={150}
        >
          <div className='head-font'>
            PPU
            <span className='pushin' 
                  onClick={this.menuHandle.bind(this)} 
                  style={!hideMenu?{display:'none'}:{display:'none'}
                  }>
              <Icon type="pushpin"/>
            </span>
          </div>
          <Icon
            className="trigger trigger-icon"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
           <Menu theme="dark" 
                  mode="inline" 
                  onClick={this.clickHandle.bind(this)}
                  openKeys={subKey}
                  selectedKeys={[key]}
                  onOpenChange={this.onOpenChange.bind(this)}>
              <SubMenu key="sub1" title={<span><Icon type="global"/><span>产品管理</span></span>}>
                <Menu.Item key="1">
                  <span>产品管理</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <span>第一代产品设计</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="book"/><span>产品配置</span></span>}>
                <Menu.Item key="3">
                    <span>个人产品配置</span> 
                </Menu.Item>
                <Menu.Item key="4">
                    <span>分层产品配置</span> 
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="user"/><span>用户信息</span></span>}>
                <Menu.Item key="">
                  <span>个人信息</span>
                </Menu.Item>
                <Menu.Item key="">
                  <span>修改密码</span>
                </Menu.Item>
              </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ width: '100%', padding: 0 }}>
           <div className='user-main' onMouseLeave={this.userMouseLeave.bind(this)}>
            <div className='user-msg' onMouseEnter={this.userMouseEnter.bind(this)}>
              <div className='user-icon-content'>
                <Icon type="user" className='user-icon'/>
              </div>
              <div className='user-name'>{userName ||staffId}</div>
              <div className='logout' title='退出' onClick={this.logoutHandle.bind(this)}><Icon type="logout" /></div>
            </div>
          </div>
          </Header>
          <Content style={key==='2'?{ margin: '16px 16px',minHeight:this.state.contentHeight+16}:{ margin: '16px 16px', padding: 24, background: '#fff',minHeight:this.state.contentHeight}}>
            {
                 this.state.key === '1' ? <ProductMLoadable setKey={this.setKey.bind(this)}/> : null
            } 
            {
              this.state.key === '2' ? <FirstProductDesignLoadable msg={msg} 
                                                                   resetWay={this.resetWay.bind(this)}/> : null  
            }
            {
              this.state.key === '3' ? <PersonalInfoSureLoadable/> : null
            }
            {
              this.state.key === '4' ? <LayeredConfigLoadable/> : null
            }
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    );
  }
  modifyUserMsg(name,phone,gender,school,classId,grade){
    this.setState({
      userName : name,
      phone:phone,
      gender:gender,
      school : school,
      classId : classId,
      grade: grade
    })
  }
  componentDidMount(){
    let that = this;
    let allHeight = document.documentElement.clientHeight;
    this.setState({
      contentHeight :　allHeight-112
    })
    window.onresize = function(){
      let allHeight = document.documentElement.clientHeight;
      that.setState({
        contentHeight :　allHeight-112
      })
    }
    // var msg =Get('/api/v3/students/me/profile/');
    // msg.then((response)=>{
    //   if(response.status ===200){
    //     this.setState({
    //         userMsg : response.data,
    //         userName : response.data.realName,
    //         phone : response.data.telephone,
    //         gender:response.data.gender,
    //         school :response.data.school,
    //         classId :response.data.classId,
    //         grade : response.data.grade
    //     })
    //   }else if(response.status ===401){
    //     this.props.history.push('/');
    // }
    // })
  }
}
export default withRouter(Navigation);
