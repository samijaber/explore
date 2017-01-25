import React from 'react'

export const Search = ({handleClick}) => {
  let input

  return (
    <div>
      Use a keyword to start exploring Unsplash!
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
