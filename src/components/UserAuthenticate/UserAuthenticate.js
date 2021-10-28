import { useContext } from "react";
import { UserAuthContext } from "../../context/UserAuthContext";
import './UserAuthenticate.scss'

export const UserAuthenticate = () => {

    const {setIsAuthenticated} = useContext(UserAuthContext);

    const handlesubmit = () => {
        setIsAuthenticated(true);
    }
    return (
    
    <>        
        <div className="container">
            <hr/>
            <h2>Por favor logueate.</h2>
            <hr/>
            <div className="columna">
                <button onClick={handlesubmit}> Login </button>
            </div>
        </div>
    </>
    );
}