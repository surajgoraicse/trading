import BoosterProgressCard from '@/components/card/booster'
import HeroCard from '@/components/card/heroCard'
import CardSelector from '@/components/list/analytics'

const page = () => {
  return (

    <div className='px-5 flex flex-col items-center  '>
      <HeroCard />
      <CardSelector />
      <BoosterProgressCard />

    </div>

  )
}

export default page