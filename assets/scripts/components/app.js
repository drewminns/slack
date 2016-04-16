import React, { Component }  from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import DisplayBar from './display_bar';
import FileSearch from './file_search';
import FileDisplay from './file_display';

class App extends Component {

	componentWillMount() {
			
		this.props.fetchAuth().then(() => {
			let token = this.props.authData.token;
			let id = this.props.authData.profile.id;
			this.props.fetchProfile(token, id);
		});
	}

	render() {
		return (
			<div>
				<DisplayBar />
				<section className="fileDisplay">
					<FileSearch />
					<FileDisplay />
				</section>
			</div>
		)
	}

}

function mapStateToProps(state) {
	return {
		authData: state.auth.profile,
		profile: state.profileInfo.data
	}
}

export default connect(mapStateToProps, actions)(App);
