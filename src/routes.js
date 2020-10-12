import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import SignIn from './components/SignIn'
import ScrollToTop from './components/ScrollTop'
import SignUp from './components/SignUp'
import ProfilePic from './components/ProfilePic'
import TinyUrl from './components/TinyUrl'
import Dashboard from './components/Dashboard'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ SignIn } />
          <Route exact path='/dashboard' component={ Dashboard } />
          <Route exact path='/signin' component={ SignIn } />
          <Route exact path='/signup' component={ SignUp } />
          <Route exact path='/profile' component={ ProfilePic } />
          <Route exact path='/tinyurl' component={ TinyUrl } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )