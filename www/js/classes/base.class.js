// Global variable used in Base constructor
let objectMemory = [];

// A base class making rendering html from templates
// and event handling easy in all its subclasses
class Base {

  constructor(){
    // Set up eventhandling
    this.setupEventHandling();
    // Push every object created (also
    // from sublclasses) to objectMemory
    objectMemory.push(this);
  }

  // Return a html template
  // Will look for a method called
  // template + templateNo
  html(templateNo = ''){
    let method = 'template' + templateNo;
    if(!this[method]){ return; }
    let rendered = $(this[method]());
    // add an objectId
    rendered.attr('object-id', objectMemory.indexOf(this));
    // return rendered html
    return rendered.get(0).outerHTML;
  }

  // Render the result of calling html()
  // to the DOM
  render(selector,templateNo = ''){
    let rendered = this.html(templateNo);
    // if no selector see if we can find the
    // element in DOM and rerender it
    if(!selector){
      let myId = objectMemory.indexOf(this);
      $(`[object-id=${myId}]`).replaceWith(rendered);
    }
    else {
      // render it to a specific selector
      $(selector).html(rendered);
    }
  }

  // Global eventhandling
  setupEventHandling(){
    // only run this code once
    let lastEvent
    if(objectMemory.length === 0){
      $(document).on(
        // react on events on all elements in the DOM
        'click keyup mouseenter mouseleave change',
        '*',
        function(e){
          // stop propagation of the event to parent elements
          // (but only within our event handler)
          if(lastEvent === e){ return; }
          lastEvent = e;
          // e.type = type of event (click, keyup etc)
          // e.target = the element clicked
          let me = $(e.target);
          // find object-ids on this element
          // and its parent elements
          // (corresponding to a class instances)
          let objectInstances = [];
          let instancesByType = {};
          let elements = me.parents('[object-id]');
          if(me.attr('object-id')){
            elements = elements.add(me);
          }
          for (let el of elements){
            el = $(el);
            let objectId = el.attr('object-id') / 1;
            let object = objectMemory[objectId];
            let type = object.constructor.name;
            if(instancesByType[type]){
              let co = 2;
              while(instancesByType[type + co]){ co++; }
              type += co;
            }
            instancesByType[type] = object;
            objectInstances.push(object);

          }
          for(let objectInstance of objectInstances){
            // if we find an object and it has a method
            // with a name corresponding to the event
            // - call it with the element clicked as a parameter
            if(objectInstance && objectInstance[e.type]){
              objectInstance[e.type](me, instancesByType, e);
            }
          }
        }
      );
    }
  }

}