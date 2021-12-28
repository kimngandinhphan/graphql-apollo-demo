import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'

const ADD_BOOK = gql`mutation AddBook ($name: String!, $authorId: Int!) {
    addBook (name: $name, authorId: $authorId) {
        id
        name
    }
}`

const GET_ALL_AUTHORS = gql`query GetAllAuthors {
    authors {
        id
        name
    }
}`

function AddBook() {
    const authorQuery = useQuery(GET_ALL_AUTHORS)
    const [addBook, { data, loading, error }] = useMutation(ADD_BOOK)
    const [name, setName] = useState('')
    const [authorId, setAuthorId] = useState(1)

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    if (data) console.log(data)

    return (
        <>
            <form className="form-group m-4" onSubmit={e => {
                e.preventDefault();

                addBook({ variables: { name, authorId } });
                setName('')
                setAuthorId(1)

            }}>
                <label className="form-label">ADD A BOOK</label>
                <div className="input-group">
                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Enter book's title" value={name} />
                    <select className="form-select" id="authorId" onChange={(e) => setAuthorId(+e.target.value)} value={authorId}>
                        {authorQuery?.data.authors?.map(({ id, name }) => (<option key={id} value={id}>{name}</option>))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-sm mt-2">Submit</button>
            </form>
        </>

    )
}

export default AddBook
