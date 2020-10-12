import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Topbar from "./Topbar";
import ProfilePicture from "profile-picture";
import "profile-picture/build/ProfilePicture.css";
import { withStyles } from "@material-ui/styles";
import Alert from "@material-ui/lab/Alert";
import { config } from "../config";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class SignUp extends Component {
  constructor() {
    super();
    this.profilePictureRef = React.createRef();
    this.state = {
      showAlert: false,
      allowSubmit: false,
    };
  }

  alertHandler = () => {
    this.setState({ showAlert: true });
    setTimeout(() => {
      if (this.state.showAlert !== false) {
        this.setState({ showAlert: false });
      }
    }, 5000);
  };

  nextPath = (path) => {
    this.props.history.push(path);
  };

  handleUpload = (event) => {
    event.preventDefault();
    const imageAsDataURL = this.profilePictureRef.current.getImageAsDataUrl();
    var obj = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    };

    fetch(config.TINYURL + "user", obj)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("login", JSON.stringify(data));
        this.nextPath("/tinyurl");
      })
      .catch((error) => {
        this.alertHandler();
      });

    //this.nextPath("/tinyurl")
    //console.log(PP,imageData,file,imageAsDataURL)
  };

  emailChangeHandler = (event) => {
    if (
      event.target.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      this.setState({
        email: event.target.value,
        allowSubmit: true,
      });
    } else {
      this.setState({
        allowSubmit: false,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <Topbar currentPath={this.props.location.pathname} />
        {this.state.showAlert && (
          <Alert severity="error" style={{ backgroundColor: "white" }}>
            Invalid Crendentials
          </Alert>
        )}
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleUpload}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ProfilePicture
                    ref={this.profilePictureRef}
                    useHelper={true}
                    debug={false}
                    frameFormat="circle"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.emailChangeHandler}
                  />
                </Grid>
                {/* {!this.state.allowSubmit && <p style={{color:"red"}}>Invalid Format</p>} */}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                disabled={!this.state.allowSubmit}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default withRouter(withStyles(useStyles)(SignUp));
