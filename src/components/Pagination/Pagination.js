import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { GU, RADIUS } from '../../style'
import { noop } from '../../utils'
import { useTheme } from '../../theme'
import { PaginationItem } from './PaginationItem'
import { PaginationSeparator } from './PaginationSeparator'

function paginationItems(pages, selected) {
  const all = [...Array(pages)].map((_, i) => i)

  if (all.length < 6) {
    return all
  }

  const first = 0
  const last = all.length - 1
  const prev = Math.min(all.length, Math.max(0, selected - 1))
  const next = Math.min(all.length, Math.max(0, selected + 1))

  const items = []

  // Selected item + previous + next
  items.push(...all.slice(prev, next + 1))

  // Display three items, even if the first / last one is selected
  if (selected === last) {
    items.unshift(last - 2)
  }
  if (selected === first) {
    items.push(first + 2)
  }

  // Ellipsises
  if (prev > first + 1) {
    items.unshift(-1)
  }
  if (next < last - 1) {
    items.push(-1)
  }

  // Always display the first & last items
  if (prev >= first + 1) {
    items.unshift(all[0])
  }
  if (next <= last - 1) {
    items.push(all[all.length - 1])
  }

  return items
}

const Pagination = React.memo(function Pagination({
  pages,
  selected,
  onChange,
}) {
  const items = paginationItems(pages, selected)
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        justify-content: center;
        & > div + div {
          margin-left: ${1 * GU}px;
        }
      `}
    >
      {items.map((pageIndex, i) =>
        pageIndex === -1 ? (
          <PaginationSeparator key={`separator-${i}`} />
        ) : (
          <PaginationItem
            key={pageIndex}
            index={pageIndex}
            selected={selected === pageIndex}
            onChange={onChange}
          />
        )
      )}
    </div>
  )
})

Pagination.propTypes = {
  onChange: PropTypes.func,
  pages: PropTypes.number,
  selected: PropTypes.number,
}

Pagination.defaultProps = {
  onChange: noop,
  pages: 0,
  selected: 0,
}

export { Pagination }
