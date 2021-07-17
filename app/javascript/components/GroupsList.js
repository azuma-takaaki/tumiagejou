import React from "react"
import PropTypes from "prop-types"
import Modal from 'react-modal'
import Group from "./Group.jsx"

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

class GroupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_list: props.groups,
      input_value: ''
    }
    this.getGroupList = this.getGroupList.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postData = this.postData.bind(this);
  }

  getGroupList() {
    fetch("/get_group_list",{
      method: 'GET'
      }).then(res => res.json())
      .then(
        (result) => {

          var group_list = []
          this.setState({
            group_list: group_list
          });
          for(var i in result[0]){
            group_list.push(result[0][i])
          }
          this.setState({
            group_list: group_list
          });
        }
      )
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
    this.subtitle.style.color = '#fff000';
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  handleChange(e){
    this.setState({input_value: e.target.value});
  }
  postData(){
    const data = { group: {name: this.state.input_value} };

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
      fetch("/groups", {
        method: 'POST', // or 'PUT'
        headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-Token': getCsrfToken()
        },
        body: JSON.stringify(data),
      }).then(this.getGroupList)
      this.setState({modalIsOpen: false});
      this.setState({input_value: ""});
      closeModal()
  }


  render () {
    return (
      <React.Fragment>
        {this.state.group_list.map((group) => {
          return (
            //<p class="users-group"><a href={"/groups/" + group.id }>{group.name}</a></p>
              <div>
                <Group group={group} updateGroupList={() => this.getGroupList}/>
                <p></p>
              </div>
          )
        })}
        <button onClick={this.openModal}>新しいグループを作成する</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>新しいグループを作成</h2>
          <input type="text" value={this.state.input_value}  onChange={this.handleChange}/>
          <button onClick={this.postData}>グループを作成</button>
        </Modal>
      </React.Fragment>
    );
  }

}


//return <a href={"/groups/" + {group.id}}>{group.name}</a>;
//reactに組み込まれた型指定方法で， 意図しない型の変数が入らないように指定している
GroupsList.propTypes = {
  groups: PropTypes.string
};

export default GroupsList
