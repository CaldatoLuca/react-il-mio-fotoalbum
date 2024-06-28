# Webapp Fotoalbum

Creazione di una webapp che permetta al cliente (fotografo) di mostrare agli utenti le foto che ha scattato.

Il fotografo avrà una area di amministrazione dove:

- vedere tutte le foto inserite (anche quelle non 'visibili') e poterle filtrare
- vedere i dettagli di una foto
- aggiungere nuove foto
- modificarle
- cancellarle

## Backend

**Express.js**

- Prisma per la creazione del database
- Creare le rotte per le CRUD sulle foto
- validazioni
- Gestire le rotte con autenticazione

## Frontend

**React.js**

- homepage pubblica dove mostrare le foto 'visibili' all' utente
- filtrabili per titolo
- form di contatto dove inviare un messaggio assieme alla propria email (salvarlo sul db)
- pagine area amministrazione

TODO

- cliccando su una categoria ti apre una lista di foto con quella categoria
- modale per le delete
- in front pagine per categorie e cazzatine varie
