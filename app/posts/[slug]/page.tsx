import Post from '@/components/post'

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  return (
    <div className='flex justify-center'>
      <Post slug={slug} />
    </div>
  )
}
