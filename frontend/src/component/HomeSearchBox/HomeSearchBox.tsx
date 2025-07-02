import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import './HomeSearchBox.css'

interface HomeSearchBoxProps {
  onSearch: (query: string) => void;
}

export default function HomeSearchBox({ onSearch }: HomeSearchBoxProps) {
  const [query, setQuery] = useState('')

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    // Real-time search as user types
    onSearch(value)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <Form className="d-flex w-100" onSubmit={submitHandler}>
      <InputGroup className="w-100">
        <FormControl
          type="text"
          name="q"
          id="q"
          placeholder="Search by name, description, or brand..."
          aria-label="Search products"
          aria-describedby="button-search"
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        {query && (
          <Button 
            variant="outline-secondary" 
            onClick={clearSearch}
            className="clear-btn"
            type="button"
          >
            <i className="fas fa-times"></i>
          </Button>
        )}
        <Button variant="success" type="submit" id="button-search" className="search-btn">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  )
}
