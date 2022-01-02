import React, { useState } from 'react'
import AddBook from "./components/AddBook";
import { gql, useQuery } from '@apollo/client';

const FIND_BOOK = gql`query FindBookByTitle($title: String!) {
  findBookByTitle(title: $title) {
    id
    title
    author {
      name
    }
  }
}`
function App() {
  const [search, setSearch] = useState('')
  const searchQuery = useQuery(FIND_BOOK, { variables: { title: search } })
  if (searchQuery.data) console.log(searchQuery.data)

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">GraphQL Demo 🚀</a>
          <form class="d-flex" onSubmit={
            (e) => {
              e.preventDefault()
              setSearch('')
            }
          }>
            <input onChange={(e) => setSearch(e.target.value)} class="form-control me-sm-2" type="text" placeholder="Search" value={search} />
            {/* <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button> */}
          </form>
        </div>
      </nav>
      <table className="table table-hover table-light">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
          </tr>
        </thead>
        <tbody>
          {searchQuery.data?.findBookByTitle.map(({ id, title, author }) => (
            <tr className="table-light" key={id}>
              <th scope="row">{id}</th>
              <td>{title}</td>
              <td>{author.name}</td>
            </tr>))
          }
        </tbody>
      </table>
      <AddBook reload={searchQuery.refetch} />
    </div>
  );
}

export default App;
