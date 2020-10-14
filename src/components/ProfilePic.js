import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withStyles } from "@material-ui/styles";
import "profile-picture/build/ProfilePicture.css";
import React, { Component, PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { config } from "../config";
import Topbar from "./Topbar";

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

class Profile extends Component {
  constructor() {
    super();
    this.profilePictureRef = React.createRef();
    this.state = {
      loggedIn: false,
      token: undefined,
      username: "",
      email: "",
    };
  }

  componentDidMount() {
    let login = JSON.parse(localStorage.getItem("login"));
    if (!login.jwt) {
      this.nextPath("/signin");
    } else {
      this.setState(
        {
          loggedIn: true,
          token: login.jwt,
          user: login.user_id,
        },
        () => {
          this.getProfile();
        }
      );
    }
  }

  getProfile = () => {
    var obj = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
      Credentials: "include",
    };

    fetch(config.TINYURL + "getProfile/" + this.state.user, obj)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          username: data.username,
          email: data.email,
        });
      });
    // this.setState({
    //   username: "teja",
    //   email: "dpaidimarry@ea.com",
    // });
  };

  nextPath = (path) => {
    this.props.history.push(path);
  };

  handleUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  emailChangeHandler = (event) => {
    if (
      event.target.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      this.setState({
        email: event.target.value,
      });
    } else {
      this.setState({ email: undefined });
    }
  };

  handleUpload = (event) => {
    event.preventDefault();
    var obj = {
      method: "POST",
      Credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
      }),
    };

    fetch(config.TINYURL + 'addProfile/' + this.state.user, obj)
      .then((response) => response.json())
      .then((data) => {
        this.nextPath("/tinyurl");
      })
      .catch((error) => {
        console.log(error);
      });
    //this.nextPath("/tinyurl");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <Topbar currentPath={this.props.location.pathname} />
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>

            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleUpload}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img
                    src="https://logos-download.com/wp-content/uploads/2016/11/EA_logo_Electronic_Arts.png"
                    alt="profile"
                    style={{ width : "100%",marginLeft : "50%"}}
                  />
                  {/* <ProfilePicture
                    ref={this.profilePictureRef}
                    image={this.state.image}
                    useHelper={true}
                    debug={false}
                    frameFormat="circle"
                  /> */}
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={this.state.username}
                    onChange={this.handleUsername}
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
                    value={this.state.email}
                    onChange={this.emailChangeHandler}
                  />
                </Grid>
                {/* <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update Profile
              </Button>
              {/* {!this.state.loggedIn && (
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              )} */}
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

export default withRouter(withStyles(useStyles)(Profile));
