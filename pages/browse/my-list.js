import React from 'react'
import Link from 'next/link';

const myList = () => {
  return (
    <div>
        <h1>Here is my list of favorite streams</h1>
        <Link href={'/'}><a>Go Back Home</a></Link>
    </div>

  )
}

export default myList;