import React, { createContext, useContext, useState } from "react";
import { Provider, createClient } from "urql";

const CreateUrqlClient = () =>
	createClient({
		url: "http://localhost:8000/graphql",
	});

const UrqlClientContext = createContext({
	resetClient: undefined,
});

const UrqlClientProvider = ({ children }) => {
	const [urqlClient, setUrqlClient] = useState(CreateUrqlClient());

	return (
		<UrqlClientContext.Provider value={{ resetClient: () => setUrqlClient(CreateUrqlClient()) }}>
			<Provider value={urqlClient}>{children}</Provider>
		</UrqlClientContext.Provider>
	);
};

const useUrqlClient = () => useContext(UrqlClientContext);

export { UrqlClientProvider, useUrqlClient };
