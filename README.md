#Pokédex Full-Stack Anwendung

Ein modernes Full-Stack Pokédex-System entwickelt mit **Spring Boot** (Backend) und **React** (Frontend). Verwalte deine Pokémon-Sammlung mit einer schönen, responsive Benutzeroberfläche!

### ⚡ Frontend (React)
- **Moderne UI**: Vollflächiges 3-Spalten-Layout
- **Pokémon-Liste**: Scrollbare Liste mit Suchfunktion
- **Live-Suche**: Echtzeit-Filter nach Name, Typ oder Fähigkeit
- **Edit-Modus**: Pokémon direkt bearbeiten und aktualisieren
- **Responsive Design**: Funktioniert auf allen Bildschirmgrössen
- **Smooth Animations**: Hover-Effekte und Transitions

### 🔧 Backend (Spring Boot)
- **REST API**: Vollständige CRUD-Operationen
- **MySQL Integration**: Persistent data storage
- **Service Layer**: Saubere Geschäftslogik-Trennung
- **Repository Pattern**: JPA/Hibernate für Datenbankzugriff
- **Cross-Origin Support**: CORS-konfiguriert für Frontend-Integration

### 📊 Datenbank (MySQL)
- **Pokémon-Eigenschaften**: Name, Typ, Fähigkeiten, Evolution, etc.
- **Auto-Increment IDs**: Automatische Primärschlüssel
- **Referentielle Integrität**: Saubere Datenbankstruktur

## 🛠️ Technologie-Stack

### Backend
- **Java 21**
- **Spring Boot 3.x**
- **Spring Data JPA**
- **MySQL 8.0+**
- **Maven** (Build-Tool)

### Frontend
- **React 18+**
- **JavaScript ES6+**
- **CSS3** (Custom Styling)
- **Vite** (Build-Tool)

## 🚀 Installation & Setup

### Voraussetzungen
- Java 17 oder höher
- Node.js 16 oder höher
- MySQL 8.0 oder höher
- Git

### 1. Repository klonen
```bash
git clone https://github.com/arvinmarlon/pokedex-master.git
cd pokedex-master
```

### 2. MySQL Datenbank einrichten
```sql
CREATE DATABASE pokedex_db;
CREATE USER 'pokedex_user'@'localhost' IDENTIFIED BY 'pokedex_password';
GRANT ALL PRIVILEGES ON pokedex_db.* TO 'pokedex_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Backend starten (Spring Boot)
```bash
cd backend/pokedex
./mvn spring-boot:run
```
Das Backend läuft nun auf `http://localhost:8080`

### 4. Frontend starten (React)
```bash
cd frontend/frontend
npm install
npm run dev
```
Das Frontend läuft nun auf `http://localhost:5173`

## 📁 Projektstruktur

```
pokedex-master/
├── backend/
│   └── pokedex/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/pokedex/pokedex/
│       │   │   │   ├── controller/
│       │   │   │   │   └── PokemonController.java
│       │   │   │   ├── model/
│       │   │   │   │   └── Pokemon.java
│       │   │   │   ├── repository/
│       │   │   │   │   └── PokemonRepository.java
│       │   │   │   ├── service/
│       │   │   │   │   └── PokemonService.java
│       │   │   │   └── PokedexApplication.java
│       │   │   └── resources/
│       │   │       └── application.properties
│       │   └── test/
│       ├── pom.xml
│       └── mvnw
├── frontend/
│   └── frontend/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       ├── package.json
│       └── vite.config.js
├── klassendiagramm.md
├── backend-klassendiagramm.md
└── README.md
```

## 🎮 Verwendung

### Pokémon hinzufügen
1. Fülle das Formular rechts aus (Name und Typ sind Pflichtfelder)
2. Klicke auf "Pokémon hinzufügen"

### Pokémon suchen
1. Verwende die Suchleiste links oben
2. Suche nach Name, Typ oder Fähigkeit

### Pokémon bearbeiten
1. Klicke auf ein Pokémon in der Liste (links)
2. Das Pokémon wird in der Mitte angezeigt
3. Klicke auf "Bearbeiten"
4. Ändere die Daten und klicke "Speichern"

### Pokémon löschen
1. Klicke auf den "🗑️" Button bei einem Pokémon

## 🔌 API Endpoints

| Methode | Endpoint | Beschreibung |
|---------|----------|--------------|
| GET | `/api/pokemons` | Alle Pokémon abrufen |
| GET | `/api/pokemons/{id}` | Pokémon nach ID abrufen |
| POST | `/api/pokemons` | Neues Pokémon erstellen |
| PUT | `/api/pokemons/{id}` | Pokémon aktualisieren |
| DELETE | `/api/pokemons/{id}` | Pokémon löschen |

### Beispiel-Request (POST)
```json
{
  "name": "Pikachu",
  "typ": "Elektro",
  "faehigkeit": "Statik",
  "evolution": "Raichu",
  "geschlecht": "Männlich",
  "fundort": "Viridian Forest",
  "bezeichnung": "Maus-Pokémon"
}
```

## Architektur

Das Projekt folgt einer **3-Schichten-Architektur**:

1. **Presentation Layer**: React Frontend
2. **Business Layer**: Spring Boot Services
3. **Data Layer**: MySQL Database

### Design Patterns
- **Repository Pattern**: Datenzugriff-Abstraktion
- **MVC Pattern**: Model-View-Controller Architektur
- **Dependency Injection**: Spring IoC Container
- **Component-based Architecture**: React Components

## 🔧 Konfiguration

### Backend-Konfiguration (`application.properties`)
```properties
spring.application.name=pokedex
spring.datasource.url=jdbc:mysql://localhost:3306/pokedex_db
spring.datasource.username=pokedex_user
spring.datasource.password=pokedex_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

### Frontend-Konfiguration (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

## 🧪 Tests

### Backend Tests
```bash
cd backend/pokedex
./mvnw test
```

### Frontend Tests
```bash
cd frontend/frontend
npm test
```

## 📦 Build für Produktion

### Backend JAR erstellen
```bash
cd backend/pokedex
./mvnw clean package
```

### Frontend Build
```bash
cd frontend/frontend
npm run build
```
