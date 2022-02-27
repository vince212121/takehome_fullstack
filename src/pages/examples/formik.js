import Head from "next/head";
import NavBar from "../../components/NavBar";
import { Formik, Field } from "formik";

const FormikExample = () => {
	return (
		<>
			<Head>
				<title>Planeasy Takehome Test</title>
				<meta name="description" content="frontend for planeasy takehome test" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<NavBar />

			<main className="p-5 bg-gray-100 h-screen pt-[5.25rem]">
				<Formik
					initialValues={{ name: "" }}
					onSubmit={(values, actions) => {
						alert(JSON.stringify(values, null, 2));
						actions.setSubmitting(false); // only needs to be provided if onSubmit isn't async
					}}
				>
					{(props) => (
						<form onSubmit={props.handleSubmit} className="p-4 border bg-white rounded-md flex flex-col w-1/2 shadow mx-auto">
							<label htmlFor="name">Name</label>
							<Field id="name" name="name" type="text" placeholder="Name" className="border-gray-300 rounded focus:ring-sky-200 focus:border-gray-400" />
							<button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white rounded-md px-3 py-2 mr-auto mt-4">
								Submit
							</button>
						</form>
					)}
				</Formik>
			</main>
		</>
	);
};

export default FormikExample;
