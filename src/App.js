import React, { useEffect, useState } from 'react';
import './style.css';

function App() {
  const [pokemon, setPokemon] = useState({});
  const [nomeDigitado, setNomeDigitado] = useState(''); //Guarda o nome que a pessoa digitar aqui.

  function loadAPI(nomeDigitado) {
    let url = `https://pokeapi.co/api/v2/pokemon/${nomeDigitado}`;// Pegará na URL + a variável de nome digitado
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setPokemon(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
      loadAPI('pikachu');// Carrega um Pokémon inicialmente
  }, []);

  const handleSearch = () => {
    loadAPI(nomeDigitado.toLowerCase()); // Deixa em minúsculo para não ter problemas na busca da URL da API
  };

  return (
    <div className='container'>
      <header>
        <strong>Pokemon API</strong>
      </header>

      <div className = 'Base'>
          <div className='Botao'>
            <input
              type='text'
              placeholder='Buscar Pokémon'
              value={nomeDigitado}
              onChange={(e) => setNomeDigitado(e.target.value)}
            />
            <button onClick={handleSearch}>Pesquisar</button>
          </div>
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
          <div>Nome: {pokemon.name}</div>
          <div>ID: {pokemon.id}</div>
          <div>Peso: {pokemon.weight / 10}kg</div>
          <div>Altura: {pokemon.height / 10}m</div>
          <div>Vida: {pokemon.stats && pokemon.stats[0] ? pokemon.stats[0].base_stat : 'Nenhum'}</div>
          <div>Ataque: {pokemon.stats && pokemon.stats[1] ? pokemon.stats[1].base_stat : 'Nenhum'}</div>
          <div>Defesa: {pokemon.stats && pokemon.stats[2] ? pokemon.stats[2].base_stat : 'Nenhum'}</div>
      
      </div>
    </div>
  );
}

export default App;