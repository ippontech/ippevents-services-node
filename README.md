
# IppEvents Services
(via Node.js / MongoDB)

***

**IppEvents** est une application Web permettant de promouvoir des événements (conférences / ateliers / jeux sérieux / retours d'expérience).

Ce projet est la partie "back" du projet **IppEvents**, c'est lui qui permet de créer, d'accéder, de modifier des données.

Ce projet s'appuie sur [Node.js](http://nodejs.org/) pour la partie serveur et [MongoDB](http://www.mongodb.org/) pour la partie persistance.

Il est possible de faire appel à une base MongoDB locale ou sur un service 
d'hébergement dédié ; par exemple [mongolab](https://mongolab.com)

***

## Tests unitaires avec Jasmine

1. lancer la tâche grunt : grunt test


***

## 1. Environnement requis

### 1.1. Installations requises

1. Installer [Git](http://git-scm.com/)
2. Installer [Node.js](http://nodejs.org/)
3. Installer [MongoDB](http://www.mongodb.org/) pour utiliser une base locale

### 1.2. Espace de travail

Créer un espace de travail. Pour simplifier la suite, celui-ci se situera ~/workspaces

## 2. Installation du projet

### 2.1. Récupérer les sources

En ligne de commande, se positionner au bon endroit

	cd ~/workspaces
	
Récupérer les sources du repository GitHub

	git clone https://github.com/ippontech/ippevents-services-node.git


### 2.2. Récupérer les dépendances

Se positioner dans le répertoire créé

	cd ~/workspaces/ippevents-services-node

S'assurer d'être ok au niveau des dépendances Node.js

	sudo npm install
	
### 2.3. Démarrer MongoDB (pour utiliser une base locale)

Démarrer la base

*Linux*
	
	sudo service mongodb start
	
*Mac*
	
	mongod
	
### 2.4. Démarrer le serveur Node.js

Dans une nouvelle fenêtre, se positioner dans le répertoire approprié

	cd ~/workspaces/ippevents-services-node
	
Démarrer le serveur Node.js (Express)

	node server.js

S'assurer que le [service "Members" est opérationnel](http://localhost:3000/members) et si il n'y a malheureusement aucun membre de votre base de données, c'est qu'il est temps d'installer la [partie "front" du projet](https://github.com/ippontech/ippevents-front-node) ;)
