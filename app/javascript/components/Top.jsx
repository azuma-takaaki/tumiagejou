import React from "react"
import PropTypes from "prop-types"
import Modal from 'react-modal'
import Header from "./Header.jsx"
import GroupsList from "./GroupsList.jsx"
import Catsle from "./Catsle.jsx"

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
 }
};

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.GroupsListRef = React.createRef();
    this.state = {
      logged_in: false,
      user_name: '',
      email:'',
      password:'',
      password_confirm:'',
      group_list: [],
      modal_type: ''
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signupPost = this.signupPost.bind(this);
    this.loginPost = this.loginPost.bind(this);

  }
  openModal(type) {
    this.setState({modal_type: type});
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
    this.subtitle.style.color = '#fff000';
  }
  closeModal() {
    this.setState({modalIsOpen: false});
    this.setState({modal_title: ""});
    this.setState({user_name: ""});
    this.setState({email: ""});
    this.setState({password: ""});
    this.setState({password_confirm: ""});
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  signupPost(){
    const data =
      {   user: {
            name: this.state.user_name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirm
          }
      };
    const getCsrfToken = () => {
      const metas = document.getElementsByTagName('meta');
      for (let meta of metas) {
          if (meta.getAttribute('name') === 'csrf-token') {
              console.log('csrf-token:', meta.getAttribute('content'));
              return meta.getAttribute('content');
          }
      }
      return '';
    }
      fetch("/users", {
        method: 'POST', // or 'PUT'
        headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-Token': getCsrfToken()
        },
        body: JSON.stringify(data),
      }).then(res => res.json())
      .then(
        (result) => {
          var user_list = []
          for(var i in result[0]){
            user_list.push(result[0][i])
          }
          this.setState({
            group_list: user_list
          });
        })
        this.setState({
          logged_in: true
        });
      this.closeModal()
  }

  loginPost(){
    const data =
      {   session: {
            email: this.state.email,
            password: this.state.password,
          }
      };
    const getCsrfToken = () => {
      const metas = document.getElementsByTagName('meta');
      for (let meta of metas) {
          if (meta.getAttribute('name') === 'csrf-token') {
              console.log('csrf-token:', meta.getAttribute('content'));
              return meta.getAttribute('content');
          }
      }
      return '';
    }
      fetch("/sessions/login", {
        method: 'POST', // or 'PUT'
        headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-Token': getCsrfToken()
        },
        body: JSON.stringify(data),
      }).then(res => res.json())
      .then(
        (result) => {
          var group_list = []
          for(var i in result[0]){
            group_list.push(result[0][i])
          }

          this.setState({
            group_list: group_list
          });
        })
        this.setState({
          logged_in: true
        });
        this.GroupsListRef.current.getGroupList();
      this.closeModal()
  }



  render () {
    let modal_content;
    if(this.state.modal_type=="signup") {
        modal_content =
            <div class = "signup-login-modal">
              <h2>新規アカウント登録</h2>
              <input name="user_name" class="form-control" type="text" placeholder = "name" value={this.state.user_name}  onChange={this.handleChange}/>
              <input name="email" class="form-control" type="text" placeholder = "email" value={this.state.email}  onChange={this.handleChange}/>
              <input name="password" class="form-control" type="password" placeholder = "password" value={this.state.password}  onChange={this.handleChange}/>
              <input name="password_confirm" class="form-control" type="password" placeholder = "password confirm" value={this.state.password_confirm}  onChange={this.handleChange}/>
              <button class="btn btn-info" onClick={this.signupPost}>登録</button>
            </div>
    }else if(this.state.modal_type=="login"){
        modal_content =
              <div class = "signup-login-modal">
                <h2>ログイン</h2>
                <input name="email" class="form-control" type="text" placeholder = "email" value={this.state.email}  onChange={this.handleChange}/>
                <input name="password" class="form-control" type="password" placeholder = "password" value={this.state.password}  onChange={this.handleChange}/>
                <button class="btn btn-info" onClick={this.loginPost}>ログイン</button>
              </div>
    } else {
    }

    return (
      <div>
        {(() => {
          if(this.state.logged_in){
            return(
              <div>
                <Header/>
                <GroupsList groups={this.state.group_list}/>
              </div>
            )
          }else{
            return(
              <div>
                <h1 class ="display-1 top-page-title">Share Task</h1>
                <div class = "top-page-content">
                   新しいチャレンジをする時、<br/>
                   新しい習慣を身に付ける時、<br/>
                   同じ目標を持つ仲間がそばにいてくれたら<br/>
                   どんなに心強いでしょうか。<br/>
                   お互いの目標やタスクを共有して<br/>
                   仲間を見つけてください。<br/>
                  <div>Let's share your task!</div>
                </div>
                <div class="top-page-buttons">
                  <button class="btn btn-primary top-page-singup-button" onClick={()=>this.openModal("signup")}>新規アカウント登録</button>
                  <button class="btn btn-outline-success top-page-login-button" onClick={()=>this.openModal("login")}>ログイン</button>
                </div>
                <p></p>

                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  {modal_content}

                </Modal>


                <Catsle/>
              </div>
            )
          }
        })()}
      </div>
    );
  }
}

Top.propTypes = {
  message: PropTypes.string
};
export default Top