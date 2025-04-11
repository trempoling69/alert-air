# 🌍 API Conseil sur l'air à lyon – Documentation

Cette API regroupe des services liés à l'environnement, la qualité de l'air, la météo et le pollen. Elle centralise les appels aux services externes (Google, Atmo, Meersens) et expose des routes pour consulter ou enrichir les données en base.

---

## 🔌 Services intégrés

### 🔹 `GoogleService`

Ce service permet de communiquer avec l’API Google pour récupérer **les données météo en temps réel**.  
Utilisé principalement pour enrichir la base avec les conditions météorologiques quotidiennes.

---

### 🔹 `AtmoService`

Ce service interagit avec l’API Atmo afin de **collecter les données de pollution de l’air**.  
Il permet d’obtenir les concentrations de différents polluants (CO, NO2, O3, etc.) avec leurs unités.

---

### 🔹 `MeersensService`

Ce service appelle l’API Meersens pour **récupérer en direct les données de pollen**.  
Chaque type de pollen est accompagné d’un seuil de concentration.

---

## 📡 Routes exposées

---

### `GET /meteo-observation-lyon`

#### Description :

Récupère toutes les données météo stockées dans la base.

#### Query Params (facultatifs) :

| Paramètre   | Type     | Description                                  |
| ----------- | -------- | -------------------------------------------- |
| `startDate` | `string` | Date de début au format ISO (ex: 2024-04-01) |
| `endDate`   | `string` | Date de fin au format ISO                    |

#### Exemple :

```
GET /meteo-observation-lyon?startDate=2025-04-01&endDate=2025-04-10
```

---

### `GET /pollen-bulletin`

#### Description :

Retourne les données de pollen enregistrées en base.

#### Query Params (facultatifs) :

| Paramètre     | Type     | Description             |
| ------------- | -------- | ----------------------- |
| `startDate`   | `string` | Date de début (ISO)     |
| `endDate`     | `string` | Date de fin (ISO)       |
| `designation` | `string` | Nom du pollen à filtrer |

Les designations sont basé sur cette enumération :

```js
{
  ALDER = 'Aulne',
  ASH = 'Frêne',
  BIRCH = 'Bouleau',
  COTTONWOOD = 'Peuplier',
  ELM = 'Orme',
  MAPLE = 'Erable',
  OLIVE = 'Olivier',
  JUNIPER = 'Genévrier',
  OAK = 'Chêne',
  PINE = 'Pin',
  CYPRESS_PINE = 'Cyprès',
  HAZEL = 'Noisetier',
  GRAMINALES = 'Graminées',
  RAGWEED = 'Ambroisie ',
  MUGWORT = 'Armoise',
}
```

#### Exemple :

```
GET /pollen-bulletin?startDate=2025-04-01&designation=BIRCH
```

---

### `GET /pollution-data`

#### Description :

Renvoie les données de pollution de l’air présentes en base.

#### Query Params (facultatifs) :

| Paramètre   | Type     | Description                |
| ----------- | -------- | -------------------------- |
| `startDate` | `string` | Date de début (ISO)        |
| `endDate`   | `string` | Date de fin (ISO)          |
| `type`      | `string` | Code du polluant à filtrer |

Code polluant principaux :
| Polluant | Code |
|----------|------|
| NO | 02 |
| PM10 | 24 |
| PM2.5 | 39 |
| NO2 | 03 |
| CO | 04 |
| BC | G6 |
| Plomb | 19 |

#### Exemple :

```
GET /pollution-data?type=03&startDate=2025-04-01
```

---

### `GET /info-message`

#### Description :

Cette route retourne un **message de recommandation personnalisé** pour chaque type de pollen.  
Les recommandations sont basées sur :

- la quantité de pollen détectée,
- les conditions météo actuelles.

#### Exemple :

```
GET /info-message
```

#### Réponse possible :

```json
[
  {
    "date": "aujourd’hui",
    "designation": "Aulne",
    "quantite": 0.09,
    "vent_moyen": 5.5,
    "precipitation_mm": 0,
    "temperature_moy": 13,
    "messages": ["Aucun facteur aggravant détecté aujourd’hui."]
  },
  {
    "date": "aujourd’hui",
    "designation": "Bouleau",
    "quantite": 63.94,
    "vent_moyen": 5.5,
    "precipitation_mm": 0,
    "temperature_moy": 13,
    "messages": [
      "Le taux de pollen est élevé, attention aux réactions allergiques possibles."
    ]
  }
]
```

---

## ⏰ Mise à jour des données

### 🔹 `Meteo`

Les données météo sont mise à jour tous les jours à minuit via une tache CRON qui fetch l'api de google et insère dans la base des donnéees les informations

### 🔹 `Pollen`

Les données de pollen sont mise à jour tous les jours à minuit pas une tache CRON qui fetch l'api de Meersens et insère les données en base de données

### 🔹 `Pollution`

Les données pollution sont mise à jour via l'api Atmo qui est fetch tous les jours à minuit via une tache CRON et qui insère les éléments en base de données