import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import File from './file';

var masonryOptions = {
    transitionDuration: '0.2s'
};

class FileDisplay extends Component {

	constructor(props) {
		super(props)
	}

	displayFiles() {
		return (
			<div>
			<Masonry
	      className={'my-gallery-class'} // default ''
	      options={masonryOptions} // default {}
	      disableImagesLoaded={false} // default false
      >
				{this.props.fileGroup.fileList.map((obj, i) => {
					return (
						<article key={i} className="fileCard">
							<File details={obj} />
						</article>
					)
				})}
			</Masonry>
			</div>
		)
	}

	render() {
		let dataDisplay;
		if (typeof this.props.fileGroup.fileList !== 'undefined' && this.props.fileGroup.fileList.length > 0) {
			dataDisplay = this.displayFiles();
		} else if (typeof this.props.fileGroup.fileList !== 'undefined' && this.props.fileGroup.fileList.length === 0) {
			dataDisplay = (
				<div className="noFiles">
					<div className="noFiles-display">
						<img src='images/fileintro.svg' />
						<h2>High Five!</h2>
						<h3>Looks like there's no files!</h3>
						<p>Slack has nothing for you! Try a new search with a different file type to see if there's anything else!</p>
					</div>
				</div>
			)
		} else {
			dataDisplay = (
				<div className="noFiles">
					<div className="noFiles-display">
						<img src='images/filehappy.svg' />
						<h2>Welcome to the Slack Deletron!</h2>
						<h3>Let's get started!</h3>
						<ol>
							<li>Use the form to select which file types to search for</li>
							<li>Click the 'Get Files' button to search</li>
							<li>Start deleting some files!</li>
						</ol>
					</div>
				</div>
			)
		}
		return (
			<section className="fileList">
				{dataDisplay}
			</section>
		)
	}

}

function mapStateToProps(state) {
	return {
		authData: state.auth.profile,
		fileGroup: state.files
	}
}

export default connect(mapStateToProps)(FileDisplay);