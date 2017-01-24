import React from 'react'

export const Search = ({searchFor, handleClick}) => {
  let input

  let description;
  switch (searchFor) {
    case 'initialImage':
      description = "Use a keyword to start exploring Unsplash!"
      break;
    default:
      description = "Insert a search term."
      break;
  }

  return (
    <div>
      {description}
      <form
        onSubmit={e => {
          e.preventDefault()
          handleClick(input.value)
          input.value = ''
        }}
      >
      <input
        ref={node => input = node}
      />
      <button type="submit">
        Search
      </button>
      </form>
    </div>
  )
}
