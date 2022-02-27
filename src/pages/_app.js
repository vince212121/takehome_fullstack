import React from "react";
import { UrqlClientProvider } from "../urql/UrqlClient";
import "../styles/globals.css";

const CustomApp = ({ Component, pageProps }) => {
	return (
		<UrqlClientProvider>
			<Component {...pageProps} />
		</UrqlClientProvider>
	);
};

export default CustomApp;
