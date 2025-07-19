import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
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
      json: async () => [
        {
          id: 1,
          name: 'Pikachu',
          typ: 'Elektro',
          faehigkeit: 'Statik',
          evolution: 'Raichu',
          geschlecht: 'Männlich',
          fundort: 'Route 1',
          bezeichnung: 'Elektro-Maus'
        },
        {
          id: 2,
          name: 'Charmander',
          typ: 'Feuer',
          faehigkeit: 'Grossbrand',
          evolution: 'Charmeleon',
          geschlecht: 'Männlich',
          fundort: 'Route 2',
          bezeichnung: 'Echse'
        }
      ]
    })
  })

  it('1. App lädt und zeigt Pokédex Titel an', async () => {
    render(<App />)
    
    expect(screen.getByText('⚡ POKÉDEX ⚡')).toBeInTheDocument()
    expect(screen.getByText('🔍 Pokémon Sammlung')).toBeInTheDocument()
    expect(screen.getByText('➕ Neues Pokémon')).toBeInTheDocument()
  })

  it('2. Pokemon Liste wird korrekt geladen und angezeigt', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument()
      expect(screen.getByText('Charmander')).toBeInTheDocument()
    })
    
    // Überprüfe dass Pokemon-Details angezeigt werden
    expect(screen.getByText('(Elektro)')).toBeInTheDocument()
    expect(screen.getByText('(Feuer)')).toBeInTheDocument()
  })

  it('3. Suche funktioniert korrekt', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Warten bis Pokemon geladen sind
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument()
      expect(screen.getByText('Charmander')).toBeInTheDocument()
    })
    
    const searchInput = screen.getByPlaceholderText('🔍 Pokémon durchsuchen...')
    
    // Nach "Pika" suchen
    await user.type(searchInput, 'Pika')
    
    // Nur Pikachu sollte sichtbar sein
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument()
  })

  it('4. Pokemon auswählen und Details anzeigen', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Warten bis Pokemon geladen sind
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument()
    })
    
    // Pikachu anklicken
    await user.click(screen.getByText('Pikachu'))
    
    // Details Panel sollte erscheinen
    expect(screen.getByText('📋 Pikachu')).toBeInTheDocument()
    expect(screen.getByText('Elektro-Maus')).toBeInTheDocument()
    expect(screen.getByText('✏️ Bearbeiten')).toBeInTheDocument()
  })

  it('5. Formular Validierung bei fehlendem Pflichtfeld', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Nur Typ eingeben, Name leer lassen
    const typInput = screen.getByPlaceholderText('Typ*')
    const submitButton = screen.getByText('⚡ Pokémon hinzufügen')
    
    await user.type(typInput, 'Feuer')
    await user.click(submitButton)
    
    // Fehler-Nachricht prüfen
    expect(screen.getByText('Name und Typ sind Pflichtfelder!')).toBeInTheDocument()
  })
})
