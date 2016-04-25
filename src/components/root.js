import React, { Component, PropTypes} from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
//import store from './store';
//import actions from './actions';
//import Wrapper from './pages/wrapper';
//import Articles from './pages/articles';
import NavApp from './nav/nav';
import Tree from "./tree/tree";
import Stat from "./stat/stat";
import Pomodario from "./pomodario/pomodario";
import Articles from "./article/articles";


class Wrap extends Component {
  render(){
    return (
      <div>
        <NavApp/>
        {this.props.children}
      </div>
    )
  }
}


export class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };


  /*
	componentWillMount() {
		//store.dispatch(actions.startListeningToArticles());
	}
  */

	render() {
    const { store } = this.props;

		return (
			<Provider store={store}>
				<Router>
					<Route path="/" component={Wrap}>
            <IndexRoute component={Tree} />
            <Route path="tree" component={Tree} />
            <Route path="stat" component={Stat} />
            <Route path="pomodario" component={Pomodario} />
            <Route path="articles" component={Articles} />
					</Route>
				</Router>
			</Provider>
		);
	}
}

