import axios from 'axios'
import React, {useState} from 'react'
import Chart from '../../components/charts/Chart'
import { Container, Row, Col, Button, Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router';


const StockDetails = ({results, loggedIn}) => {
    const [clicked, setClick] = useState(false)
    const navigate = useNavigate()
    
    const { company_name, symbol, latest_price, change, previous_close, latest_source,
        open, high, low, week52_high, week52_low, volume, pe_ratio, market_cap,
        avg_total_volume, ytd_change } = results
    const isLoggedIn = loggedIn

    const handleClick = () => {
        //console.log(results.symbol)
        addStock()
       
    }

    const addStock = () => {
        //const { ticker } = results.symbol;
        axios.post("http://localhost:3000/stocks",
                {ticker: results.symbol},
                { withCredentials: true }
            )
            .then(response => {
                if (response) {
                    setClick(true)
                }
            })
            .catch(error => {
                //debugger
                console.log("error", error);
            });
    }

    
    
    return (
        <>
        <div>
                <h1>{company_name}</h1>

                {clicked ? (
                    <div><br/>
                        <h3 style={{ color: "green" }}>Stock Added To Watchlist!</h3>
                        <Nav.Link variant="pills" href="/dashboard"> Go To Dashboard</Nav.Link>
                    </div>) : ("")}
                <br />
                <Container>
                    <Row>
                        <Col className="p-3 border bg-light" sm={8}>
                            {<Chart symbol={symbol} />}

                        </Col>
                        <Col sm={4}>
                            <div className="p-3 border bg-light">

                                <dl className="row-center">
                                    <dt className="col-sm-10">{symbol}</dt>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">Latest Price</dt>
                                    <dd className="col-sm-6">{latest_price}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">Change</dt>
                                    <dd className="col-sm-6">{change}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">Previous Close</dt>
                                    <dd className="col-sm-6">{previous_close}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">Latest Source</dt>
                                    <dd className="col-sm-6">{latest_source}</dd>
                                </dl>
                            </div>
                        </Col>
                    </Row><br />
                    <Row>
                        <Col sm>
                            <div className="p-3 border bg-light">

                                <dl className="row-center">
                                    <dt className="col-sm-10">Price History</dt>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">Open</dt>
                                    <dd className="col-sm-6">{open}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">High</dt>
                                    <dd className="col-sm-6">{high}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">Low</dt>
                                    <dd className="col-sm-6">{low}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">52 Wk high</dt>
                                    <dd className="col-sm-6">{week52_high}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">52 Wk low</dt>
                                    <dd className="col-sm-6">{week52_low}</dd>
                                </dl>
                            </div>
                        </Col>

                        <Col sm>
                            <div className="p-3 border bg-light">

                                <dl className="row-center">
                                    <dt className="col-sm-10">Stats</dt>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">Volume</dt>
                                    <dd className="col-sm-6">{volume}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">Avg Vol</dt>
                                    <dd className="col-sm-6">{avg_total_volume}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">Mkt cap</dt>
                                    <dd className="col-sm-6">{market_cap}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">P/E ratio</dt>
                                    <dd className="col-sm-6">{pe_ratio}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-5">ytd_change</dt>
                                    <dd className="col-sm-6">{ytd_change}</dd>
                                </dl>
                            </div>
                        </Col>
                        </Row>
                        </Container><br/>
                {isLoggedIn ? (<Button variant="info" onClick={handleClick}>Add</Button>): ("")}
               

        </div>
        </>
    )
}

export default StockDetails
