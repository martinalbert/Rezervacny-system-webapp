import React, {Component} from 'react';

class Header extends Component {
	render() {
		return (

			<header className="header">
				{this.props.children}
			</header>

		);
	}
}
export default Header;