(() => {

  let mem, pathMem, base, classes = {};

  function val(obj, path, val){
    let get = val === undefined;
    path = path.replace(/\[(\d)\]/g,'.$1');
    path = path.split('.');
    path.shift();
    while(path.length > (get ? 0 : 1)){
      obj = obj[path.shift()];
    }
    if(get){ return obj; }
    obj[path.shift()] = val;
  }

  function recurser(obj, revive = false, path = ''){

    if(
      !obj || typeof obj != 'object'
      || obj instanceof Boolean
      || obj instanceof Date
      || obj instanceof Number
      || obj instanceof RegExp
      || obj instanceof String
    ){
      return obj;
    }

    if(!path){
      base = obj;
      mem = [];
      pathMem = [];
    }

    if(!revive && classes[obj.constructor.name]){
      obj['⚙'] = obj.constructor.name;
    }

    if (revive && obj['⚙']) {
      if(revive == 'hard' && classes[obj['⚙']]){
        let instance = new classes[obj['⚙']]();
        Object.assign(instance, obj);
        val(base, path, instance);
        delete instance['⚙'];
      }
      else {
        delete obj['⚙'];
      }
    }

    if(revive && obj.hasOwnProperty('↻')){
      val(base, path, val(base, obj['↻']));
    }

    let index = mem.indexOf(obj);
    if(index >= 0){
      val(base, path, {'↻':'$' + pathMem[index]});
      return;
    }
    mem.push(obj);
    pathMem.push(path);

    if(obj.constructor === Array){
      for(let i = 0; i < obj.length; i++){
        recurser(obj[i], revive, `${path}[${i}]`);
      }
    }
    else if(typeof obj == 'object') {
      for(let i in obj){
         recurser(obj[i], revive, `${path}.${i}`);
      }
    }

  }

  function serverLoad(path, reviver){

  }

  function serverSave(fileName, obj, replacer, space){

  }

  JSON._stringify = (obj, replacer, space = '  ')=>{
    recurser(obj);
    let result = JSON.stringify(obj, replacer, space);
    recurser(obj, true);
    return result;
  }

  JSON._parse = (str, reviver) => {
    let obj = JSON.parse(str, reviver);
    recurser(obj, 'hard');
    return obj;
  }

  JSON._classes = (...args) => {
    for(let i of args){
      classes[i.name] = i;
    }
  }

  JSON._load = (url, reviver) => {
    url += url.substr(-5) != '.json' ? '.json' : '';
    url = '/json/' + url;
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON._parse(xhr.responseText, reviver));
          } else {
            reject(xhr.statusText);
          }
        }
      };
      xhr.onerror = function (e) {
        reject(xhr.statusText);
      };
      xhr.send(null);
    });
  }

  JSON._save = (fileName, obj, replacer, space = '  ') => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", '/json-save', true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onreadystatechange = () => {
        if(xhr.readyState == XMLHttpRequest.DONE){
          xhr.status == 200 ? resolve() : reject()
        }
      };
      xhr.send(JSON.stringify(
        {fileName:fileName, json: JSON._stringify(obj, replacer, space)}
      ));
    });
  }

})();