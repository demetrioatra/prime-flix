import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './fav.css'

function Fav() {
    const [filmes, setFilmes] = useState([])
    
    useEffect(() => {    
        const lis = localStorage.getItem('@primeflix')

        setFilmes(JSON.parse(lis) || [])
    }, [])
    
    function excluir(id) {
        let filtro = filmes.filter((i) => {
            return(i.id !== id)
        })

        setFilmes(filtro)
        localStorage.setItem('@primeflix', JSON.stringify(filtro))
    }

    return(
        <div className="lisfil">
            <h2>Meus filmes favoritos</h2>
            {filmes.length === 0 && <span style={{display:'flex', justifyContent:'center', marginTop:'1.5%'}}>Nenhum filme salvo na lista de favoritos...</span>}
            <ul>
                {filmes.map((i) => {
                    return(
                        <li key={i.id}>
                            <span>{i.title}</span>
                            <div>
                                <Link to={`/fil/${i.id}`}>Detalhes</Link>
                                <button onClick={() => excluir(i.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Fav