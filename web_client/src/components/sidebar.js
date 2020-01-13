import React, {Component} from 'react';

class Sidebar extends Component {
	render() {
		return (

			<aside className="sidebar">
				{this.props.children}
			</aside>

		);
	}
}
export default Sidebar;