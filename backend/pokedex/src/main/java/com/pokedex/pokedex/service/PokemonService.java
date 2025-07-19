package com.pokedex.pokedex.service;

import com.pokedex.pokedex.model.Pokemon;
import com.pokedex.pokedex.repository.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PokemonService {
    @Autowired
    private PokemonRepository pokemonRepository;

    public List<Pokemon> getAllPokemons() {
        return pokemonRepository.findAll();
    }

    public Optional<Pokemon> getPokemonById(Long id) {
        return pokemonRepository.findById(id);
    }

    public Pokemon addPokemon(Pokemon pokemon) {
        return pokemonRepository.save(pokemon);
    }

    public Pokemon updatePokemon(Long id, Pokemon pokemonDetails) {
        return pokemonRepository.findById(id).map(pokemon -> {
            pokemon.setName(pokemonDetails.getName());
            pokemon.setTyp(pokemonDetails.getTyp());
            pokemon.setFaehigkeit(pokemonDetails.getFaehigkeit());
            pokemon.setEvolution(pokemonDetails.getEvolution());
            pokemon.setGeschlecht(pokemonDetails.getGeschlecht());
            pokemon.setFundort(pokemonDetails.getFundort());
            pokemon.setBezeichnung(pokemonDetails.getBezeichnung());
            return pokemonRepository.save(pokemon);
        }).orElse(null);
    }

    public void deletePokemon(Long id) {
        pokemonRepository.deleteById(id);
    }
}
