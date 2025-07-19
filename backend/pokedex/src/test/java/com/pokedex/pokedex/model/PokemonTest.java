package com.pokedex.pokedex.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PokemonTest {

    private Pokemon pokemon;

    @BeforeEach
    void setUp() {
        pokemon = new Pokemon();
    }

    @Test
    void testPokemonCreation() {
        // When
        Pokemon newPokemon = new Pokemon();
        
        // Then
        assertNotNull(newPokemon);
        assertNull(newPokemon.getId());
        assertNull(newPokemon.getName());
        assertNull(newPokemon.getTyp());
    }

    @Test
    void testSettersAndGetters() {
        // Given
        Long expectedId = 1L;
        String expectedName = "Pikachu";
        String expectedTyp = "Elektro";

        // When
        pokemon.setId(expectedId);
        pokemon.setName(expectedName);
        pokemon.setTyp(expectedTyp);

        // Then
        assertEquals(expectedId, pokemon.getId());
        assertEquals(expectedName, pokemon.getName());
        assertEquals(expectedTyp, pokemon.getTyp());
    }

    @Test
    void testNullValues() {
        // When - Setzen von null Werten
        pokemon.setName(null);
        pokemon.setTyp(null);
        pokemon.setFaehigkeit(null);

        // Then
        assertNull(pokemon.getName());
        assertNull(pokemon.getTyp());
        assertNull(pokemon.getFaehigkeit());
    }

    @Test
    void testEmptyStringValues() {
        // When - Setzen von leeren Strings
        pokemon.setName("");
        pokemon.setTyp("");
        pokemon.setFaehigkeit("");

        // Then
        assertEquals("", pokemon.getName());
        assertEquals("", pokemon.getTyp());
        assertEquals("", pokemon.getFaehigkeit());
    }

    @Test
    void testAllFieldsSetAndGet() {
        // Given
        pokemon.setId(1L);
        pokemon.setName("Pikachu");
        pokemon.setTyp("Elektro");
        pokemon.setFaehigkeit("Statik");
        pokemon.setEvolution("Raichu");
        pokemon.setGeschlecht("Männlich");
        pokemon.setFundort("Route 1");
        pokemon.setBezeichnung("Elektro-Maus");

        // Then
        assertEquals(1L, pokemon.getId());
        assertEquals("Pikachu", pokemon.getName());
        assertEquals("Elektro", pokemon.getTyp());
        assertEquals("Statik", pokemon.getFaehigkeit());
        assertEquals("Raichu", pokemon.getEvolution());
        assertEquals("Männlich", pokemon.getGeschlecht());
        assertEquals("Route 1", pokemon.getFundort());
        assertEquals("Elektro-Maus", pokemon.getBezeichnung());
    }
}
