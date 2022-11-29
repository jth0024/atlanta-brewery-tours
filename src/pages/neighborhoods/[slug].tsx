import { useRouter } from 'next/router'
import { Neighborhood } from '../../views'

const NeighborhoodPage = () => {
  const { query } = useRouter()
  return <Neighborhood slug={`${query.slug}`} />
}

export default NeighborhoodPage
