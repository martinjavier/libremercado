import React, { useContext } from 'react'
import { CartWidget } from '../../components/CartWidget/CartWidget';
import { Link, NavLink } from 'react-router-dom';
import { UserAuthContext } from '../../context/UserAuthContext'
import '../../css/bootstrap.min.css';
import './NavBar.scss';

export const NavBar = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(UserAuthContext);
  const handlesubmit = () => {
      setIsAuthenticated(false);
  }
  return (
      <header className="header">
          <h1 className="marca">Libre Mercado</h1>
          <div>
              <nav>
                <NavLink exact className="NavLink" activeClassName={'activeLink'} to="/">Inicio</NavLink>
                <NavLink exact className="NavLink" activeClassName={'activeLink'} to="/productos/Zapatos">Zapatos</NavLink>
                <NavLink exact className="NavLink" activeClassName={'activeLink'} to="/productos/Electrónica">Electrónica</NavLink>  
                <NavLink exact className="NavLink" activeClassName={'activeLink'} to="/productos/Hogar">Hogar</NavLink>  
                <NavLink exact className="NavLink" activeClassName={'activeLink'} to="/productos/Arte">Arte</NavLink>  
                <NavLink exact className="NavLink" activeClassName={'activeLink'} to="/productos/Electricidad">Electricidad</NavLink> 
                <Link to="/cart"><CartWidget/></Link>
                    { !isAuthenticated || <button onClick={handlesubmit} > Logout</button> }                  
              </nav>
          </div>
      </header>
  )



}
