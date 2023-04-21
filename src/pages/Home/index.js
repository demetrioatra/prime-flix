import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './home.css'

function Home() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: 'ce7ca7a441765f669c1388967eff6315',
                    language: 'pt-BR',
                    page: 1
                }
            })

            setFilmes(response.data.results.slice(0,10))
        }
        
        loadFilmes()
    }, [])

    return (
        <div>
            <div className='lista-filmes'>
                {filmes.map((f) => {
                    return(
                        <article key={f.id}>
                            <strong>{f.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${f.poster_path}`} alt={f.title} />
                            <Link to={`/filme/${f.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home