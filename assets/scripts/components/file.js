import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import formatBytes from '../helpers/index';
import moment from 'moment';

class File extends Component {

	constructor(props) {
		super(props)
	}

	destroyFile() {
		this.props.destroyFile(this.props.authData.token, this.props.details.id);
	}

	render() {
		let previewImage;
		if (this.props.details.mimetype.includes('image')) {
			previewImage = <div className="previewImg"><img src={this.props.details.thumb_360}/></div>;
		} else {
			previewImage = null
		}
		let previewCode;
		if(this.props.details.preview) {
			previewCode = <pre className="fileCode"><code>{this.props.details.preview}</code></pre>
		} else {
			previewCode = null
		}
		return (
			<div className="fileDetails">
				<div className="fileContent">
					{previewImage}
					{previewCode}
					<h3><a href={this.props.details.permalink} target="_blank">{this.props.details.name ? this.props.details.name : 'No filename'}</a></h3>
					<p className="fileMeta"><span className="fileType">{this.props.details.filetype}</span> / {formatBytes(this.props.details.size)}</p>
					<p className="fileDate">{moment.unix(this.props.details.created).fromNow()}</p>
				</div>
				<button className="deleteFile" onClick={this.destroyFile.bind(this)}>delete</button>
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

export default connect(mapStateToProps, actions)(File);

