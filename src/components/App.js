import React, {Component} from 'react';
import 'bootstrap-scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp, faEdit } from '@fortawesome/free-solid-svg-icons';
import './app.scss';
import Cards from './Card/Cards';

library.add(faAngleDown, faAngleUp, faEdit);

class App extends Component {
	
	render () {
		return (
			<div className="container-fluid">
			<h1 className="my-4"> Intuit Demo <br />
				<small>Contacts List</small>
			</h1>
			<p>
				This is a demo of a contacts card list done in react js
			</p>
				<Cards />
			</div>
			);

	}
}

export default App;