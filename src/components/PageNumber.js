import React from 'react';
import Back from 'react-icons/lib/fa/backward';
import Forward from 'react-icons/lib/fa/forward';

class PageNumber extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			page: props.currentPageNumber
		};
		this.handlePageNumberMove= this.handlePageNumberMove.bind(this);
		this.handlePageNumberGo= this.handlePageNumberGo.bind(this);
		this.handlePageNumberChange= this.handlePageNumberChange.bind(this);
	}

	handlePageNumberMove(e, direction){
		e.preventDefault();
		if (direction === 'prev') {
			if (this.state.page > 1) {
				this.setState((prevState, props) => ({
					page: parseInt(prevState.page) - 1
				}),function(){afterSetState(this.state.page)});
			}
		} else if (direction === 'next') {
			if (this.state.page < this.props.maxPageNumber) {
				this.setState((prevState, props) => ({
					page: parseInt(prevState.page) + 1
				}),function(){afterSetState(this.state.page)});
			}
		}

		let afterSetState = (number) => {
			this.props.handlePageChange(number)
		}
	}

	handlePageNumberChange(e){
		if (e.target.value < 1 || e.target.value > this.props.maxPageNumber) {
			e.target.value = this.state.page
		} else {
			this.setState({
				page: parseInt(e.target.value)
			})
		}
	}

	handlePageNumberGo(e){
		e.preventDefault();
		this.props.handlePageChange(this.state.page)
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handlePageNumberGo} className="row">
					<div className="col-5 row">
						<a href="#" onClick={(e) => this.handlePageNumberMove(e, 'prev')} className="btn btn-primary"><Back/></a>
						<div className="col-5 row">
							<div className="col">
								<input type="number" value={this.state.page} onChange={this.handlePageNumberChange} className="form-control"/>
							</div>
							<div className="col">of {this.props.maxPageNumber}</div>
						</div>
						<input type="submit" value="Go" className="btn btn-primary"/>
						<a href="#" onClick={(e) => this.handlePageNumberMove(e, 'next')} className="btn btn-primary"><Forward/></a>
					</div>

				</form>
			</div>
		)
	}
}

export default PageNumber;