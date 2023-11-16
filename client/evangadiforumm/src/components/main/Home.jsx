import React from 'react';
import About from './About';
import "./Home.css";
import RegisterAndLogin from './RegisterAndLogin';
function Home() {
  return (
		<div>
			<div className="mainHomeWrapper">
				<div className="homeComponents">
					<RegisterAndLogin />
					<About />
				</div>
			</div>
		</div>
	);
}

export default Home;
