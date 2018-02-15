import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const S_PER_MONTH = 30 * 24 * 3600;
const MS_PER_SECOND = 1000;

class FileSearch extends Component {

	constructor(props) {
		super(props)
		this.state = {
			searchType: 'all',
			all: true,
			images: false,
			snippets: false,
			gdocs: false,
			zips: false,
			pdfs: false,
			fileList: 0,
			minAge: 0,
		}
	}

	getFiles() {
		let token = this.props.authData.token;
		let fileString, userID;
		if (this.props.profile.user.is_admin === false) {
			userID = this.props.authData.profile.id
		} else {
			userID = this.state.searchType;
		}
		if (this.state.all !== true) {
			let fileTypes = [];
			if(this.state.images)
				fileTypes.push('images')
			if(this.state.gdocs)
				fileTypes.push('gdocs')
			if(this.state.pdfs)
				fileTypes.push('pdfs')
			if(this.state.snippets)
				fileTypes.push('snippets')
			if(this.state.zips)
				fileTypes.push('zips')
			fileString = fileTypes.join();
		} else {
			fileString = 'all'
		}

		let ts_to = undefined;
		if(this.state.minAge) {
			ts_to = ((new Date().valueOf()) / MS_PER_SECOND) - this.state.minAge;
		}

		this.props.fetchFiles(token, fileString, ts_to, userID);
	}

	handleWhoChange(e) {
		this.setState({searchType: e.target.value})
	}

	handleAgeChange(e) {
		this.setState({minAge: Number(e.target.value)});
	}

	handleClick(e) {
		let type = e.target.value
		if (type !== 'all') {
			this.setState({
				all: false,
				[type]: this.state[type] ? false : true
			})
		} else  {
			this.setState({
				images: false,
				snippets: false,
				gdocs: false,
				zips: false,
				pdfs: false,
				all: true
			})
		}
  }

	render() {
		let whoFiles = null,
				profileData = this.props.profile;
		if (typeof profileData !== 'undefined') {
			if (profileData.user.is_admin) {
				whoFiles = (
					<div className="field">
						<label>Who's files should we be looking for?</label>
						<select className="dropdown" value={this.state.searchType} onChange={this.handleWhoChange.bind(this)}>
							<option value='all'>All public team files</option>
							<option value={profileData.user.id}>Just your files</option>
						</select>
					</div>
				)
			}
		}
		let fileDisplay = null;
		if (typeof this.props.files.fileList !== 'undefined' && this.props.files.fileList.length > 0) {
			fileDisplay = <p className="fileNum">You've got {this.props.files.fileList.length} files</p>
		} else if (typeof this.props.files.fileList !== 'undefined' && this.props.files.fileList.length === 0) {
			fileDisplay = <p>No files! Search again for some more!</p>
		}
		return (
			<aside className="fileControl">
				<h2>What kind of files?</h2>
				<form>
					{whoFiles}
					<div className="fileTypeList">
						<p>What kind of files?</p>
						<div className="check-row">
							<label htmlFor="all">All</label>
							<input
								name="all"
								id="all"
								type="checkbox"
								value="all"
								checked={this.state.all}
								onChange={this.handleClick.bind(this)} />
						</div>
						<div className="check-row">
							<label htmlFor="images">Images</label>
							<input
								id="images"
								name="images"
								type="checkbox"
								value="images"
								checked={this.state.images}
								onChange={this.handleClick.bind(this)} />
						</div>
						<div className="check-row">
							<label htmlFor="pdf">PDF's</label>
							<input
								id="pdf"
								name="pdf"
								type="checkbox"
								value="pdfs"
								checked={this.state.pdfs}
								onChange={this.handleClick.bind(this)} />
						</div>
						<div className="check-row">
							<label htmlFor="gdocs">Google Docs</label>
							<input
								name="gdocs"
								id="gdocs"
								type="checkbox"
								value="gdocs"
								checked={this.state.gdocs}
								onChange={this.handleClick.bind(this)} />
						</div>
						<div className="check-row">
							<label htmlFor="snippets">Snippets</label>
							<input
								name="snippets"
								id="snippets"
								type="checkbox"
								value="snippets"
								checked={this.state.snippets}
								onChange={this.handleClick.bind(this)} />
						</div>
						<div className="check-row">
							<label htmlFor="zips">Zip Files</label>
							<input
								name="zips"
								id="zips"
								type="checkbox"
								value="zips"
								checked={this.state.zips}
								onChange={this.handleClick.bind(this)} />
						</div>
					</div>
					<div className="field">
						<label>How old should they be?</label>
						<select className="dropdown" value={this.state.ts_to} onChange={this.handleAgeChange.bind(this)}>
							<option value={ 0 }>Current files</option>
							<option value={ 1 * S_PER_MONTH }>At least one month old</option>
							<option value={ 2 * S_PER_MONTH }>At least two months old</option>
							<option value={ 6 * S_PER_MONTH }>At least six month old</option>
							<option value={ 12 * S_PER_MONTH }>At least one year old</option>
							<option value={ 24 * S_PER_MONTH }>At least two years old</option>
						</select>
					</div>
				</form>
				<button className="search" onClick={this.getFiles.bind(this)}>Get Files</button>
				{fileDisplay}
				<footer className="footerdetails">
					<p><a href="http://drewminns.com">drew minns</a> built this</p>
					<p>Help improve it <a href="https://github.com/drewminns/slack">here</a></p>
					<p><a href="https://twitter.com/share" className="twitter-share-button" data-url="http://www.slackdeletron.com" data-text="Delete unwanted files from your Slack Team" data-via="drewisthe">Tweet</a></p>
				</footer>
			</aside>
		)
	}

}

function mapStateToProps(state) {
	return {
		authData: state.auth.profile,
		profile: state.profileInfo.data,
		files: state.files
	}
}

export default connect(mapStateToProps, actions)(FileSearch);
