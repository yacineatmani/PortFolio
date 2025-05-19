# 🎓 Projet Portfolio – **“Mon Portfolio Développeur Fullstack”**

---

## 🎯 Objectif

Développer un **portfolio professionnel complet** en **React (frontend)** et **Laravel (backend API REST)** pour présenter son profil de **développeur fullstack**, ses **projets**, ses **compétences**, et son **parcours**.
Ce projet servira de **vitrine personnelle** : il doit être propre, moderne, structuré et prêt à être partagé à un recruteur.

---

## 🧠 Compétences mises en avant

* Architecture d’une application **fullstack moderne**
* Développement d’un **backend API RESTful** (Laravel + Eloquent/ utilisation de Inertia possible)
* Utilisation des **relations et clés étrangères**
* Création d’une **SPA réactive avec React**
* Intégration frontend/backend via Axios
* Gestion de formulaires, images, et mise en page responsive
* Bonnes pratiques de développement (validation, sécurité, code propre)
* Versioning (Git), documentation et (si possible) déploiement

---

## 🧱 Spécifications fonctionnelles

### ⚙️ Backend (Laravel)

#### Modèles à implémenter :

* **User** : nom, prénom, bio, photo, email (admin uniquement si auth)
* **Project** : titre, description, lien GitHub, lien démo, image, id\_user (FK)
* **Skill** : nom, niveau (ex: débutant, confirmé), id\_user (FK)
* **Experience** *(optionnel)* : titre, entreprise, date début/fin, description, id\_user (FK)

#### Relations :

* Un **user** possède plusieurs **projects**
* Un **user** possède plusieurs **skills**
* Un **user** possède plusieurs **experiences**

#### Routes API RESTful (exemples) :

* `GET /api/projects` → liste des projets
* `POST /api/projects` → ajouter un projet
* `GET /api/skills` → liste des compétences
* `GET /api/user` → infos personnelles

#### Bonus :

* Authentification avec Laravel Sanctum (admin)
* Upload d’images (photo de profil, projet)
* Middleware pour protéger les routes d’édition

---

### 💻 Frontend (React)

#### Pages à développer :

* **Accueil** : photo, nom, phrase d’accroche, lien CV
* **À propos** : bio, parcours, compétences (avec niveau)
* **Projets** : galerie de projets avec détails
* **Contact** : formulaire de contact (mock ou réel via API)
* **(Admin)** : interface pour ajouter / modifier projets et compétences (facultatif)

#### Fonctionnalités :

* Appels API pour récupérer et afficher les données
* Utilisation de composants dynamiques et réutilisables
* Responsive design (desktop / mobile)
* Filtrage ou tri de projets (par techno, année…)

---

## 🛠 Technologies recommandées

* **Backend** : Laravel 12, Eloquent ORM, MySQL 
* **Frontend** : React, Axios (si non-utilisation de Inertia), React Router, TailwindCSS (ou CSS/Bootstrap)
* **Outils** : Git, GitHub, Postman

---

## 📂 Livrable attendu

* 🎯 **Un projet portfolio hébergé ou clonable**, divisé en :

  * `/frontend` → app React
  * `/backend` → API Laravel
* 📝 **README** bien rédigé avec :

  * Présentation
  * Stack utilisée
* ✅ Code propre, structuré, commenté, versionné avec Git

---

## 🚀 Objectif final

Chaque étudiant repart avec **son propre site portfolio** :

* Fonctionnel et dynamique (données depuis base Laravel)
* Facile à mettre à jour
* Personnalisé avec ses **projets**, **compétences**, **photo**, etc.
* Déployé ou prêt à l’être
* À ajouter dans un CV ou sur LinkedIn

---

## ✨ Bonus pour aller plus loin

* Interface d’**administration privée**
* Formulaire de contact réel (avec mail)
* Dark mode / animations
* Section "témoignages", "certifications", "blog", etc.

---
