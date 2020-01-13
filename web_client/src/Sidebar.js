import React, {Component} from 'react';

class Sidebar extends Component {
	render() {
		return (

			<aside className={this.props.page}>
				{this.props.children}
			</aside>

		);
	}
}
export default Sidebar;