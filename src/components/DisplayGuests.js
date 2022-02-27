import { gql, useQuery } from "urql";
import Link from "next/link";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ALL_GUESTS_QUERY = gql`
	query {
		allGuests {
			slug
			username
			message
			createdAt
		}
	}
`;

const GUESTS_QUERY = gql`
	query ($first: Int!, $after: String!) {
		guests(first: $first, after: $after) {
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
			edges {
				cursor
				node {
					id
					slug
					username
					message
					createdAt
				}
			}
		}
	}
`;

// Need to fetch results again after deleting

const DisplayGuests = () => {
	// const [allGuestsResult] = useQuery({ query: ALL_GUESTS_QUERY, requestPolicy: "cache-and-network" });

	// if (allGuestsResult.fetching) return null;

	// if (allGuestsResult.error) {
	// 	console.error(allGuestsResult.error);
	// 	return <div className="flex flex-row justify-center items-center h-screen w-screen">Error querying all guests endpoint</div>;
	// }

	// return (
	// 	<>
	// 		{allGuestsResult?.data?.allGuests?.map((guest) => (
	// 			<Link href="/guestbook/[slug]" as={`/guestbook/${guest.slug}`} key={guest.slug} passHref>
	// 				<div className="flex flex-col mt-2 border rounded p-4 bg-white hover:bg-gray-100 shadow-sm cursor-pointer">
	// 					<span>
	// 						{guest.username} - {guest.message}
	// 					</span>
	// 				</div>
	// 			</Link>
	// 		))}
	// 	</>
	// );

	const [guestsPerPage] = useState(4);
	const [currentPage, setCurrentPage] = useState(1);
	// const [guestsResult] = useQuery({ query: GUESTS_QUERY, variables: { first: guestsPerPage, after: "", before: "" }, requestPolicy: "cache-and-network" });

	// const [currentCursor, setCurrentCursor] = useState("");
	// const [previousCursor, setPreviousCursor] = useState("");
	const [startCursor, setStartCursor] = useState("");
	// const [lastCursor, setLastCursor] = useState("");
	// const [guestsResult, reexecuteQuery] = useQuery({ query: GUESTS_QUERY, variables: { first: guestsPerPage, after: currentCursor, before: previousCursor}, requestPolicy: "cache-and-network" });
	const [guestsResult, reexecuteQuery] = useQuery({
		query: GUESTS_QUERY,
		variables: { first: guestsPerPage, after: startCursor},
		requestPolicy: "cache-and-network",
	});

	if (guestsResult.fetching) return null;

	if (guestsResult.error) {
		console.error(guestsResult.error);
		return <div className="flex flex-row justify-center items-center h-screen w-screen">Error querying all guests endpoint</div>;
	} else {
		console.log(guestsResult);
	}

	const paginateUp = () => {
		// // if (guestsResult?.data?.guests?.pageInfo?.hasNextPage) {
		// // }
		setCurrentPage(currentPage + 1);
		// // setPreviousCursor(currentCursor);
		// setCurrentCursor(guestsResult?.data?.guests?.pageInfo?.endCursor);
		// reexecuteQuery();
		setStartCursor(guestsResult?.data?.guests?.pageInfo?.endCursor);
		// setLastCursor("");
		reexecuteQuery();
	};
	const paginateDown = () => {
		setCurrentPage(1);
		// setLastCursor(guestsResult?.data?.guests?.pageInfo?.startCursor);
		setStartCursor("");
		reexecuteQuery();
	};

	return (
		<>
			{guestsResult?.data?.guests?.edges?.map((guest) => (
				<Link href="/guestbook/[slug]" as={`/guestbook/${guest.node.slug}`} key={guest.node.slug} passHref>
					<div className="flex flex-col mt-2 border rounded p-4 bg-white hover:bg-gray-100 shadow-sm cursor-pointer">
						<span>
							{guest.node.username} - {guest.node.message}
						</span>
					</div>
				</Link>
			))}

			<div className="flex flex-col justify-center items-center mt-4">
				<div className="flex">
					<button
						className={`w-8 h-8 p-2 ${currentPage === 1 ? "hidden" : ""} ${guestsResult?.data?.guests?.pageInfo?.hasPreviousPage ? "" : ""}`}
						onClick={paginateDown}
					>
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>
					<p className="text-base border-2 border-sky-500 py-1 px-3 rounded-xl">{currentPage}</p>
					<button
						className={`w-8 h-8 p-2 ${guestsResult?.data?.guests?.pageInfo?.hasNextPage ? "" : "text-gray-600"}`}
						disabled={!guestsResult?.data?.guests?.pageInfo?.hasNextPage ? true : false}
						onClick={paginateUp}
					>
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				</div>
			</div>
		</>
	);
};

export default DisplayGuests;
