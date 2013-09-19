
# IppEvents Services (via Node.js)

***

**IppEvents** est une application Web permettant de promouvoir des événements (conférences / ateliers / jeux sérieux / retours d'expérience).

Ce projet est la partie "back" du projet **IppEvents**, c'est lui qui permet de créer, d'accéder, de modifier des données.

Ce projet s'appuie sur [Node.js](http://nodejs.org/) pour la partie serveur et [MongoDB](http://www.mongodb.org/) pour la partie persistance.

Il est possible de faire appel à une base MongoDB locale ou sur un service 
d'hébergement dédié ; par exemple [mongolab](https://mongolab.com)

## 1. Environnement requis

1. Installer [Git](http://git-scm.com/)
2. Installer [Node.js](http://nodejs.org/)
3. Installer [MongoDB](http://www.mongodb.org/) pour utiliser une base locale

#### 1.1.3. Espace de travail

Créer un espace de travail. Pour simplifier la suite, celui-ci se situera ~/workspace

## 2. Installation du projet

#### 1. Récupérer les sources

En ligne de commande, se positionner au bon endroit

	cd ~/workspace
	
Récupérer les sources du repository GitHub

	git clone https://github.com/ippontech/ippevents-services-node.git


#### 2. Récupérer les dépendances

Se positioner dans le répertoire créé

	cd ~/workspace/ippevents-services-node

S'assurer d'être ok au niveau des dépendances Node.js

	sudo npm install
	
#### 3. Démarrer MongoDB (pour utiliser une base locale)

Démarrer la base

*Linux*
	
	sudo service mongodb start
	
*Mac*
	
	mongod
	
#### 4. Démarrer le serveur Node.js

Dans une nouvelle fenêtre, se positioner dans le répertoire approprié

	cd ~/workspace/ippevents-services-node
	
Démarrer le serveur Node.js (Express)

	node server.js

S'assurer que le [service "Members" est opérationnel](http://localhost:3000/members) et si il n'y a malheureusement aucun membre de votre base de données, c'est qu'il est temps d'installer la [partie "front" du projet](https://github.com/ippontech/ippevents-front-node) ;)
