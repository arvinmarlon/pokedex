package com.pokedex.pokedex.service;

import com.pokedex.pokedex.model.Pokemon;
import com.pokedex.pokedex.repository.PokemonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PokemonServiceTest {

    @Mock
    private PokemonRepository pokemonRepository;

    @InjectMocks
    private PokemonService pokemonService;

    private Pokemon testPokemon;

    @BeforeEach
    void setUp() {
        testPokemon = new Pokemon();
        testPokemon.setId(1L);
        testPokemon.setName("Pikachu");
        testPokemon.setTyp("Elektro");
        testPokemon.setFaehigkeit("Statik");
    }

    @Test
    void getAllPokemons_ShouldReturnAllPokemons() {
        // Given
        List<Pokemon> expectedPokemons = Arrays.asList(testPokemon);
        when(pokemonRepository.findAll()).thenReturn(expectedPokemons);

        // When
        List<Pokemon> actualPokemons = pokemonService.getAllPokemons();

        // Then
        assertEquals(1, actualPokemons.size());
        assertEquals("Pikachu", actualPokemons.get(0).getName());
        verify(pokemonRepository, times(1)).findAll();
    }

    @Test
    void getPokemonById_ShouldReturnPokemon_WhenExists() {
        // Given
        when(pokemonRepository.findById(1L)).thenReturn(Optional.of(testPokemon));

        // When
        Optional<Pokemon> result = pokemonService.getPokemonById(1L);

        // Then
        assertTrue(result.isPresent());
        assertEquals("Pikachu", result.get().getName());
        verify(pokemonRepository, times(1)).findById(1L);
    }

    @Test
    void addPokemon_ShouldSavePokemon() {
        // Given
        when(pokemonRepository.save(any(Pokemon.class))).thenReturn(testPokemon);

        // When
        Pokemon result = pokemonService.addPokemon(testPokemon);

        // Then
        assertNotNull(result);
        assertEquals("Pikachu", result.getName());
        verify(pokemonRepository, times(1)).save(testPokemon);
    }

    @Test
    void updatePokemon_ShouldUpdateExistingPokemon() {
        // Given
        Pokemon updatedPokemon = new Pokemon();
        updatedPokemon.setName("Raichu");
        updatedPokemon.setTyp("Elektro");
        
        when(pokemonRepository.findById(1L)).thenReturn(Optional.of(testPokemon));
        when(pokemonRepository.save(any(Pokemon.class))).thenReturn(testPokemon);

        // When
        Pokemon result = pokemonService.updatePokemon(1L, updatedPokemon);

        // Then
        assertNotNull(result);
        assertEquals("Raichu", result.getName());
        verify(pokemonRepository, times(1)).findById(1L);
        verify(pokemonRepository, times(1)).save(any(Pokemon.class));
    }

    @Test
    void deletePokemon_ShouldDeletePokemon() {
        // Given
        doNothing().when(pokemonRepository).deleteById(1L);

        // When
        pokemonService.deletePokemon(1L);

        // Then
        verify(pokemonRepository, times(1)).deleteById(1L);
    }
}
