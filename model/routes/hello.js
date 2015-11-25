let greeting = [
  {
    // match a request for the key "greeting"
    route: "hello",
    // respond with a PathValue with the value of "Hello World."
    get: function() {
      return {path:["hello"], value: "Hello Falcor!"};
    }
  }
];

export default greeting;
