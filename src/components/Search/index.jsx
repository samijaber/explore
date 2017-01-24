import React from 'react';

export const Search = ({handleClick}) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleClick(input.value);
          input.value = '';
        }}
      >
      <input
        ref={node => input = node}
      />
      <button type="submit">
        Show Collection
      </button>
      </form>
    </div>
  );
};
