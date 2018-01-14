import React from 'react';
import Back from 'react-icons/lib/fa/backward';
import Forward from 'react-icons/lib/fa/forward';

class PageNumber extends React.Component{
	constructor(props) {
		super(props);

		this.handlePageNumberMove= this.handlePageNumberMove.bind(this);
		this.handlePageNumberGo= this.handlePageNumberGo.bind(this);
		this.handlePageNumberChange= this.handlePageNumberChange.bind(this);
	}

	handlePageNumberMove(e, direction){
		e.preventDefault();
		if (direction === 'prev') {
			if (this.props.currentPageNumber > 1) {
				this.props.handlePageChange(this.props.currentPageNumber - 1)
			}
		} else if (direction === 'next') {
			if (this.props.currentPageNumber < this.props.maxPageNumber) {
				this.props.handlePageChange(this.props.currentPageNumber + 1)
			}
		}
	}

	handlePageNumberChange(e){
		if (e.target.value < 1 || e.target.value > this.props.maxPageNumber) {
			e.target.value = this.props.maxPageNumber
		} else {
			this.props.handlePageChange(e.target.value);
		}
	}

	handlePageNumberGo(e){
		e.preventDefault();
		this.props.handlePageChange(this.props.currentPageNumber)
	}

	render() {
		return (
			<form onSubmit={this.handlePageNumberGo} className="row flex-nowrap">
				<a href="#" onClick={(e) => this.handlePageNumberMove(e, 'prev')} className="btn btn-primary d-flex align-items-center justify-content-center col m-1"><Back/></a>
				<div className="col-5 row align-items-center">
					<div className="col">
						<input type="number" value={this.props.currentPageNumber} onChange={this.handlePageNumberChange} className="form-control"/>
					</div>
					<div className="col h6">of {this.props.maxPageNumber}</div>
				</div>
				<input type="submit" value="Go" className="btn btn-primary col m-1"/>
				<a href="#" onClick={(e) => this.handlePageNumberMove(e, 'next')} className="btn btn-primary d-flex align-items-center justify-content-center col m-1"><Forward/></a>
			</form>
		)
	}
}

export default PageNumber;