import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box, Button, Link as MaterialLink } from "@material-ui/core";
import Menu from "./Menu";

class Topbar extends Component {
  state = {
    value: 0,
    menuDrawer: false,
    loggedIn: false,
    isAdmin: false,
    user_id: undefined,
  };

  nextPath = (path) => {
    this.props.history.push(path);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    let login = JSON.parse(localStorage.getItem("login"));
    console.log(login);
    let loggedIn = login && login["jwt"] ? true : false;
    //console.log(login["jwt"])
    if (this.state.loggedIn !== loggedIn) {
      //console.log(this.state.loggedIn,loggedIn)
      this.setState(
        {
          loggedIn: loggedIn,
          isAdmin: login.isAdmin,
          user_id: login.user_id,
        },
        () => {
          console.log(this.state);
        }
      );
    }
    window.scrollTo(0, 0);
  }

  current = () => {
    if (this.state.loggedIn && this.state.isAdmin) {
      console.log(this.props.currentPath);
      return Menu.filter((tab) => tab.admin === true).findIndex(
        (tab) => tab.pathname === this.props.currentPath
      );
    } else if (this.state.loggedIn) {
      console.log(this.props.currentPath);
      return Menu.filter((tab) => tab.showWhenLogged === true).findIndex(
        (tab) => tab.pathname === this.props.currentPath
      );
    } else {
      return Menu.filter((tab) => tab.show === true).findIndex(
        (tab) => tab.pathname === this.props.currentPath
      );
    }
  };
  // }
  // if (this.props.currentPath === "/home") {
  //   return 0;
  // }
  // if (this.props.currentPath === "/dashboard") {
  //   return 1;
  // }
  // if (this.props.currentPath === "/signup") {
  //   return 2;
  // }
  // if (this.props.currentPath === "/wizard") {
  //   return 3;
  // }
  // if (this.props.currentPath === "/cards") {
  //   return 4;
  // }

  signOut = () => {
    localStorage.removeItem("login");
    this.nextPath("/signin");
  };

  renderAdminTabs = (classes) => {};

  renderTabs = (classes) => {};

  renderGuestTabs = (classes) => {};

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={10} alignItems="baseline">
            <Grid item xs={12} className={classes.flex}>
              <div className={classes.inline}>
                <Typography variant="h6" color="inherit" noWrap>
                  <Link to="/" className={classes.link}>
                    <img
                      width={20}
                      src="https://cdn.discordapp.com/emojis/425024938743824384.gif"
                      alt=""
                    />
                    <span className={classes.tagline}>Tiny URL</span>
                  </Link>
                </Typography>
              </div>
              {!this.props.noTabs && (
                <React.Fragment>
                  <div className={classes.productLogo}>
                    <Typography>It works</Typography>
                  </div>
                  <Box flexDirection="row-reverse">
                    <div className={classes.tabContainer}>
                      <Tabs
                        value={this.current() || this.state.value}
                        indicatorColor="primary"
                        textColor="primary"
                        fontWeight="40"
                        onChange={this.handleChange}
                      >
                        {this.state.loggedIn === true &&
                          this.state.isAdmin === true &&
                          Menu.filter((tab) => tab.admin === true).map(
                            (item, index) => (
                              <Tab
                                key={index}
                                component={item.external ? MaterialLink : Link}
                                href={item.external ? item.pathname : null}
                                to={
                                  item.external
                                    ? null
                                    : {
                                        pathname: item.pathname,
                                        search: this.props.location.search,
                                      }
                                }
                                classes={{ root: classes.tabItem }}
                                label={item.label}
                              />
                            )
                          )}

                        {this.state.loggedIn === true &&
                          this.state.isAdmin === false &&
                          Menu.filter((tab) => tab.showWhenLogged === true).map(
                            (item, index) => (
                              <Tab
                                key={index}
                                component={item.external ? MaterialLink : Link}
                                href={item.external ? item.pathname : null}
                                to={
                                  item.external
                                    ? null
                                    : {
                                        pathname: item.pathname,
                                        search: this.props.location.search,
                                      }
                                }
                                classes={{ root: classes.tabItem }}
                                label={item.label}
                              />
                            )
                          )}

                        {this.state.loggedIn === false &&
                          Menu.filter((tab) => tab.show === true).map(
                            (item, index) => (
                              <Tab
                                key={index}
                                component={item.external ? MaterialLink : Link}
                                href={item.external ? item.pathname : null}
                                to={
                                  item.external
                                    ? null
                                    : {
                                        pathname: item.pathname,
                                        search: this.props.location.search,
                                      }
                                }
                                classes={{ root: classes.tabItem }}
                                label={item.label}
                              />
                            )
                          )}
                      </Tabs>
                    </div>
                  </Box>
                  {this.state.loggedIn && (
                    <Box
                      display="flex"
                      flexDirection="row-reverse"
                      style={{ width: "100%" }}
                    >
                      <Button
                        size="small"
                        style={{
                          position: "bottom",
                          marginTop: "0.4%",
                          marginBottom: "0.4%",
                          marginLeft: "30%",
                          backgroundColor: "black",
                          color: "white",
                          width: "10%",
                          padding: "0",
                        }}
                        onClick={this.signOut}
                      >
                        Sign Out
                      </Button>
                    </Box>
                  )}
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = (theme) => ({
  appBar: {
    position: "relative",
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.grey["100"]}`,
    backgroundColor: "rgb(144, 202, 249)",
  },
  inline: {
    display: "inline",
  },
  flex: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  productLogo: {
    display: "inline-block",
    width: "10%",
    borderLeft: `1px solid ${theme.palette.grey["A100"]}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up("md")]: {
      paddingTop: "1.5em",
    },
  },
  tagline: {
    display: "inline-block",
    marginLeft: 10,
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.8em",
    },
  },
  iconContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  iconButton: {
    float: "right",
  },
  tabContainer: {
    marginLeft: 32,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: "auto",
    fontWeight: 40,
  },
});

export default withRouter(withStyles(styles)(Topbar));
