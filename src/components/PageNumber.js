import React from 'react';

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
				<form onSubmit={this.handlePageNumberGo}>
					<a href="#" onClick={(e) => this.handlePageNumberMove(e, 'prev')}>{'<<'}</a>
					<span>
						<input type="number" value={this.state.page} onChange={this.handlePageNumberChange}/>
						<span>of {this.props.maxPageNumber}</span>
					</span>
					<input type="submit" value="Go"/>
					<a href="#" onClick={(e) => this.handlePageNumberMove(e, 'next')}>{'>>'}</a>
				</form>
			</div>
		)
	}
}

export default PageNumber;