import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ setSignedIn, signedIn, children }): JSX.Element {
	return (
		<>
			<Navbar setSignedIn={setSignedIn} signedIn={signedIn} />
			<div>{children}</div>
			<Footer />
		</>
	);
}
