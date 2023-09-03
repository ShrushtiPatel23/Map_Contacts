import React from 'react'
import { Link } from 'react-router-dom'


function Sidebar() {
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbars"  style={{height: '10%'}}>
                <Link className="navbar-brand" style={{ textDecoration: 'none', fontWeight: 'bolder', color: 'whitesmoke' }} to="/">Contact</Link>
            </nav>
            <div className='row'>
                <div className="col-sm-2 sidebar">
                    <nav className="navbar fixed-left navbar-expand-lg" style={{ margin: '20%'}}>

                        <ul className="nav flex-column">
                            <li className="nav-item ">
                                <Link className="nav-link active sidebarItem" style={{ textDecoration: 'none' }} aria-current="page" to="/">Contact</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link sidebarItem" style={{ textDecoration: 'none' }} to="/chart">Chart and Maps</Link>
                            </li>

                        </ul>

                    </nav>

                </div>

            </div>
        </div>
    )
}

export default Sidebar