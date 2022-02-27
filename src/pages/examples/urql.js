import Head from "next/head";
import NavBar from "../../components/NavBar";
import { gql, useQuery, useMutation } from "urql";

const MESSAGE_QUERY = gql`
	query ($text: String!) {
		message(text: $text)
	}
`;
const EXAMPLE_QUERY = gql`
	query {
		examples {
			slug
			test
		}
	}
`;

const PLACEHOLDER_MUTATION = gql`
	mutation ($num1: Int!, $num2: Int!) {
		placeholderMutation(num1: $num1, num2: $num2) {
			output
			message
		}
	}
`;

const URQLExample = () => {
	const [messageResult] = useQuery({ query: MESSAGE_QUERY, variables: { text: "Testing!" } });
	const [exampleResult] = useQuery({ query: EXAMPLE_QUERY });
	const [placeholderResult, placeholderMutation] = useMutation(PLACEHOLDER_MUTATION);

	// can be used to prevent the page from rendering until we fetch the data
	if (messageResult.fetching || exampleResult.fetching) return null;

	if (messageResult.error) {
		console.error(messageResult.error);
		return <div className="flex flex-row justify-center items-center h-screen w-screen">Error quering Message endpoint</div>;
	}
	if (exampleResult.error) {
		console.error(exampleResult.error);
		return <div className="flex flex-row justify-center items-center h-screen w-screen">Error quering Example endpoint</div>;
	}

	return (
		<>
			<Head>
				<title>Planeasy Takehome Test</title>
				<meta name="description" content="frontend for planeasy takehome test" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<NavBar />

			<main className="p-5 bg-gray-100 h-screen pt-[5.25rem]">
				<div className="flex flex-col border rounded p-4 bg-white shadow mb-4">
					<span className="text-lg font-semibold text-sky-800">Message Query Result:</span>
					<span>{messageResult?.data?.message}</span>
				</div>

				<div className="flex flex-col border rounded p-4 bg-white shadow mb-4">
					<span className="text-lg font-semibold text-sky-800">Mutation Example:</span>
					<button
						className="bg-sky-600 hover:bg-sky-500 text-white rounded px-3 py-1 mr-auto mt-2"
						onClick={async () => {
							let result = await placeholderMutation({ num1: 5, num2: 10 });
							const message = result?.data?.placeholderMutation?.message;
							const output = result?.data?.placeholderMutation?.output;

							alert(`Message: ${message}, Output: ${output}`);
						}}
					>
						Run Mutation
					</button>
				</div>

				<div className="flex flex-col border rounded p-4 bg-white shadow">
					<span className="text-lg font-semibold text-sky-800">Example Query Result:</span>
					{exampleResult?.data?.examples?.map((example) => (
						<div className="flex flex-col mt-2 border rounded p-4 bg-white hover:bg-gray-100 shadow-sm" key={example.slug}>
							<div>
								<span>{example.test}</span>
							</div>
						</div>
					))}
				</div>
			</main>
		</>
	);
};

export default URQLExample;
