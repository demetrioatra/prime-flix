import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../api"
import './filme.css'

function Filme() {
    const {id} = useParams()
    const [filme, setFilme] = useState({})
    const [carregando, setCarregando] = useState(true)
    
    useEffect(() => {
        async function carregaFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: 'ce7ca7a441765f669c1388967eff6315',
                    language: 'pt-BR'
                }
            })
            .then((res) => {
                setFilme(res.data)
                setCarregando(false)
            })
            .catch(() => {
                console.log('filme nao encontrado')
            })
        }
        
        carregaFilme()
    }, [])
      
    if (carregando) {
        return (
            <div className='carregando'>
                <h2>Carregando informações...</h2>       
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h2>{filme.title}</h2>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className="botoes">
                <button>Salvar</button>
                <button><a>Trailer</a></button>
            </div>
        </div>
    )
}

export default Filme