import Post from '@/components/post'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params

  return (
    <div className='flex justify-center'>
      <Post slug={slug} />
    </div>
  )
}
