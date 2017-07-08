# speakeasy
Event-based chat app



HOW TO SET UP MONGODB ON LOCAL COMPUTER:

1. Use brew to install mongodb
```bash
brew install mongodb
```
2. Make /data/db folder for mongodb to store data
```bash
mkdir -p /data/db
```
You may not have permission to make this folder, in which case:
```bash
sudo mkdir /data
sudo mkdir /data/db
```
3. Apply permission to use /data/db folder
```bash
sudo chmod -R 777 /data/db
sudo chown -R `id -u` /data/db
```
4. Start running mongodb in terminal
```bash
brew services start mongodb
mongo
```