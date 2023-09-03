import React from 'react'
import { BiSearch } from 'react-icons/bi';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ borderBottomColor: '#e5e5e5', backgroundColor : '#fffef2', height: '90px'}}>
                <div className="container-fluid">
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                            <li className="nav-item">
                                <a className="nav-link NavbarText" aria-current="page" href="#" >Skin Care</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link NavbarText" aria-current="page" href="#">Body & Hand</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link NavbarText" aria-current="page" href="#">Hair</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link NavbarText" aria-current="page" href="#">Fragrance</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link NavbarText" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link NavbarText" aria-current="page" href="#">Kits & Travel</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link NavbarText" aria-current="page" href="#">Gifts</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link NavbarText" aria-current="page" href="#">Read</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link NavbarText" aria-current="page" href="#">Stores</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link NavbarText" aria-current="page" href="#">Facial Appointmen</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link NavbarText" aria-current="page" href="#"><BiSearch /></a>
                            </li>
                        </ul>
                        <form className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                        <li className="nav-item">
                            <a className="nav-link NavbarText" aria-current="page" href="#">Log In</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link NavbarText" aria-current="page" href="#">Cabinet</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link NavbarText" aria-current="page" href="#">Cart</a>
                        </li>
                        </ul>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar