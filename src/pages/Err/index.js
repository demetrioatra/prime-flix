import { Link } from "react-router-dom"
import './err.css'

function Err() {
    return(
        <div className="info">
            <h1>404</h1>
            <h2>Página não encontrada!</h2>
            <Link to={'/'}>Página Inicial</Link>
        </div>
    )
}

export default Err