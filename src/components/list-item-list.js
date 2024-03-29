/** @jsx jsx */
import {jsx} from '@emotion/react'

import {useListItems} from 'utils/list-items'
import {BookListUL} from './lib'
import {BookRow} from './book-row'
import {Profiler} from './profiler'

function ListItemList({filterListItems, noListItems, noFilteresListItems}) {
  const listItems = useListItems()

  const filteredListItems = listItems?.filter(filterListItems)

  if (!listItems?.length) {
    return <div css={{marginTop: '1em', fontSize: '1.2em'}}>{noListItems}</div>
  }

  if (!filteredListItems.length) {
    return (
      <div css={{marginTop: '1em', fontSize: '1.2em'}}>
        {noFilteresListItems}
      </div>
    )
  }

  return (
    <Profiler
      id="List Item List"
      metadata={{listItemCount: filteredListItems.length}}
    >
      <BookListUL>
        {filteredListItems.map(listItem => (
          <li key={listItem.id}>
            <BookRow book={listItem.book} />
          </li>
        ))}
      </BookListUL>
    </Profiler>
  )
}

export {ListItemList}
