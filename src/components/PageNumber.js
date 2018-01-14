import React from 'react';
import Back from 'react-icons/lib/fa/backward';
import Forward from 'react-icons/lib/fa/forward';

class PageNumber extends React.Component{
	constructor(props) {
		super(props);

		this.handleInputChange= this.handleInputChange.bind(this);
		this.handlePageNumberMove= this.handlePageNumberMove.bind(this);
		this.handlePageNumberGo= this.handlePageNumberGo.bind(this);
	}

	handlePageNumberMove(e, direction){
		e.preventDefault();
		if (direction === 'prev') {
			if (this.props.currentPageNumber > 1) {
				this.props.handlePageChange(this.props.currentPageNumber - 1);
				this.props.handleInputPageChange(this.props.currentPageNumber - 1);
			}
		} else if (direction === 'next') {
			if (this.props.currentPageNumber < this.props.maxPageNumber) {
				this.props.handlePageChange(this.props.currentPageNumber + 1);
				this.props.handleInputPageChange(this.props.currentPageNumber + 1);
			}
		}
	}

	handlePageNumberGo(e){
		e.preventDefault();
		this.props.handlePageChange(this.props.currentInputPage);
	}

	handleInputChange(e) {
		if (e.target.value < 1) {
			this.props.handleInputPageChange(1);
		} else if (e.target.value > this.props.maxPageNumber) {
			this.props.handleInputPageChange(this.props.maxPageNumber);
		} else {
			this.props.handleInputPageChange(e.target.value);
		}
	}

	render() {
		return (
			<form onSubmit={this.handlePageNumberGo} className="row flex-nowrap">
				<a href="#" onClick={(e) => this.handlePageNumberMove(e, 'prev')} className="btn btn-primary d-flex align-items-center justify-content-center col m-1"><Back/></a>
				<div className="col-6 row align-items-center">
					<div className="col">
						<input type="number" value={this.props.currentInputPage} onChange={this.handleInputChange} className="form-control"/>
					</div>
					<div className="d-inline-block h6 mr-2 text-lowercase">of {this.props.maxPageNumber}</div>
				</div>
					{
					this.props.currentInputPage === this.props.currentPageNumber ? (
							<button type="submit" className="btn btn-primary col m-1" disabled>Go</button>
					) : (
							<button type="submit" className="btn btn-primary col m-1" onClick={this.handlePageNumberGo}>Go</button>
					)}
				<a href="#" onClick={(e) => this.handlePageNumberMove(e, 'next')} className="btn btn-primary d-flex align-items-center justify-content-center col m-1"><Forward/></a>
			</form>
		)
	}
}

export default PageNumber;