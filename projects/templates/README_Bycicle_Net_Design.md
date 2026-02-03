# 🚲 Bicycle Network Design: Combinatorial Optimization

### Progetto di Ricerca Operativa - Laurea Magistrale
**Sviluppato da:** Sara Tullini & Davide Negri

---

## 📌 Panoramica del Progetto
Il progetto affronta un problema di **Network Design** nel contesto della pianificazione urbana. L'obiettivo è progettare una rete ciclabile connessa che massimizzi l'attrattività totale (*Likeness*) per i cittadini, rispettando un vincolo di budget stringente.

Il problema è stato modellato come un problema di ottimizzazione su grafi, risolto attraverso l'implementazione di diverse euristiche e meta-euristiche avanzate.

---

## ⚙️ Metodologia e Algoritmi
Per affrontare la complessità combinatoria del problema, sono stati implementati e confrontati quattro approcci:

1.  **Algoritmo Greedy:** Una tecnica costruttiva che seleziona gli archi con il miglior rapporto attrattività/costo, garantendo la connessione della rete.
2.  **Local Search:** Algoritmo di miglioramento per esplorare l'intorno della soluzione iniziale alla ricerca di ottimi locali.
3.  **G.R.A.S.P. (Greedy Randomized Adaptive Search Procedure):** Introduzione della componente stocastica per sfuggire agli ottimi locali ed esplorare più aree dello spazio di ricerca.
4.  **LNS (Large Neighborhood Search):** L'approccio più avanzato basato sulla strategia **Destroy & Repair**. Rimuovendo e ricostruendo ampie porzioni della rete, l'algoritmo è riuscito a convergere verso il presunto ottimo globale.



---

## 📊 Risultati Ottenuti
L'analisi comparativa ha dimostrato l'efficacia delle meta-euristiche rispetto agli approcci classici:

| Metodo | Attrattività (Likeness) | Budget Utilizzato |
| :--- | :---: | :---: |
| **Greedy** | 129 | 43 / 44 |
| **Local Search** | 129 | 43 / 44 |
| **G.R.A.S.P.** | 154 | 44 / 44 |
| **LNS (Migliorato)** | **154** | **44 / 44** |

I modelli migliorativi (GRASP e LNS) hanno permesso di ottenere un incremento del **19.3%** dell'attrattività della rete rispetto alla soluzione base, saturando il budget in modo efficiente, ottenendo un presunto ottimo globale.

---

## 📊 Analisi Visiva e Risultati

In questa sezione viene mostrata l'evoluzione della rete ciclabile: dalla struttura potenziale di partenza fino alla configurazione ottimale ottenuta con le meta-euristiche.

### 1. Istanza del Problema (Input)
Il grafo di partenza rappresenta tutte le connessioni possibili tra i nodi (punti di interesse ognuno con un valore di likeness). Ogni arco ha un costo di realizzazione e un valore di *likeness*.
![Grafo Iniziale](grafi_salvati/grafo_iniziale.png)
> *Didascalia: Grafo non orientato di input. La complessità del problema deriva dall'elevato numero di combinazioni possibili sotto un vincolo di budget pari al 40% del costo totale.*

### 2. Soluzione Intermedia (Approccio Greedy)
![Soluzione Greedy](grafi_salvati/greedy.png)
> *Didascalia: Esempio di soluzione sub-ottimale. L'algoritmo Greedy, pur garantendo la connessione, rimane intrappolato in un ottimo locale (Likeness: 129), non riuscendo a sfruttare appieno le potenzialità della rete.*

### 3. Soluzioni Ottime (Meta-euristiche)
Grazie all'implementazione di algoritmi stocastici e di ricerca in intorni ampi, è stato possibile raggiungere il "presunto" ottimo globale (Likeness: 154).

| Risultato GRASP | Risultato LNS |
| :---: | :---: |
| ![GRASP](grafi_salvati/grafo_finale_GRASP.png) | ![LNS](grafi_salvati/grafo_finale_LNS.png) |
| *Soluzione trovata tramite ricerca randomizzata.* | *Soluzione raffinata tramite Destroy & Repair.* |

### 4. Robustezza della Rete (Analisi Statistica)
L'istogramma seguente mostra quante volte ogni arco è stato selezionato durante le diverse iterazioni dell'algoritmo LNS.
![Analisi Frequenze](grafi_salvati/istogramma.png)
> *Didascalia: Gli archi con frequenza 100% rappresentano le "dorsali" fondamentali della rete ciclabile, ovvero quei collegamenti che risultano essenziali in ogni configurazione ad alta efficienza.*

---

## 🛠️ Tecnologie Utilizzate
* **Linguaggio:** Python
* **Librerie:** `NetworkX` (Teoria dei grafi), `Matplotlib` (Visualizzazione), `Numpy`.
* **Modellazione:** Grafi non orientati, vincoli di connessione e budget.

---

## 🔒 Nota sul Codice
*Per rispettare le policy accademiche e permettere il riutilizzo didattico del progetto, il codice sorgente e le istanze specifiche del problema sono mantenuti in un repository privato.*

---
*A.A. 2024/2025 - Corso di Ricerca Operativa*
