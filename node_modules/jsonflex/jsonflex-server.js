const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path').path;
const mkdirp = require('mkdirp');
const asleep = require('asleep');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({limit:'10000kb'});
require('./jsonflex.js');

module.exports = (options) => {

  let once, writing, defaults = {
    jsonDir: '/www/json',
    scriptUrl: '/jsonflex.js',
    saveUrl: '/json-save',
    loadUrlPrefix: '/json/'
  };
  options = Object.assign({}, defaults, options);
  options.jsonDir = path.join(appRoot, path.normalize(options.jsonDir));
  mkdirp(options.jsonDir);

  JSON._save = function(fileName, obj, replacer, space = '  '){
    fileName += fileName.substr(-5) != '.json' ? '.json' : '';
    fileName = path.join(options.jsonDir, fileName);
    return new Promise((resolve, reject) => {
      writing = true;
      fs.writeFile(
        fileName,
        JSON._stringify(obj, replacer, space),
        'utf8',
        (err) => {
          writing = false;
          err ? reject(err) : resolve({done:!err});
        }
      );
    });
  }

  JSON._load = function(fileName, reviver){
    fileName += fileName.substr(-5) != '.json' ? '.json' : '';
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(options.jsonDir, fileName),(err,data)=>{
        err ? reject(err) : resolve(JSON._parse(data,reviver));
      });
    });
  }

  let script = fs.readFileSync(path.join(__dirname,'jsonflex.js'), 'utf8');
  script = script.split('/json-save').join(options.saveUrl);
  script = script.split('/json/').join(options.loadUrlPrefix);

  function serveScript(req, res){
    res.header('content-type','application/javascript; charset=utf-8');
    res.end(script);
  }

  function saver(req, res){
    let fileName = req.body.fileName;
    fileName += fileName.substr(-5) != '.json' ? '.json' : '';
    fileName = path.join(options.jsonDir, fileName);
    writing = true;
    fs.writeFile(
      fileName,
      req.body.json,
      'utf8',
      (err) => {
        writing = false;
        res.status(err ? 500 : 200);
        res.json({done:!err,error:err});
      }
    );
  }

  return async (req, res, next) => {
    if(req.url.substr(-5) == '.json'){
      // avoid empty reads because of write lock
      while(writing){ await asleep(50); }
      next();
      return;
    }
    if(once){ next(); return; }
    req.app.post(options.saveUrl, jsonParser, saver);
    req.app.get(options.scriptUrl, serveScript);
    once = true;
    next();
  }

};
