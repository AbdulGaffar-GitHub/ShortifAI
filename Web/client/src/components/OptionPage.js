//Check heroku 
import React, { Component } from 'react'
import { allsourcesFun, getnewsbysources, suscribe, currentUser } from './UserFuctions'
import { Form, Button, FormGroup, FormControl, InputGroup } from "react-bootstrap";

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ReactSnackBar from "react-js-snackbar";
import { MDBBadge, MDBIcon, MDBRow, MDBCol, MDBContainer, MDBTable, MDBTableBody, MDBTableHead, MDBInput } from 'mdbreact';

class SelectPage extends Component {
  constructor() {
    super();
    const storedChecked = localStorage.getItem('checked');
    this.state = {
      options: [],
      checked: storedChecked ? JSON.parse(storedChecked) : [],
      Show: false,
      Showing: false,
      message: '',
      allsources: [],
      display_sources: [],
    };

    this.onChange = this.onChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.changeOptionList = this.changeOptionList.bind(this)
    this.selectAll = this.selectAll.bind(this)
  }


  async componentDidMount() {
    const resp = await currentUser()
    if (resp.status != "success") {
      this.props.history.push(`/error`)
    }

    const allsources = await allsourcesFun()
    if (allsources.status == "success") {
      let check = new Array(allsources.sources.length).fill(0);
      let optionss = new Array(allsources.sources);
      this.setState({
        allsources: allsources.sources,
        display_sources: allsources.sources,
        checked: check,
        options: optionss
      })
    }
    else if (allsources.status == "fail") {
      this.props.history.push(`/error`)
    }


    const curr = resp.user
    console.log('curr.suscribed:  ' + curr.suscribed)
    const storedChecked = localStorage.getItem('checked');
    let temp_checked = this.state.checked;
    if (storedChecked) {
      temp_checked = JSON.parse(storedChecked);
    } else {
      for (var i = 0; i < curr.suscribed.length; i++) {
        var index = this.state.allsources.findIndex(
          (item) => item.source_id === curr.suscribed[i]
        );

        if (index !== -1) {
          temp_checked[index] = 1;
        }
      }
      localStorage.setItem('checked', JSON.stringify(temp_checked));
    }
    this.setState({
      checked: temp_checked,
    });
  }
  changeOptionList(e) {
    const query = e.target.value
    console.log(e.target.value)
    if (query == "") {
      this.setState({
        display_sources: this.state.allsources
      })
      return
    }

    let filterlist = this.state.allsources.filter((item) => {
      if (item.source_id.toLowerCase().search(query.toLowerCase()) != -1) {
        return item
      }
    })
    this.setState({
      display_sources: filterlist
    })

  }

  onChange(e) {
    let checked_temp = [];
    if (e.target.checked) {
      checked_temp = this.state.checked;
      checked_temp[e.target.value] = 1;
      console.log('was nt checked');
    } else {
      checked_temp = this.state.checked;
      checked_temp[e.target.value] = 0;
      console.log('was checked');
    }
    this.setState({ checked: checked_temp });
    localStorage.setItem('checked', JSON.stringify(checked_temp));
  }
  //   console.log(e.target.value)
  //   //console.log(e.target)
  //   let checked = [...this.state.checked];
  //   checked[e.target.value] = !checked[e.target.value];
  //   this.setState({ checked });   
  // }


  async handleButtonClick(e) {
    var selected_items = ""
    var selected_list = []
    for (var i = 0; i < this.state.allsources.length; i++) {
      if (this.state.checked[i] == 1) {
        selected_items = selected_items.concat(this.state.allsources[i].source_id, ',')
        selected_list.push(this.state.allsources[i].source_id)
      }
    }
    if (selected_list.length <= 1) {
      this.show("Select Atleast 2 sources")
      return
    }


    console.log("final String: " + selected_items)
    let data = {
      selected_items: selected_items,
      selected_list: selected_list
    }
    const result = await suscribe(data)
    if (result.status == "success") {
      this.show("Subscribed to " + selected_list.length + " sources successfully")
    }
    console.log(result)
    this.props.history.push("/home");
  }

  selectAll = (e) => {
    const checked_temp = [];
    const checkedValue = e.target.checked ? 1 : 0;

    for (let i = 0; i < this.state.display_sources.length; i++) {
      checked_temp[i] = checkedValue;
    }

    this.setState({ checked: checked_temp });
    localStorage.setItem('checked', JSON.stringify(checked_temp));
  }




  show = (message) => {
    console.log(message)
    if (this.state.Showing) return;

    this.setState({ Show: true, Showing: true, message: message });
    setTimeout(() => {
      this.setState({ Show: false, Showing: false });
    }, 2000);
  };

  render() {
    if (!localStorage.usertoken || localStorage.usertoken == "undefined") {
      return <Redirect
        to="/error"
      />;
    }
    return (
      <div className="container mt-4" style={{ textAlign: "center" }}>


        <Form className="m-4">
          <Form.Group>
            <Form.Control onChange={this.changeOptionList} type="text" placeholder="Search..." />
          </Form.Group>
        </Form>

        <h1 className="m-2">Subscribe Page:<MDBBadge color="primary">{this.state.display_sources.length}</MDBBadge></h1>
        <div className="container mt-4" style={{ overflowY: "scroll", height: "80vh" }}>

          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>Index</th>
                <th>News Sources</th>
                <th>
                  <input type="checkbox" onChange={this.selectAll} checked={this.state.checked.every(Boolean)} />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.display_sources.map((data, index) => {
                if (this.state.checked[data.unique_id] == 1) {
                  return (
                    <tr>
                      <td>{data.unique_id}</td>
                      <td>{data.source_id}</td>
                      <td>
                        <input type="checkbox" onChange={this.onChange} value={data.unique_id} checked />
                      </td>
                    </tr>
                  )
                } else {
                  return (
                    <tr>
                      <td>{data.unique_id}</td>
                      <td>{data.source_id}</td>
                      <td>
                        <input type="checkbox" onChange={this.onChange} value={data.unique_id} />
                      </td>
                    </tr>
                  )
                }
              })}
            </tbody>

          </table>
        </div>
        <Button className="text-center" onClick={this.handleButtonClick}>
          Submit
        </Button>


        <div>
          <ReactSnackBar Icon={<MDBIcon icon="newspaper" />} Show={this.state.Show}>
            {this.state.message}
          </ReactSnackBar>
        </div>



        <MDBContainer>
          <br></br>
          <h1>Your Subscribitions:</h1>
          <div style={{ overflowY: "scroll", height: "80vh", marginTop: "10vh" }}>

            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>News Sources</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>

                {this.state.display_sources.map((data, index) => {
                  if (this.state.checked[data.unique_id] == 1) {


                    return (

                      <tr>
                        <td>{data.unique_id}</td>
                        <td>{data.source_id}</td>
                        <td>

                          <input type="checkbox" onChange={this.onChange} value={data.unique_id} checked />
                        </td>
                      </tr>

                    )

                  }

                })}
              </tbody>
            </table>
          </div>
        </MDBContainer>

      </div>
    )
  }

}

export default SelectPage