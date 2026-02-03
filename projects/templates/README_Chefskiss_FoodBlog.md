# *CHEF'S KISS WEBAPP*
![homepage](src/main/resources/static/img/homepageScreen.png "Homepage")

Questo progetto è una piattaforma web dedicata agli appassionati di cucina e ristorazione.

La piattaforma mira a fornire un sistema completo per la gestione delle recensioni, la condivisione di ricette culinarie e la gestione delle prenotazioni presso i ristoranti, con l'ausilio di un database che traccia piatti, utenti, ristoranti, sedi e relative prenotazioni.

Gli utenti possono accedere o registrarsi al sistema selezionando uno o più ruoli, ciascuno dei quali offre funzionalità specifiche:

- **Privato**: Gli utenti privati possono registrare uno username (visualizzato nei post delle ricette) e una foto profilo. Possono pubblicare ricette e valutare quelle postate da altri utenti.


- **Cliente**: Dopo aver pubblicato un certo numero di recensioni, i clienti possono essere elevati al rango di "recensore affidabile". I clienti verificati possono recensire i ristoranti che hanno visitato, prenotare tavoli presso le sedi dei ristoranti, modificare o annullare le prenotazioni.


- **Chef**: Gli chef possono registrare una foto profilo e un curriculum delle loro attività nel settore della ristorazione. Possono proporre piatti e eventualmente servirli in una o più sedi di un ristorante in cui lavorano.


- **Ristoratore**: I ristoratori possono registrare e gestire uno o più ristoranti. Se il ristorante fa parte di una catena, possono gestire tutte le sedi associate, visualizzare le informazioni e gestire il personale, inclusi gli chef.
  
![pasta al pesto](src/main/resources/static/img/recipeScreen.png "Pasta al pesto")

Inoltre tutti gli utenti, compresi quelli non registrati, possono ricercare ricette per nome, valutazioni medie, ingredienti e allergeni e ricercare ristoranti e le loro sedi, visualizzare i rispettivi menu, e filtrare i risultati in base a valutazioni o città.

## CI / CD, Testing e Container

Il repository contiene una pipeline GitHub Actions che compila il progetto, produce il file WAR, costruisce e pubblica un'immagine Docker; i test di integrazione ed end-to-end sono implementati con Testcontainers e Selenium e sono presenti i plugin per generare report (Surefire, JaCoCo).

Panoramica
- Il repository contiene una pipeline GitHub Actions che compila il progetto, produce l’artifact `.war`, costruisce e pubblica un’immagine Docker e conserva i report di test.
- Sono presenti in progetto configurazioni per generare report di coverage (JaCoCo) e diverse classi di test end-to-end basate su Selenium e Testcontainers.
- Esiste un Dockerfile per l’applicazione e i test di integrazione E2E usano immagini/container dinamici creati tramite Testcontainers.

Cosa fa effettivamente la pipeline (in sintesi)
- Trigger: workflow manuale (workflow_dispatch) e trigger automatici su push/pull_request del ramo `develop`.
- Fasi implementate nel job "build":
  - checkout del codice e setup JDK 17 (Temurin)
  - build Maven (viene eseguito `mvn -B clean verify surefire-report:report-only`)
  - upload e download dell’artifact `.war` prodotto (target/chefsKiss-0.0.1-SNAPSHOT.war)
  - login a Docker Hub (usa secrets) e build + push dell’immagine Docker dell’app
  - upload dei report (Surefire & JaCoCo) come artifact del workflow
- Job "deploy":
  - pensato per esecuzione su runner self-hosted: effettua un `docker compose build` e `docker compose up -d` per avviare i servizi (script PowerShell incluso nel workflow).
  - scarica i report JaCoCo caricati dal job di build.

Config e strumenti presenti nel progetto
- Maven: plugin e dipendenze per test e report
  - JaCoCo configurato (jacoco-maven-plugin) per generare coverage report.
  - Maven Surefire (test unitari) e Surefire report plugin configurati.
- Docker:
  - Dockerfile che costruisce immagine Tomcat e copia il .war in ROOT.war (porta 8080 esposta).
  - Il Dockerfile è usato dalla pipeline e viene anche referenziato dai test Testcontainers.
- Testcontainers & Selenium:
  - I test E2E usano Testcontainers per creare:
    - un container DB (immagine personalizzata: `davidenegri01/chefskiss_db:latest`) con alias `database`
    - un container webapp (creato via ImageFromDockerfile) che monta il Dockerfile e il .war
    - un container browser (selenium/standalone-chrome / BrowserWebDriverContainer) per eseguire WebDriver remoto
  - I test usano `RemoteWebDriver` per connettersi al browser contenitorizzato e verificare flussi come login, lista piatti e prenotazioni.

Stato operativo e limitazioni rilevate
- Infrastruttura automatica: presente e funzionante a livello di configurazione (workflow, build, image build/push).
- Test E2E: la struttura è pronta e molti test sono implementati; tuttavia
  - alcuni test/metodi/linee sono commentati o contrassegnati con `@Disabled` — potrebbero non essere eseguiti automaticamente;
  - nel workflow alcuni step relativi all’esecuzione separata delle integration test (Failsafe) sono commentati.
- Artefatto `.war`: il workflow produce e carica il war come artifact; il Dockerfile e i Testcontainers si aspettano quel war nella posizione `target/`.
- Runner deploy: il job di deploy richiede un runner self-hosted con Docker & Docker Compose configurati; non è un deploy automatico su un servizio cloud (a meno che non si fornisca tale runner).