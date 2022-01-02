import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'

const ADD_BOOK = gql`mutation AddBook ($title: String!, $authorId: Int!) {
    addBook (title: $title, authorId: $authorId) {
        id
        title
    }
}`

const GET_ALL_AUTHORS = gql`query GetAllAuthors {
    allAuthors {
        id
        name
    }
}`

const ADD_AUTHOR = gql`mutation AddAuthor($name: String!) {
    addAuthor(name: $name) {
        id
        name
    }
}`

function AddBook({ reload }) {
    const authorQuery = useQuery(GET_ALL_AUTHORS)
    const [addBook, { data, loading, error }] = useMutation(ADD_BOOK)
    const [addAuthor, addAuthorQuery] = useMutation(ADD_AUTHOR)

    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [authorId, setAuthorId] = useState(1)

    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;
    // if (authorQuery.loading) return 'Loading...';
    // if (data) console.log(data)
    // if (addAuthorQuery.data) console.log(addAuthorQuery.data)

    return (
        <>
            <form className="form-group m-4" onSubmit={e => {
                e.preventDefault();
                console.log({ title, authorId })
                addBook({ variables: { title, authorId } }).then(results => console.log(results))
                reload()
                setTitle('')
                // setAuthorId(1)

            }}>
                <label className="form-label">ADD A BOOK</label>
                <div className="input-group">
                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" placeholder="Enter book's title" value={title} />
                    <select className="form-select" id="authorId" onChange={(e) => { setAuthorId(+e.target.value) }}>
                        {authorQuery.data?.allAuthors.map(({ id, name }) => (<option key={id} value={id}>{name}</option>))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
            <form className="form-group m-4" onSubmit={e => {
                e.preventDefault();
                addAuthor({ variables: { name: author } })
                authorQuery.refetch({ variables: { name: author } })
                setAuthor('')
            }}>
                <label className="form-label">ADD AN AUTHOR</label>
                <div className="input-group">
                    <input onChange={(e) => setAuthor(e.target.value)} type="text" className="form-control" placeholder="Enter author's name" value={author} />
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </>

    )
}

export default AddBook
