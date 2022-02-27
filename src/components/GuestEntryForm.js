import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { gql, useMutation } from "urql";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const CREATE_GUEST = gql`
	mutation ($username: String!, $message: String!) {
		createGuest(guestData: { username: $username, message: $message }) {
			guest {
				slug
				username
				message
			}
			message
		}
	}
`;

const GuestEntryForm = () => {
	const router = useRouter();
    
	// Used to show a spinning icon and the message when creating a booking
	const [pending, setPending] = useState(false);
	const [message, setMessage] = useState("");

	// Used for errors
	const [error, setError] = useState("");

	// Schema validation
	const CreateUserSchema = Yup.object().shape({
		username: Yup.string().min(1, "Should be at least 1 character long").max(50, "Should not exceed 50 characters").required("Required"),
		message: Yup.string().min(1, "Should contain at least 1 letter").max(255, "Should not exceed 255 characters").required("Required"),
	});

	// Validation for message
	const messageValidation = (value) => {
		let error;
		if (value.length > 255) {
			error = "Should not exceed 255 letters";
		}
		return error;
	};

	// Validation for user
	const userValidation = (value) => {
		let error;
		if (value.length > 50) {
			error = "Should not exceed 50 letters";
		}
		return error;
	};

	// Mutation
	const [createGuestResult, createGuest] = useMutation(CREATE_GUEST);

	return (
		<>
			<Formik
				initialValues={{ username: "", message: "" }}
				validationSchema={CreateUserSchema}
				onSubmit={async (values, actions) => {
					// alert(JSON.stringify(values, null, 2));
					// actions.setSubmitting(false); // only needs to be provided if onSubmit isn't async

					setPending(true);
					await createGuest({ username: values.username, message: values.message })
						.then((result) => {
							setMessage(result?.data?.createGuest?.message);
						})
						.catch((error) => {
							console.error(error);
							setError("An Error occured . . . Redirecting to home.");
						});

					// let result = await createGuest({ username: values.username, message: values.message }).then(() => setPending(false));

					// const message = result?.data?.createGuest?.message;

					// Replace this with a message shown under the submit button
					// Add a delay before going back to the main
					// alert(`Message: ${message}`);

					// go back to home
					setTimeout(() => {
						setPending(false);
						router.push("/");
					}, 3000);
				}}
			>
				{/* {(props) => (
					<form onSubmit={props.handleSubmit} className="p-4 border bg-white rounded-md flex flex-col w-1/2 shadow mx-auto">
						<label htmlFor="username">Username</label>
						<Field id="username" name="username" type="text" placeholder="Username" className="border-gray-300 rounded focus:ring-sky-200 focus:border-gray-400" />
						<label htmlFor="message">Message</label>
						<Field id="message" name="message" type="text" placeholder="Message" className="border-gray-300 rounded focus:ring-sky-200 focus:border-gray-400" />

						<button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white rounded-md px-3 py-2 mr-auto mt-4">
							Submit
						</button>
					</form>
				)} */}
				{({ errors, touched }) => (
					<Form className="p-4 border bg-white rounded-md flex flex-col sm:w-1/2 w-80 shadow mx-auto">
						<label htmlFor="username" className="text-base font-semibold">
							Username
						</label>
						<Field validate={userValidation} id="username" name="username" type="text" placeholder="Username" />
						{(errors.username && touched.username) || userValidation ? (
							<div>
								<p className="text-red-600 font-semibold">{errors.username}</p>
							</div>
						) : null}

						<label htmlFor="message" className="text-base font-semibold pt-4">
							Message
						</label>
						<Field validate={messageValidation} id="username" name="message" type="text" placeholder="Message" />
						{(errors.message && touched.message) || messageValidation ? (
							<div>
								<p className="text-red-600 font-semibold">{errors.message}</p>
							</div>
						) : null}
						<button
							disabled={(errors.message && touched.message) || (errors.username && touched.username) || pending}
							type="submit"
							className="bg-sky-600 hover:bg-sky-500 text-white rounded-md px-3 py-2 mr-auto mt-4"
						>
							{pending ? <FontAwesomeIcon icon={faSpinner} spin className="w-4 h-4" /> : "Submit"}
						</button>
						{message != "" ? (
							<div>
								<p className="text-base font-semibold">{message}. Redirecting to home . . .</p>
							</div>
						) : null}
						{error != "" ? (
							<div>
								<p className="text-base font-semibold text-red-600">{error}</p>
							</div>
						) : null}
					</Form>
				)}
			</Formik>
		</>
	);
};

export default GuestEntryForm;
