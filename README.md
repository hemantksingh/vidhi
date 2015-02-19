# vidhi

A Node.js web app using [Express 4](http://expressjs.com/). Provisions a clean Ubuntu 12.04 32-bit server instance with the needed Node.js development tools (Node.js, git, vim); services (MongoDB, GitHub, Heroku).

### Running on the locally provisioned VM

Install Vagrant https://www.vagrantup.com/ and VirtualBox https://www.virtualbox.org/wiki/Downloads.

```sh
$ git clone git@github.com:hemantksingh/vidhi.git # or clone your own fork
$ cd vidhi
$ vagrant up
$ vagrant ssh
$ cd /vagrant
$ sudo service mongodb start
$ npm install
$ npm start
```

Your app should now be running on [localhost:4000](http://localhost:4000/).

### Networking
Configured for private network on static IP: 192.168.33.10, with port :4000 forwarded.

So from a web browser you have two ways of accessing a node.js process for example running on port 3000 on the VM:

* ```localhost:4000```
* ```192.168.33.10:4000```

Additionally for convenience, append this line to your /etc/hosts file:

```192.168.33.10 vagrant.localhost```

### GitHub

```
ssh-keygen -t rsa
(Copy the contents of ~/.ssh/id_rsa.pub into your GitHub account: https://github.com/settings/ssh)
git config --global user.name '<your name>'
git config --global user.email <your email>
```

### Heroku

Run the following commands to finish setting up Heroku:
```
$ heroku login
$ heroku keys:add
```

Deploy to Heroku
```
$ heroku create
$ git push heroku master
$ heroku open
```

### Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
