# 📋 GitHub Upload - Schritt-für-Schritt Anleitung

## 🚀 Projekt auf GitHub hochladen

### Schritt 1: Git initialisieren
```bash
# Navigiere zu deinem Projektordner
cd "c:\Users\arvin\Documents\MeinProjekt"

# Git Repository initialisieren
git init

# Alle Dateien hinzufügen
git add .

# Ersten Commit erstellen
git commit -m "🎉 Initial commit: Pokédex Master Full-Stack Application"
```

### Schritt 2: Remote Repository verbinden
```bash
# Remote Repository hinzufügen (ersetze DEIN-USERNAME mit deinem GitHub Username)
git remote add origin https://github.com/DEIN-USERNAME/pokedex-master.git

# Prüfen ob Remote korrekt hinzugefügt wurde
git remote -v
```

### Schritt 3: Auf GitHub pushen
```bash
# Branch auf main umbenennen (falls nötig)
git branch -M main

# Zum GitHub Repository pushen
git push -u origin main
```

## 🔧 Falls du Probleme hast:

### Problem: Repository existiert nicht
1. Gehe zu GitHub.com
2. Klicke auf "New Repository"
3. Repository Name: `pokedex-master`
4. Beschreibung: `🔥 Full-Stack Pokédex Application with Spring Boot & React`
5. Public Repository wählen
6. **NICHT** "Add README" ankreuzen (wir haben schon eine)
7. Repository erstellen

### Problem: Authentication
```bash
# GitHub Personal Access Token verwenden
# 1. Gehe zu GitHub → Settings → Developer settings → Personal access tokens
# 2. Generate new token (classic)
# 3. Scopes: repo, workflow
# 4. Token kopieren und als Passwort verwenden
```

### Problem: SSL Certificate
```bash
# SSL-Verifikation temporär deaktivieren (nur für Upload)
git config --global http.sslverify false

# Nach dem Upload wieder aktivieren
git config --global http.sslverify true
```

## 📁 .gitignore erstellen
Erstelle eine `.gitignore` Datei in deinem Projektroot:

```gitignore
# Java
*.class
*.jar
*.war
*.ear
target/
.mvn/
mvnw
mvnw.cmd

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
dist/
build/

# IDE
.vscode/
.idea/
*.iml
*.iws
*.ipr

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Database
*.db
*.sqlite

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Temporary files
*.tmp
*.temp
```

## ✅ Erfolgreich hochgeladen!

Nach dem Upload solltest du folgendes sehen:
- ✅ Alle Dateien sind auf GitHub sichtbar
- ✅ README.md wird automatisch angezeigt
- ✅ Grüner "Code" Button verfügbar
- ✅ Commit-History sichtbar

## 🔄 Updates pushen
Für zukünftige Änderungen:
```bash
# Änderungen hinzufügen
git add .

# Commit mit Beschreibung
git commit -m "✨ Feature: Neue Funktionalität hinzugefügt"

# Pushen
git push origin main
```

## 🎯 Nächste Schritte nach Upload:
1. Repository-Beschreibung hinzufügen
2. Topics hinzufügen: `java`, `spring-boot`, `react`, `mysql`, `full-stack`
3. GitHub Pages aktivieren (falls gewünscht)
4. Issues/Discussions aktivieren
5. Wiki erstellen (optional)
