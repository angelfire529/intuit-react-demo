import React, {Component} from 'react';
import 'bootstrap-scss'
import './app.scss';
import Cards from './Cards';

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