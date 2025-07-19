import { useState, useEffect } from 'react';
import './App.css';

const initialForm = {
  name: '',
  typ: '',
  faehigkeit: '',
  evolution: '',
  geschlecht: '',
  fundort: '',
  bezeichnung: ''
};

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [editPokemon, setEditPokemon] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchPokemons = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/pokemons');
      const data = await res.json();
      setPokemons(data);
      setFilteredPokemons(data);
    } catch (e) {
      setError('Fehler beim Laden der Pokemons');
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  // Filter pokemons based on search term
  useEffect(() => {
    const filtered = pokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.typ.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.faehigkeit.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemons(filtered);
  }, [searchTerm, pokemons]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditPokemon({ ...editPokemon, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Validierung
    if (!form.name || !form.typ) {
      setError('Name und Typ sind Pflichtfelder!');
      return;
    }
    try {
      const res = await fetch('http://localhost:8080/api/pokemons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccess('Pokemon erfolgreich hinzugefügt!');
        setForm(initialForm);
        fetchPokemons();
      } else {
        setError('Fehler beim Hinzufügen!');
      }
    } catch (e) {
      setError('Serverfehler!');
    }
  };

  const handleUpdate = async () => {
    setError('');
    setSuccess('');
    if (!editPokemon.name || !editPokemon.typ) {
      setError('Name und Typ sind Pflichtfelder!');
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/api/pokemons/${editPokemon.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editPokemon)
      });
      if (res.ok) {
        setSuccess('Pokemon erfolgreich aktualisiert!');
        setIsEditing(false);
        setSelectedPokemon(editPokemon);
        fetchPokemons();
      } else {
        setError('Fehler beim Aktualisieren!');
      }
    } catch (e) {
      setError('Serverfehler!');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/pokemons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSuccess('Pokemon gelöscht!');
        if (selectedPokemon && selectedPokemon.id === id) {
          setSelectedPokemon(null);
          setIsEditing(false);
        }
        fetchPokemons();
      } else {
        setError('Fehler beim Löschen!');
      }
    } catch (e) {
      setError('Serverfehler!');
    }
  };

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsEditing(false);
    setEditPokemon(null);
  };

  const startEdit = () => {
    setEditPokemon({ ...selectedPokemon });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditPokemon(null);
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex-title">⚡ POKÉDEX ⚡</div>
      
      {/* Links: Pokemon Liste + Suche */}
      <div className="pokemon-list-section">
        <div className="pokemon-list">
          <h2>🔍 Pokémon Sammlung</h2>
          
          {/* Search bar */}
          <div className="search-container">
            <input 
              type="text"
              className="search-input"
              placeholder="🔍 Pokémon durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {filteredPokemons.length === 0 ? <p>Keine Pokémons gefunden.</p> : (
            <ul style={{listStyle: 'none', padding: 0}}>
              {filteredPokemons.map(p => (
                <li 
                  key={p.id} 
                  className={`pokemon-item ${selectedPokemon && selectedPokemon.id === p.id ? 'selected' : ''}`}
                  onClick={() => handlePokemonSelect(p)}
                >
                  <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#fff'}}>
                    {p.name} <span style={{fontSize: '0.9rem', color: '#ffb199'}}>({p.typ})</span>
                  </div>
                  <div style={{marginTop: '4px', color: '#ccc', fontSize: '0.9rem'}}>
                    <span style={{marginRight: '12px'}}>🧬 {p.faehigkeit}</span>
                    <span>🔄 {p.evolution}</span>
                  </div>
                  <button 
                    className="delete-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(p.id);
                    }}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mitte: Pokemon Edit/Display Panel */}
      <div className="pokemon-edit-section">
        {selectedPokemon ? (
          <div className="pokemon-edit-panel">
            <h2 className="pokemon-edit-title">
              {isEditing ? `✏️ ${selectedPokemon.name} bearbeiten` : `📋 ${selectedPokemon.name}`}
            </h2>
            
            {isEditing ? (
              <div className="pokemon-details">
                <div className="pokemon-detail-item">
                  <label className="pokemon-detail-label">Name*</label>
                  <input 
                    className="pokemon-detail-value"
                    name="name"
                    value={editPokemon.name}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="pokemon-detail-item">
                  <label className="pokemon-detail-label">Typ*</label>
                  <input 
                    className="pokemon-detail-value"
                    name="typ"
                    value={editPokemon.typ}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="pokemon-detail-item">
                  <label className="pokemon-detail-label">Fähigkeit</label>
                  <input 
                    className="pokemon-detail-value"
                    name="faehigkeit"
                    value={editPokemon.faehigkeit}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="pokemon-detail-item">
                  <label className="pokemon-detail-label">Evolution</label>
                  <input 
                    className="pokemon-detail-value"
                    name="evolution"
                    value={editPokemon.evolution}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="pokemon-detail-item">
                  <label className="pokemon-detail-label">Geschlecht</label>
                  <input 
                    className="pokemon-detail-value"
                    name="geschlecht"
                    value={editPokemon.geschlecht}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="pokemon-detail-item">
                  <label className="pokemon-detail-label">Fundort</label>
                  <input 
                    className="pokemon-detail-value"
                    name="fundort"
                    value={editPokemon.fundort}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="pokemon-detail-item">
                  <label className="pokemon-detail-label">Bezeichnung</label>
                  <input 
                    className="pokemon-detail-value"
                    name="bezeichnung"
                    value={editPokemon.bezeichnung}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="edit-buttons">
                  <button className="save-btn" onClick={handleUpdate}>💾 Speichern</button>
                  <button className="cancel-btn" onClick={cancelEdit}>❌ Abbrechen</button>
                </div>
              </div>
            ) : (
              <div className="pokemon-details">
                <div className="pokemon-detail-item">
                  <span className="pokemon-detail-label">Name</span>
                  <div className="pokemon-detail-value">{selectedPokemon.name}</div>
                </div>
                <div className="pokemon-detail-item">
                  <span className="pokemon-detail-label">Typ</span>
                  <div className="pokemon-detail-value">{selectedPokemon.typ}</div>
                </div>
                <div className="pokemon-detail-item">
                  <span className="pokemon-detail-label">Fähigkeit</span>
                  <div className="pokemon-detail-value">{selectedPokemon.faehigkeit || 'Nicht angegeben'}</div>
                </div>
                <div className="pokemon-detail-item">
                  <span className="pokemon-detail-label">Evolution</span>
                  <div className="pokemon-detail-value">{selectedPokemon.evolution || 'Nicht angegeben'}</div>
                </div>
                <div className="pokemon-detail-item">
                  <span className="pokemon-detail-label">Geschlecht</span>
                  <div className="pokemon-detail-value">{selectedPokemon.geschlecht || 'Nicht angegeben'}</div>
                </div>
                <div className="pokemon-detail-item">
                  <span className="pokemon-detail-label">Fundort</span>
                  <div className="pokemon-detail-value">{selectedPokemon.fundort || 'Nicht angegeben'}</div>
                </div>
                <div className="pokemon-detail-item">
                  <span className="pokemon-detail-label">Bezeichnung</span>
                  <div className="pokemon-detail-value">{selectedPokemon.bezeichnung || 'Nicht angegeben'}</div>
                </div>
                <div className="edit-buttons">
                  <button className="edit-btn" onClick={startEdit}>✏️ Bearbeiten</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="no-pokemon-selected">
            <p>👆 Wähle ein Pokémon aus der Liste aus, um es hier anzuzeigen und zu bearbeiten.</p>
            <p>🎮 Klicke auf ein Pokémon für Details!</p>
          </div>
        )}
      </div>

      {/* Rechts: Pokemon Hinzufügen Form */}
      <div className="pokedex-form-section">
        <h2 className="form-title">➕ Neues Pokémon</h2>
        <form className="pokedex-form" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name*" />
          <input name="typ" value={form.typ} onChange={handleChange} placeholder="Typ*" />
          <input name="faehigkeit" value={form.faehigkeit} onChange={handleChange} placeholder="Fähigkeit" />
          <input name="evolution" value={form.evolution} onChange={handleChange} placeholder="Evolution" />
          <input name="geschlecht" value={form.geschlecht} onChange={handleChange} placeholder="Geschlecht" />
          <input name="fundort" value={form.fundort} onChange={handleChange} placeholder="Fundort" />
          <input name="bezeichnung" value={form.bezeichnung} onChange={handleChange} placeholder="Bezeichnung" />
          <button type="submit">⚡ Pokémon hinzufügen</button>
        </form>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>
    </div>
  );
}

export default App;
