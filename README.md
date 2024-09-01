### eventapp_back

### 1 Cloner le projet

```bash
git clone https://github.com/bahaa-tohami/EventApp_back.git
```

### 2 Installation des dépendances

```bash
npm install
```

### 3 Créez un fichier .env à la racine de votre projet et ajoutez les variables d'environnement suivantes en mettant les valeurs correspondantes :

#### Configuration de la base de données
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

#### Configuration du serveur
PORT=

#### 4. Configuration de Mailtrap pour le test des emails
### Allez sur mailtrap.io et créez un compte. Choisir free test et selectionner node js. Récupérez les identifiant ci-dessous
HOST_EMAIL=sandbox.smtp.mailtrap.io
PORT_EMAIL=2525
MAILTRAP_USER=
MAILTRAP_PASS=

#### Configuration de JWT (JSON Web Token)
JWT_SECRET=
JWT_EXPIRES_IN=

#### URL du frontend
FRONTEND_URL=

### 5. Lancer le projet

```bash
npm start
```

