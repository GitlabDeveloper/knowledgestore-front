import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import Header from "../component/Header";
import NotFound from "../component/NotFound";
import browserHistory from "../../store/browserHistory";

const AppRouter = () => (
	<Router history={browserHistory}>
		<div className='container'>
			<Header/>
			<Switch>
				{/*Add routing here */}
				<Route component={NotFound}/>
			</Switch>
		</div>
	</Router>
);

export default AppRouter;