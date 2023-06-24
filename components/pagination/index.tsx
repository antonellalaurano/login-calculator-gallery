import * as React from 'react';

export const Pagination: React.FC<{ page: number, setPage: (value:number) => void }> = ({ page, setPage }) => {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          href="#"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Previous
        </a>
        <a
          href="#"
          onClick={() => setPage(page + 1)}
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Next
        </a>
      </div>
    </nav>
  )
}
