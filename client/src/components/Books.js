import React from 'react'
import { gql, useQuery } from '@apollo/client';

// Queries
const GET_ALL_BOOKS = gql`query GetAllBooks {
  books {
    id
    name
    author {
      name
    }
  }
}`

function Books() {
    const { loading, error, data } = useQuery(GET_ALL_BOOKS)
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (<table className="table table-hover table-light">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
        </tr>
      </thead>
      <tbody>
        {data.books.map(({ id, name, author }) => (
          <tr className="table-light" key={id}>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{author.name}</td>
          </tr>))
        }
      </tbody>
    </table>)
}

export default Books
