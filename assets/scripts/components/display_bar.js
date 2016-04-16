import React, { Component } from 'react';
import { connect } from 'react-redux';

class DisplayBar extends Component{

	render() {
		let userName = 'loading',
				photo = null,
				profileData = this.props.profile;
		if (typeof profileData !== 'undefined') {
			userName = profileData.user.profile.real_name_normalized
			photo = profileData.user.profile.image_72;
		}
		return (
			<header className="app-header">
				<div className="intro">
					<h1>slack deletron</h1>
				</div>
				<div className="userProfile">
					<p>Oh hey {userName}!</p>
					<img src={photo} className="profileImage" />
					<a href="/logout" className="logout">Logout</a>
				</div>
			</header>
		)
	}
}

function mapStateToProps(state) {
	return {
		profile: state.profileInfo.data,
		fileGroup: state.files
	}
}

export default connect(mapStateToProps)(DisplayBar);
