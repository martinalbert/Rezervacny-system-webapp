# Rezervacny-system-webapp
Webová aplikácia pre VIS projekt

Check `documentation.pdf` for more info about architecture.\
[documentation](documentation.pdf)

## Installation

```bash
docker-compose up
```

## Usage

After docker container will successfully run.\
There is a [simple react app](http://localhost:3006) on port `3006` communicating with RESP API on port `3000`.

### Available logins:

username: `lor0001`\
password: `loremipsum`

### REST API Usage

Before accessing rest api on paths below, make sure you import Authorization header and Content-Type header set to application/json.

`OAuth Token` can be obtained by POST request to `/ubytovany/login`.

```
Authorization: Bearer OAUTH-TOKEN
Content-Type: application/json
```

### Available requests:

`GET`, `POST`, `PATCH`, `DELETE`

### Available routes:

`/ubytovany`\
`/rezervacie`\
`/izby`\
`/budovy`\
`/objednavky`\
`/poradovniky`\
`/zamestnanci`

These can be used alone like this:

| route         | description                            |
|:--------------|:---------------------------------------|
| `/ubytovany`  | returns an object of all residents     | 
| `/rezervacie` | returns an object of all reservations  |
| `/izby`       | returns an object of all rooms         |
| `/budovy`     | returns an object of all buildings     |
| `/objednavky` | returns an object of all orders        |
| `/poradovniky`| returns an object of all waiting lists |
| `/zamestnanci`| returns an object of all employees     |

#### Response example:

```json
{
    "count": "number of objects",
    "route": [
        {
            "_id": "id",
            "request": {
                "type": "GET",
                "url": "http://localhost:3000/{route}/{id}"
            }
        }
    ]

}
```

or

```json
{
    "count": "number of objects",
    "route": [
        {
            "returnedObject": {
                "_id": "id",
                "atribute1": "attribute1",
                "attribute2": "attribute2"
            },
            "request": {
                "type": "GET",
                "url": "http://localhost:3000/{route}/{id}"
            }
        }
    ]

}
```

Or can be used in conjunction with identifiers to retrieve the metadata for that identifier:

| route                         | description                                         |
|:------------------------------|:----------------------------------------------------|
| `/ubytovany/{ubytovanyID}`    | returns a resident represented by specified ID      |
| `/rezervacie/{rezervaciaID}`  | returns a reservation represented by specified ID   |
| `/izby/{izbaID}`              | returns a room represented by specified ID          |
| `/budovy/{budovaID}`          | returns a building represented by specified ID      |
| `/objednavky/{objednavkaID}`  | returns an order represented by specified ID        |
| `/poradovniky/{poradovnikID}` | returns a waiting list represented by specified ID  |
| `/zamestnanci/{zamestnanecID}`| returns an employee represented by specified ID     |

#### Response example:

```json
{
    "returnedObject": {
        "_id": "id",
        "atribute1": "attribute1",
        "attribute2": "attribute2"
    },
    "request": {
        "type": "GET",
        "url": "http://localhost:3000/{route}/{id}"
    }
}
```

#### Other routes:

| route                | description                       |
|:---------------------|:----------------------------------|
| `/ubytovany/login`   | returns an object of all residents |
| `/rezervacie/signup` | returns an object of all reservations |

#### Login Response example:

```json
{
    "message": "Auth Successful",
    "token": "OAuth Token",
    "userID": "ID"
}
```

#### SignUp Request Body example:

```json
{
    "email": "lor1111@vsb.cz",
    "meno": "Lorem",
    "priezvisko": "Ipsum",
    "login": "lor1111",
    "password": "test"
}
```

#### SignUp Response example:

```json
{
    "message": "Ubytovany created"
}
```