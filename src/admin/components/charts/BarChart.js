import React from 'react'
import ChartistGraph from 'react-chartist'
import 'chartist/dist/chartist.css'

export default class BarChart extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            type: 'Bar',
            data: {
                labels: ['Week 13', 'Week 14', 'Week 15', 'Week 16', 'Week 17', 'Week 18'],
                series: [
                    [3, 2, 1, 5, 4, 4]
                ]
            }, 
            options: {
                high: 7,
                low: 0,
                axisX: {
                    labelInterpolationFnc: (value, index) => index % 2 === 0 ? value : null
                }
            }
        }
    }
    render = () => {
        let { type, data, options } = this.state
        return (<>
            <ChartistGraph data={data} options={options} type={type} />
        </>)
    }
}