import { getAPIBySlug, getAllAPIs } from '@/lib/api-data'
import { notFound } from 'next/navigation'
import APIDetailsWrapper from './_components/api-details-wrapper'

export async function generateStaticParams() {
  const apis = getAllAPIs()
  return apis.map((api) => ({
    slug: api.slug,
  }))
}

export default function APIPage({ params }: { params: { slug: string } }) {
  const api = getAPIBySlug(params.slug)
  
  if (!api) {
    notFound()
  }
  
  return <APIDetailsWrapper initialApiData={api} />
}