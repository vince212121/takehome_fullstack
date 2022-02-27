import { gql, useQuery, useMutation } from "urql";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const GUEST_BY_SLUG_QUERY = gql`
	query ($slug: String!) {
		guestBySlug(slug: $slug) {
			id
			slug
			username
			message
			createdAt
		}
	}
`;

const DELETE_GUEST_MUTATION = gql`
	mutation ($slug: String!) {
		deleteGuest(slug: $slug) {
			message
		}
	}
`;

const DisplayGuestBySlug = ({ slug }) => {
	const router = useRouter();

	// Used to show a spinning icon and the message when deleting a booking
	const [pending, setPending] = useState(false);
	const [message, setMessage] = useState("");

	// Used for errors
	const [error, setError] = useState("");

	// Queries and mutations
	const [guestBySlugResult] = useQuery({ query: GUEST_BY_SLUG_QUERY, variables: { slug: slug } });
	const [deleteGuestResult, deleteGuest] = useMutation(DELETE_GUEST_MUTATION);

	if (guestBySlugResult.fetching) return null;

	// let result = await createGuest({ username: values.username, message: values.message });
	// const message = result?.data?.createGuest?.message;

	if (guestBySlugResult.error) {
		console.error(guestBySlugResult.error);
		return <div className="flex flex-row justify-center items-center h-screen w-screen">Error querying guest by slug endpoint</div>;
	}

	// deletes a guest and pushes back to home after a delay
	const onDelete = async () => {
		setPending(true);
		// alert(result?.data?.deleteGuest?.message)
		await deleteGuest({ slug: slug })
			.then((result) => {
				setMessage(result?.data?.deleteGuest?.message);
			})
			.catch((error) => {
				console.error(error);
				setError("An Error occured . . . Redirecting to home.");
			});

		// redirect back home after 3 seconds to allow the user to read the message
		setTimeout(() => {
			setPending(false);
			router.push("/");
		}, 3000);
	};

	return (
		<div className="flex flex-col border rounded p-4 bg-white shadow-sm">
			<div className="flex flex-row">
				<label className="pr-2 font-semibold">ID:</label>
				<p className="text-base">{guestBySlugResult?.data?.guestBySlug?.id}</p>
			</div>
			<div className="flex flex-row">
				<label className="pr-2 font-semibold">Slug UUID:</label>
				<p className="text-base">{guestBySlugResult?.data?.guestBySlug?.slug}</p>
			</div>
			<div className="flex flex-row">
				<label className="pr-2 font-semibold">Username:</label>
				<p className="text-base">{guestBySlugResult?.data?.guestBySlug?.username}</p>
			</div>
			<div className="flex flex-row">
				<label className="pr-2 font-semibold">Message:</label>
				<p className="text-base">{guestBySlugResult?.data?.guestBySlug?.message}</p>
			</div>
			<div className="flex flex-row">
				<label className="pr-2 font-semibold">Created On:</label>
				<p className="text-base">{guestBySlugResult?.data?.guestBySlug?.createdAt}</p>
			</div>
			<div className="flex flex-row">
				{/* mr-auto */}
				<Link href="/">
					<a className="bg-sky-600 hover:bg-sky-500 mr-4 text-white rounded-md px-3 py-2 mt-4">Back</a>
				</Link>
				<button onClick={onDelete} disabled={pending} className="bg-red-600 hover:bg-red-500 text-white rounded-md px-3 py-2 mt-4">
					{pending ? <FontAwesomeIcon icon={faSpinner} spin className="w-4 h-4" /> : "Delete"}
				</button>
			</div>
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
		</div>
	);
};

export default DisplayGuestBySlug;
