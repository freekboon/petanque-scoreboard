# Petanque Scoreboard

## Getting started
### Development database
* Make sure `mongodb` is installed locally.
```
mongo --version
```
* Create `data` folder in repository root.
```
mkdir data
```
* Start local mongo instance
```
mongod --dbpath=./data
```
* Add database uri to `.env` file
```
MONGODB_URI="mongodb://localhost:27017/ps-database"
```