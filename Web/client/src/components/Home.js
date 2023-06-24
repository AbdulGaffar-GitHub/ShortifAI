import React, { Component } from 'react'
import { getnewsbysources, getBookMarkedArticle, currentUser, addToBookmark } from './UserFuctions'
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { MDBContainer, MDBModalFooter, MDBModalBody, MDBModalHeader, MDBModal, MDBRow, MDBIcon, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import ReactSnackBar from "react-js-snackbar";
import noImage from './no-image.webp';
import { Spinner } from 'react-bootstrap';
//Detect changes
class Home extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      articles: [],
      page_url: '',
      modal13: false,
      summaryText: '',
      summaryImage: '',

      Show: false,
      Showing: false,
      message: 'Hello There',
      zero: false,
      loading:true
    }

    this.onChange = this.onChange.bind(this)
    this.addToBookmark = this.addToBookmark.bind(this)
  }

  toggle = k => () => {
    let modalNumber = 'modal' + '13'
    this.setState({
      modal13: !this.state.modal13,
      summaryText: this.state.articles[k].text,
      summaryImage: this.state.articles[k].top_image
    });
  }

  show = (message) => {
    if (this.state.Showing) return;

    this.setState({ Show: true, Showing: true, message: message });
    setTimeout(() => {
      this.setState({ Show: false, Showing: false });
    }, 2000);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async componentDidMount() {
    let page_url = this.props.history.location.pathname.split('/')[1]

    const resp = await currentUser()
    if (resp.status !== "success") {
      this.props.history.push(`/error`)
      return
    }
    const curr = resp.user

    var final_string = ""
    for (var i = 0; i < curr.suscribed.length; i++) {
      final_string = final_string.concat(curr.suscribed[i], ',')
    }

    const data = {
      main_urls: final_string,
    }


    if (page_url === "home" || page_url === "top") {
      this.setState({ loading: true });
      console.log(this.state.loading)
      await getnewsbysources(data).then((res) => {
        if (res.status === "success") {
          console.log(res.articles);
          if (res.articles.length === 0) {
            this.setState({
              zero: true,
            });
          } else {
            // Filter out the articles that do not have a "top" category
            const topArticles = res.articles.filter(
              (article) => article.category === "top"
            );
            setTimeout(() => {
              this.setState({ loading: false });
            }, 100);
            this.setState({
              articles: topArticles,
              page_url: page_url,

            });
            console.log(this.state.loading)
          }
        } else {
          this.props.history.push(`/error`);
        }
      });
    }


    else if (page_url === "sports") {
      this.setState({ loading: true });
      await getnewsbysources(data).then((res) => {
        if (res.status === "success") {
          console.log(res.articles);
          if (res.articles.length === 0) {
            this.setState({
              zero: true,
            });
          } else {
            // Filter out the articles that do not have a "sports" category
            const sportsArticles = res.articles.filter(
              (article) => article.category === "sports"
            );
            setTimeout(() => {
              this.setState({ loading: false });
            }, 100);
            this.setState({
              articles: sportsArticles,
              page_url: page_url,

            });
          }
        } else {
          this.props.history.push(`/error`);
        }
      });
    }


    else if (page_url === "technology") {
      this.setState({ loading: true });
      await getnewsbysources(data).then((res) => {
        if (res.status === "success") {
          console.log(res.articles);
          if (res.articles.length === 0) {
            this.setState({
              zero: true,
            });
          } else {
            // Filter out the articles that do not have a "technology" category
            const technologyArticles = res.articles.filter(
              (article) => article.category === "technology"
            );

            setTimeout(() => {
              this.setState({ loading: false });
            }, 100);
            this.setState({
              articles: technologyArticles,
              page_url: page_url,

            });
          }
        } else {
          this.props.history.push(`/error`);
        }
      });
    }

    else if (page_url === "business") {
      this.setState({ loading: true });
      await getnewsbysources(data).then((res) => {
        if (res.status === "success") {
          console.log(res.articles);
          if (res.articles.length === 0) {
            this.setState({
              zero: true,
            });
          } else {
            // Filter out the articles that do not have a "business" category
            const businessArticles = res.articles.filter(
              (article) => article.category === "business"
            );

            setTimeout(() => {
              this.setState({ loading: false });
            }, 100);
            this.setState({
              articles: businessArticles,
              page_url: page_url,

            });
          }
        } else {
          this.props.history.push(`/error`);
        }
      });
    }


    else if (page_url === "entertainment") {
      this.setState({ loading: true });
      await getnewsbysources(data).then((res) => {
        if (res.status === "success") {
          console.log(res.articles);
          if (res.articles.length === 0) {
            this.setState({
              zero: true,
            });
          } else {
            // Filter out the articles that do not have a "entertainment" category
            const entertainmentArticles = res.articles.filter(
              (article) => article.category === "entertainment"
            );

            setTimeout(() => {
              this.setState({ loading: false });
            }, 100);
            this.setState({
              articles: entertainmentArticles,
              page_url: page_url,

            });
          }
        } else {
          this.props.history.push(`/error`);
        }
      });
    }


    else if (page_url === "world") {
      this.setState({ loading: true });
      await getnewsbysources(data).then((res) => {
        if (res.status === "success") {
          console.log(res.articles);
          if (res.articles.length === 0) {
            this.setState({
              zero: true,
            });
          } else {
            // Filter out the articles that do not have a "world" category
            const worldArticles = res.articles.filter(
              (article) => article.category === "world"
            );

            setTimeout(() => {
              this.setState({ loading: false });
            }, 100);
            this.setState({
              articles: worldArticles,
              page_url: page_url,

            });
          }
        } else {
          this.props.history.push(`/error`);
        }
      });
    }

    else if (page_url === "politics") {
      this.setState({ loading: true });
      await getnewsbysources(data).then((res) => {
        if (res.status === "success") {
          console.log(res.articles);
          if (res.articles.length === 0) {
            this.setState({
              zero: true,
            });
          } else {
            // Filter out the articles that do not have a "politics" category
            const politicsArticles = res.articles.filter(
              (article) => article.category === "politics"
            );

            setTimeout(() => {
              this.setState({ loading: false });
            }, 100);
            this.setState({
              articles: politicsArticles,
              page_url: page_url,

            });
          }
        } else {
          this.props.history.push(`/error`);
        }
      });
    }

    else if (page_url == "bookmark") {
      this.setState({ loading: true });
      await getBookMarkedArticle().then(res => {

        if (res.status == "success") {
          console.log(res.articles)

          setTimeout(() => {
            this.setState({ loading: false });
          }, 100);
          this.setState({
            articles: res.articles,
            page_url: page_url,
          })
        }
        else {
          this.props.history.push(`/error`)
          return
        }
      })
    }
  }

  async addToBookmark(id) {
    //var id=e.target.getAttribute('id');
    console.log(id)
    console.log(this.state.articles[0]._id)
    const result = await addToBookmark({ id })
    console.log(result)
    if (result.status == "success") {
      this.show(result.message)


      //If it is bookmark page

      if (this.state.page_url == "bookmark") {
        console.log(result.bookmarks)
        this.setState({
          articles: result.bookmarks
        })
      }

    }
    else {
      this.show(result.message)
    }

  }

  render() {
    const { loading } = this.state;

    if (!localStorage.usertoken || localStorage.usertoken == "undefined") {
      return <Redirect
        to="/error"
      />;
    }
    if (this.state.zero == true) {
      return (
        <h2 class="text-center">You have Not subscribed to any sources to yet. Follow the <a href="/OptionPage">link</a></h2>
      )
    }

    
    return (

      <div className="container mt-3">
        {this.state.articles.length === 0 && (!localStorage.usertoken || localStorage.usertoken === "undefined") ? (
          <Redirect to="/error" />
        ) :loading ? (
          <div className="text-center">
          <Spinner animation="border" />
        </div>// Show loading indicator when loading is true
        )  :this.state.articles.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <div>
              <h1>No Articles Found</h1>
              <h5>Please Subscribe to multiple news sources</h5>
            </div>
          </div>
        ) :  (


          this.state.articles.map((data, index) => {

            if (index % 3 == 0) {
              console.log("mode3: " + index)

              return (
                <div className="container m-3 p-3 row" style={{ backgroundColor: "#FFFFFF" }}>
                  <MDBContainer>
                    <MDBRow>
                      {[index, index + 1, index + 2].map(k => {

                        if (k >= this.state.articles.length) {
                          return
                        }

                        return (
                          <MDBCol md='4'>
                            <MDBCard style={{ height: "500px", width: "43vh", position: "relative" }}>
                              <MDBCardImage
                                hover
                                overlay='white-light'
                                className='card-img-top'
                                style={{ height: "200px" }}
                                src={this.state.articles[k].top_image ? this.state.articles[k].top_image : noImage}
                              />

                              <MDBCardBody cascade className='text-center'>
                                <div style={{ textAlign: "left", maxHeight: "100px", overflowY: "auto" }}>
                                  <strong>{this.state.articles[k].title}</strong>
                                </div>

                                {/* <MDBCardText>
                                  <MDBIcon icon='quote-left' /><strong>{this.state.articles[k].title}</strong><MDBIcon icon='quote-right' />
                                  </MDBCardText> */}

                                <div style={{ position: "absolute", bottom: "60px" }}>
                                  <p className='font-weight-bold blue-text'><a href={this.state.articles[k].url}>{this.state.articles[k].source_id}</a></p>

                                  <MDBCol md='12' className='d-flex justify-content-center'>
                                    <button

                                      onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = this.state.articles[k].url;
                                      }}

                                      type="button" class="btn btn-secondary">Article</button>

                                    <button onClick={this.toggle(k)} type="button" class="btn btn-primary">Summary</button>

                                  </MDBCol>

                                  <Button variant="contained" color="primary" onClick={() => this.addToBookmark(this.state.articles[k]._id)}>
                                    <MDBIcon far icon="bookmark" />
                                  </Button>
                                </div>
                              </MDBCardBody>

                              <div className='rounded-bottom mdb-color lighten-3 text-center pt-3'>
                                <ul className='list-unstyled list-inline font-small'>
                                  <li className='list-inline-item pr-2 white-text'>
                                    <MDBIcon far icon='clock' /> {new Date(this.state.articles[k].pub_date).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    }) + ' ' + new Date(this.state.articles[k].pub_date).toLocaleTimeString('en-US', {
                                      hour12: false,
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      second: '2-digit'
                                    })}

                                  </li>
                                </ul>
                              </div>

                            </MDBCard>
                          </MDBCol>
                        )
                      })}
                    </MDBRow>

                  </MDBContainer>
                </div>
              )
            }//if mode 3 statement end
          }))}
        <MDBModal isOpen={this.state.modal13} toggle={this.toggle(0)}>

          <MDBModalHeader toggle={this.toggle(0)}>
            Summary
          </MDBModalHeader>
          <MDBModalBody>

            <img src={this.state.summaryImage} style={{ width: "100%", height: "30vh" }} />
            {this.state.summaryText}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(0)}>
              Close
            </MDBBtn>

          </MDBModalFooter>
        </MDBModal>
        <div>
          <div>
            <ReactSnackBar Icon={<MDBIcon icon="newspaper" />} Show={this.state.Show}>
              {this.state.message}
            </ReactSnackBar>
          </div>
        </div>
      </div>
    )
  }
}

export default Home