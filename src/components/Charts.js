import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js'
import Map from './Map'
import { showDataOnMap, sortData } from '../util';

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement)

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

function Charts() {

    const [data, setData] = useState({})
    const [casesType, setCasesType] = useState('cases');
    const [allData, setAllData] = useState({})

    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('worldwide')
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
    const [mapZoom, setMapZoom] = useState(3)
    const [mapCountries, setMapCountries] = useState([])
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        const getData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then(response => response.json())
                .then(data => {
                    const countries = data.map(item => (
                        {
                            name: item.country,
                            value: item.countryInfo.iso2
                        }
                    ))
                    const sortedData = sortData(data)
                    setTableData(sortedData)
                    setMapCountries(data)
                    setCountries(countries)
                })
        }
        getData()
    }, [])

    const handleChange = (e) => {
        setCountry(e.target.value)
        console.log(e.target.value)
        onCountryChange()
    }
    console.log(country)

    const onCountryChange = async e => {
        console.log(e.target.value)
        setCountry(e.target.value)
        const url = e.target.value === 'worldwide' ?
            'https://disease.sh/v3/covid-19/all' :
            `https://disease.sh/v3/covid-19/countries/${e.target.value}`
        
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAllData(data)
                //setCountry(e.target.value)
        console.log(e.target.value)
                setMapCenter([data.countryInfo.lat, data.countryInfo.long])
                setMapZoom(4)
                //setAllData(data)
            })
        }
console.log(mapCenter)
    const buildChartData = (data, caseType) => {
        const chartData = []
        let lastPoint;
        for (let date in data.cases) {
            if (lastPoint) {
                const newPoint = {
                    x: date,
                    y: data[caseType][date] - lastPoint
                }
                chartData.push(newPoint)
            }
            lastPoint = data[caseType][date]
        }
        return chartData
    }

    useEffect(() => {
        const fetchData = async () => {
            fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const chartData = buildChartData(data, casesType)
                    setData(chartData)
                })
        }
        fetchData()

    }, [casesType])

    useEffect(() => {
        const getData = async () => {
            fetch('https://disease.sh/v3/covid-19/all')
                .then(response => response.json())
                .then(data => {
                    setAllData(data)
                })
        }
        getData()

    }, [])




    return (

        <div className='col-sm-10 body' style={{ marginTop: '5%' }}>
        <div className='d-flex justify-content-center'>
            <div className="mb-3 menu mx-5">
                <select className="form-select" aria-label="Default select example" value={country} onChange={onCountryChange}>
                    <option value='worldwide'>WorldWide</option>
                    {countries.map(option => <option value={option.value}>{option.name}</option>)}
                </select>
            </div>
            </div>
            <div className='row p-2'>
                <div className="col-md-3 mx-5">
                    <div className="card my-3 data" >
                        <div className="card-body mt-2">
                            <h5 className="card-title mx-2 my-4" style={{ textAlign: 'center' }}>Cases: {numeral(allData.cases).format("0.0a")}</h5>
                            <h6 className="card-subtitle mb-2 text-muted mx-4" style={{ textAlign: 'center' }}>Covid Tests: {numeral(allData.tests).format("0.0a")}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mx-5">
                    <div className="card my-3 data" >
                        <div className="card-body mt-2">
                            <h5 className="card-title mx-2 my-4" style={{ textAlign: 'center' }}>Recovered: {numeral(allData.recovered).format("0.0a")}</h5>
                            <h6 className="card-subtitle mb-2 text-muted mx-4" style={{ textAlign: 'center' }}>Today Recovered: {numeral(allData.todayRecovered).format('0.0a')}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mx-5">
                    <div className="card my-3 data" >
                        <div className="card-body mt-2">
                            <h5 className="card-title mx-2 my-4" style={{ textAlign: 'center' }}>Death: {allData.deaths}</h5>
                            <h6 className="card-subtitle mb-2 text-muted mx-4" style={{ textAlign: 'center' }}>Critical Cases: {numeral(allData.critical).format('0.0a')}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className='mx-5 my-5'>All Covid Cases</h3>
            {data?.length > 0 && (

                <div className="card my-3 p-5 mx-5" style={{ width: '70rem', height: '30rem' }}>
                    <div className='d-flex justify-content-evenly' style={{ width: '30rem', height: '30rem' }}>
                        <div onChange={(e) => setCasesType(e.target.value)}>
                            <input type="radio" value="cases" name="casesType" checked={casesType === "cases"} /> Cases
                            <input style={{ marginLeft: '20px' }} type="radio" value="recovered" name="caseType" checked={casesType === "recovered"} /> Recovered
                            <input style={{ marginLeft: '20px' }} type="radio" value="deaths" name="caseType" checked={casesType === "deaths"} /> Death

                        </div>
                    </div>
                    <Line
                        options={options}
                        data={{
                            datasets: [{
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1034",
                                data: data
                            }]
                        }}
                    />
                </div>
            )}
            <Map casesType={casesType} mapCenter={mapCenter} mapZoom={mapZoom} mapCountries={mapCountries} />
        </div>

    )
}

export default Charts