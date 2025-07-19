package com.pokedex.pokedex.model;

import jakarta.persistence.*;

@Entity
public class Pokemon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String typ;
    private String faehigkeit;
    private String evolution;
    private String geschlecht;
    private String fundort;
    private String bezeichnung;

    public Pokemon() {}

    public Pokemon(String name, String typ, String faehigkeit, String evolution, String geschlecht, String fundort, String bezeichnung) {
        this.name = name;
        this.typ = typ;
        this.faehigkeit = faehigkeit;
        this.evolution = evolution;
        this.geschlecht = geschlecht;
        this.fundort = fundort;
        this.bezeichnung = bezeichnung;
    }

    // Getter und Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getTyp() { return typ; }
    public void setTyp(String typ) { this.typ = typ; }
    public String getFaehigkeit() { return faehigkeit; }
    public void setFaehigkeit(String faehigkeit) { this.faehigkeit = faehigkeit; }
    public String getEvolution() { return evolution; }
    public void setEvolution(String evolution) { this.evolution = evolution; }
    public String getGeschlecht() { return geschlecht; }
    public void setGeschlecht(String geschlecht) { this.geschlecht = geschlecht; }
    public String getFundort() { return fundort; }
    public void setFundort(String fundort) { this.fundort = fundort; }
    public String getBezeichnung() { return bezeichnung; }
    public void setBezeichnung(String bezeichnung) { this.bezeichnung = bezeichnung; }
}
