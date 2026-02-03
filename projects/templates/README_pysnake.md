# Python is a Snake

Questo progetto è un'implementazione del classico gioco Snake in Python utilizzando la libreria Pygame. È pensato come esercizio pratico per la programmazione di giochi 2D e per imparare a gestire input, rendering e logica di gioco con Pygame.

## Descrizione
In questa versione la "serpente" si muove su una griglia discreta, mangia il cibo che appare in posizioni casuali e cresce di lunghezza. L'obiettivo è ottenere il punteggio più alto evitando di urtare i muri o il proprio corpo. Il gioco include un ciclo principale (game loop), gestione degli input da tastiera, rilevamento delle collisioni e visualizzazione del punteggio a schermo.

## Caratteristiche principali
- Movimento su griglia (step discreti).
- Effetto "warp" con i muri e collisione con il proprio corpo (game over).
- Generazione casuale del cibo in posizioni libere.
- Incremento del punteggio quando si mangia il cibo.
- Possibilità di mettere in pausa e riavviare la partita (ancora da implementare).
- File per il high score (opzionale, ancora da implementare).
- Struttura modulare del codice per separare logica, entità e impostazioni.

## Requisiti
- Python 3.8 o superiore (consigliato)
- Pygame (compatibile con la versione di Python installata)

Installazione rapida:
```bash
python -m pip install pygame
# oppure, se presente:
python -m pip install -r requirements.txt
```

## Avvio del gioco
1. Clona il repository:
   ```bash
   git clone https://github.com/davidenegri0/python_is_a_snake.git
   cd python_is_a_snake
   ```
2. Installa le dipendenze (vedi sopra).
3. Avvia il file principale (sostituisci `main.py` con il nome reale del file di avvio se diverso):
   ```bash
   python main.py
   ```

## Controlli
- Frecce della tastiera oppure WASD per muovere la serpente.
- P per pausa / riprendi (da implementare).
- R per riavviare dopo il game over (da implementare).
- Esc per uscire.

## Panoramica tecnica (come è stato realizzato)
- Game loop: gestione di eventi, aggiornamento dello stato del gioco (logic tick) e rendering. Viene usato `pygame.time.Clock` per limitare il framerate e garantire passi di gioco costanti.
- Griglia e coordinate: il mondo è suddiviso in celle; la testa e i segmenti del serpente sono rappresentati come coordinate di cella intere.
- Rappresentazione del serpente: tipicamente una lista di tuple (x, y) che rappresentano i segmenti dalla testa alla coda. Ad ogni avanzamento la testa si aggiunge nella direzione corrente; se non si è mangiato, si rimuove l'ultimo segmento.
- Input e validazione: gli input aggiornano la direzione, con controllo per impedire inversioni immediate (es. andare da sinistra a destra subito).
- Collisioni: controlli per rilevare collisioni con i bordi e con il corpo del serpente.
- Generazione del cibo: il cibo viene posizionato su celle casuali non occupate dalla serpente; si usa un campionamento ripetuto o si costruisce l'insieme delle celle libere e si sceglie da lì.
- Salvataggio high score: semplice persistenza su file di testo (es. `highscore.txt`) caricata all'avvio e aggiornata al termine della partita.
- Organizzazione: separare la logica in moduli come `game.py`, `snake.py`, `food.py`, `settings.py` aiuta la manutenzione e i test.

## Parametri modificabili
È facile personalizzare:
- Dimensione della griglia / pixel per cella
- Velocità iniziale e incremento (difficoltà progressiva)
- Colori (sfondo, serpente, cibo)
- Modalità bordo (muri mortali o wrap-around)
- Abilitare/disabilitare suoni e effetti

## Struttura suggerita del repository
(Esempio che potresti già avere; adattalo ai file reali del progetto)
```
python_is_a_snake/
├─ main.py
├─ game.py
├─ snake.py
├─ food.py
├─ settings.py
├─ assets/
│  ├─ sounds/
│  └─ images/
├─ requirements.txt
├─ README.md
└─ highscore.txt
```

## Miglioramenti futuri (idee)
- Aggiungere ostacoli fissi o dinamici.
- Modalità multigiocatore locale (split-screen o hot-seat).
- Power-up con effetti temporanei.
- Menu principali, schermata delle impostazioni e animazioni.
- Supporto controller / gamepad.
- Grafica e suoni migliorati.

## Come contribuire
1. Fork del progetto.
2. Crea un branch per la tua feature/fix: `git checkout -b feature/nome-feature`.
3. Commit delle modifiche e pull request con descrizione delle modifiche.

## Licenza
Aggiungi qui la licenza che preferisci (es. MIT, GPL). Se vuoi, posso suggerire e aggiungere una licenza standard al repository.

## Ringraziamenti
Ispirato dal classico Snake. Progetto realizzato per esercitarsi con Pygame e con la programmazione di giochi 2D.
