import NewPostForm from '@/components/NewPostForm'
import React from 'react'

const page = () => {
  return (
    <section className='pb-24 pt-32 md:pt-40 container mx-auto md:max-w-[50vw] px-10 md:px-0'>
        <div className=''>
            <h1 className='text-2xl font-semibold'>New Post</h1>
        </div>
        <NewPostForm />
    </section>
  )
}

export default page