import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

// Mock fetch API
global.fetch = vi.fn()

describe('Pokédex App - 5 Wichtige Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Standard Mock Response für fetchPokemons
    fetch.mockResolvedValue({
      ok: true,
      json: async () => []
    })
  })

  afterEach(() => {
    cleanup()
  })

  it('1. App lädt und zeigt Pokédex Titel an', async () => {
    render(<App />)
    
    expect(screen.getByText('⚡ POKÉDEX ⚡')).toBeInTheDocument()
    expect(screen.getByText('🔍 Pokémon Sammlung')).toBeInTheDocument()
    expect(screen.getByText('➕ Neues Pokémon')).toBeInTheDocument()
  })

  it('2. Formular Validierung funktioniert', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Submitten ohne Name und Typ
    const submitButton = screen.getByText('⚡ Pokémon hinzufügen')
    await user.click(submitButton)
    
    // Fehler-Nachricht prüfen
    expect(screen.getByText('Name und Typ sind Pflichtfelder!')).toBeInTheDocument()
  })

  it('3. Suchfeld ist vorhanden', async () => {
    render(<App />)
    
    const searchInput = screen.getByPlaceholderText('🔍 Pokémon durchsuchen...')
    expect(searchInput).toBeInTheDocument()
  })

  it('4. Helper Text wird angezeigt wenn kein Pokemon ausgewählt', async () => {
    render(<App />)
    
    expect(screen.getByText('👆 Wähle ein Pokémon aus der Liste aus, um es hier anzuzeigen und zu bearbeiten.')).toBeInTheDocument()
    expect(screen.getByText('🎮 Klicke auf ein Pokémon für Details!')).toBeInTheDocument()
  })

  it('5. API wird beim Laden aufgerufen', async () => {
    render(<App />)
    
    // Überprüfe dass fetch aufgerufen wurde
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/pokemons')
  })
})
