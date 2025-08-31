import APIDetailsClient from './api-details-client'
import type { APITemplate } from '@/types/api'

interface APIDetailsWrapperProps {
  initialApiData: APITemplate | null
}

export default function APIDetailsWrapper({ initialApiData }: APIDetailsWrapperProps) {
  return <APIDetailsClient api={initialApiData} />
}