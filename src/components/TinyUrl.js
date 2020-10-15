import { Button, CssBaseline, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Alert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/styles";
import moment from "moment";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { config } from "../config";
import Topbar from "./Topbar";

class TinyUrl extends PureComponent {
  constructor() {
    super();
    this.state = {
      jwt: undefined,
      user_id: undefined,
      tinyUrl: undefined,
      showAlert: false,
      longUrl : undefined
    };
  }

  componentDidMount() {
    let login = JSON.parse(localStorage.getItem("login"));
    //console.log(!login)
    if (!login || !login.jwt) {
      this.nextPath("/signin");
    } else {
      this.setState({ user_id: login.user_id, jwt: login.jwt });
    }
  }

  nextPath = (path) => {
    this.props.history.push(path);
  };

  getTinyUrl(longUrl, date) {
    var obj = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.jwt}`,
      },
      body: JSON.stringify({
        userId: parseInt(this.state.user_id),
        originalUrl: longUrl,
        expirationDate: moment(date)
          .format(moment.DATETIME_LOCAL_SECONDS)
          .substring(0, 19),
      }),
    };

    fetch(config.TINYURL + "tinyUrl/", obj)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          tinyUrl: data.url,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // this.setState({
    //   tinyUrl: "http://blobdance/abcdefg",
    // });
  }

  validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  copyClipBoard = () => {
    navigator.clipboard.writeText(this.state.tinyUrl);
    this.setState({ showAlert: true });
    setTimeout(() => {
      if (this.state.showAlert !== false) {
        this.setState({ showAlert: false });
      }
    }, 5000);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      moment(event.target.date.value).format(
        moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
      )
    );
    this.getTinyUrl(event.target.longurl.value, event.target.date.value);
  };

  handleUrl = (event) => {
    if(this.validURL(event.target.value))
    {
      this.setState({
        longUrl : event.target.value
      })
    }
    else
    {
      this.setState({
        longUrl : undefined
      })
    }
    
  }

  preventDefault = (event) => event.preventDefault();

  render() {
    const { classes } = this.props;
    const post = {
      title: "BLOB DANCE",
      description: "A Tiny Url generator.",
      image:
        "https://s17233.pcdn.co/blog/wp-content/uploads/2017/08/Q119_Marketing_social_2_0124.png",
      imgText: "main image description",
      linkText: "Continue reading…",
    };

    return (
      <div style={{ height : "100%"}}>
        <CssBaseline />
        <Topbar currentPath={this.props.location.pathname} />
        <Paper
          className={classes.mainFeaturedPost}
          style={{ backgroundImage: `url(${post.image})` }}
        >
          {/* Increase the priority of the hero background image */}
          {
            <img
              style={{ display: "none", width: 40, height: "200%" }}
              src={post.image}
              alt={post.imageText}
            />
          }
          {this.state.showAlert && (
            <Alert style={{ backgroundColor: "white" }}>
              Copied to clipboard
            </Alert>
          )}
          <div className={classes.overlay} />
          <Grid container spacing={1}>
            <Grid item md={6} sm={1}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {post.title}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {post.description}
                </Typography>
              </div>
            </Grid>

            <Grid
              item
              xs={6}
              sm={9}
              style={{
                marginBottom: "10%",
                marginLeft: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <form
                className={classes.form}
                noValidate
                onSubmit={this.handleSubmit}
              >
                <TextField
                  style={{ color: "white", backgroundColor: "white" }}
                  id="longurl"
                  label="Long URL"
                  variant="filled"
                  name="longurl"
                  onChange={this.handleUrl}
                  fullWidth
                />

                <TextField
                  style={{
                    color: "white",
                    backgroundColor: "white",
                    width: "50%",
                    marginLeft: "2%",
                    marginTop: "0.5%",
                    height: "80%",
                  }}
                  id="date"
                  label="Expiration Date"
                  type="datetime-local"
                  defaultValue={moment(new Date()).format(
                    moment.HTML5_FMT.DATETIME_LOCAL
                  )}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <Button
                  type="submit"
                  disabled={!this.state.longUrl}
                  style={{
                    color: "white",
                    backgroundColor: "black",
                    marginLeft: "3%",
                    padding: "1%",
                    width: "30%",
                  }}
                >
                  Tiny URL
                </Button>
              </form>
              {this.state.tinyUrl && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {/* <Typography variant="h5"  paragraph style={{backgroundColor : "white",margin : "10%",color : "black"}}>
                    Here it is 
                  </Typography> */}
                    <TextField
                      id="outlined-read-only-input"
                      //label="Tiny Url"
                      //defaultValue="Hello World"
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{
                        color: "white",
                        backgroundColor: "white",
                        height: "25%",
                        marginTop: "8%",
                        width: "52%",
                      }}
                      variant="outlined"
                      value={this.state.tinyUrl.substr(this.state.tinyUrl.indexOf("/tiny"),this.state.tinyUrl.length)}
                      fullWidth
                    />

                    {/* <IconButton color="inherit" fontSize="large" iconStyle={{width:"100%",height:"100%"}} style={{ height : "2%", marginTop : "10%"}}>
                    <FileCopyIcon ></FileCopyIcon>
                  </IconButton> */}
                    <div style={{ marginTop: "8%" }}>
                      <Button
                        style={{
                          width: "250%",
                          height: "100%",
                          marginLeft: "90%",
                          backgroundColor: "white",
                        }}
                        onClick={this.copyClipBoard}
                      >
                        <FileCopyIcon></FileCopyIcon>Copy
                      </Button>
                    </div>
                  </div>
                  <Button
                    target="_blank"
                    href={this.state.tinyUrl}
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      marginLeft: "13%",
                      marginRight: "0",
                      marginTop: "2%",
                      marginBottom: "8%",
                      padding: "1%",
                      width: "27%",
                    }}
                  >
                    Click here to access the tiny URL
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

TinyUrl.propTypes = {
  post: PropTypes.object,
};

const useStyles = (theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(1),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height:800
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    height: theme.spacing(30),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "row",
  },
});

export default withRouter(withStyles(useStyles)(TinyUrl));
