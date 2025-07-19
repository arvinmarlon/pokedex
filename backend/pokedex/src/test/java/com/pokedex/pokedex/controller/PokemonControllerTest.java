package com.pokedex.pokedex.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pokedex.pokedex.model.Pokemon;
import com.pokedex.pokedex.service.PokemonService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PokemonController.class)
class PokemonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PokemonService pokemonService;

    @Autowired
    private ObjectMapper objectMapper;

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
    void getAllPokemons_ShouldReturnListOfPokemons() throws Exception {
        // Given
        List<Pokemon> pokemons = Arrays.asList(testPokemon);
        when(pokemonService.getAllPokemons()).thenReturn(pokemons);

        // When & Then
        mockMvc.perform(get("/api/pokemons"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].name").value("Pikachu"));

        verify(pokemonService, times(1)).getAllPokemons();
    }

    @Test
    void getPokemonById_ShouldReturnPokemon_WhenExists() throws Exception {
        // Given
        when(pokemonService.getPokemonById(1L)).thenReturn(Optional.of(testPokemon));

        // When & Then
        mockMvc.perform(get("/api/pokemons/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Pikachu"))
                .andExpect(jsonPath("$.typ").value("Elektro"));

        verify(pokemonService, times(1)).getPokemonById(1L);
    }

    @Test
    void addPokemon_ShouldCreatePokemon() throws Exception {
        // Given
        Pokemon newPokemon = new Pokemon();
        newPokemon.setName("Squirtle");
        newPokemon.setTyp("Wasser");
        
        when(pokemonService.addPokemon(any(Pokemon.class))).thenReturn(testPokemon);

        // When & Then
        mockMvc.perform(post("/api/pokemons")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newPokemon)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Pikachu"));

        verify(pokemonService, times(1)).addPokemon(any(Pokemon.class));
    }

    @Test
    void updatePokemon_ShouldUpdatePokemon() throws Exception {
        // Given
        Pokemon updatedPokemon = new Pokemon();
        updatedPokemon.setName("Raichu");
        updatedPokemon.setTyp("Elektro");
        
        when(pokemonService.updatePokemon(eq(1L), any(Pokemon.class))).thenReturn(testPokemon);

        // When & Then
        mockMvc.perform(put("/api/pokemons/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedPokemon)))
                .andExpect(status().isOk());

        verify(pokemonService, times(1)).updatePokemon(eq(1L), any(Pokemon.class));
    }

    @Test
    void deletePokemon_ShouldDeletePokemon() throws Exception {
        // Given
        doNothing().when(pokemonService).deletePokemon(1L);

        // When & Then
        mockMvc.perform(delete("/api/pokemons/1"))
                .andExpect(status().isNoContent());

        verify(pokemonService, times(1)).deletePokemon(1L);
    }
}
