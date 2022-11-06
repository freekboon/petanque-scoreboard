# Petanque Scoreboard

## Getting started
### Development database
* Make sure `mongodb` is installed locally:
```
mongo --version
```
* Create data folder: `./database/data`.
* Add database uri to `.env` file:
```
MONGODB_URI="mongodb://localhost:27017/ps-database"
```
* Create `games.json`, `players.json`, `teams.json` and `users.json` in `./database/migrate/data`.
* Start local mongo instance:
```
npm run mongo
```
* Run migration:
```bash
npm run reset
```
