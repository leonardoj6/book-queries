import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK_MUTATION, GET_BOOKS } from "../queries/queries";

function AddBook(props) {
	const { loading, error, data: authorsData } = useQuery(GET_AUTHORS);
	const [bookName, setBookName] = useState("");
	const [genre, setGenre] = useState("");
	const [authorId, setAuthorId] = useState("");
	const [addBook, { data: addedBook, loading: mutationLoading }] = useMutation(
		ADD_BOOK_MUTATION,
		{
			refetchQueries: [{ query: GET_BOOKS }],
		}
	);
	// const { refetch } = useQuery(GET_BOOKS);

	function submitForm(e) {
		e.preventDefault();
		if (bookName && genre && authorId) {
			addBook({
				variables: { name: bookName, genre, authorId },
			}).then((res) => {
				// refetch();
				console.log(res);
				console.log(addedBook);
			});
		}
	}

	function displayAuthors() {
		if (loading) return <option disabled>Loading authors</option>;
		else
			return authorsData.authors.map((author) => (
				<option value={author.id} key={author.id}>
					{author.name}
				</option>
			));
	}

	return (
		<form onSubmit={submitForm} className="add-book">
			<h4>Add a new book</h4>
			<div className="field">
				<label>Book name:</label>
				<input type="text" onChange={(e) => setBookName(e.target.value)} />
			</div>

			<div className="field">
				<label>Genre:</label>
				<input type="text" onChange={(e) => setGenre(e.target.value)} />
			</div>

			<div className="field">
				<label>Author:</label>
				<select onChange={(e) => setAuthorId(e.target.value)}>
					<option>Select author</option>
					{displayAuthors()}
				</select>
			</div>

			<button type="submit">+</button>
			{mutationLoading && <div>adding new book...</div>}
		</form>
	);
}

export default AddBook;
