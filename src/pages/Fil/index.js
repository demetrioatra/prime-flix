import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api"
import './fil.css'
import { toast } from "react-toastify"

function Filme() {
    const nav = useNavigate()
    const { id } = useParams()
    const [ filme, setFilme ] = useState({})
    const [ carregando, setCarregando ] = useState(true)
    
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
                nav('/', {replace:  true})
            })
        }

        carregaFilme()
    }, [nav, id])
      
    function salvar() {
        const lista = localStorage.getItem('@primeflix')
        let filmesSalvos = JSON.parse(lista) || []

        const even = (sFilme) => sFilme.id === filme.id
        const hasFilme = filmesSalvos.some(even)

        if (hasFilme === true) {
            toast.warn('Este filme já está salvo...')
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))    
        toast.success('Filme salvo com sucesso!')    
    }

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
                <button onClick={salvar}>Salvar</button>
                <button><a href={`https://youtube.com/results/?search_query=${filme.title} trailer`} target="blank" rel="external">Trailer</a></button>
            </div>
        </div>
    )
}

export default Filme