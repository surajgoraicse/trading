import { ChartRadialShape } from '@/components/charts/radialChart'
import { ChartRadialText } from '@/components/charts/radialChart2'
import { ChartRadialStacked } from '@/components/charts/semiCircleProgress'

const Chart = () => {
    return (
        <div className='mt-5 px-2 space-y-2'>
            <ChartRadialText />
            <ChartRadialStacked />
            <ChartRadialShape />
        </div>
    )
}

export default Chart