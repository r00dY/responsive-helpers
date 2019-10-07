import Jasmine from "jasmine";

let jasmine = new Jasmine();

// modify this line to point to your jasmine.json

global.__RANGES__ = {
    xs: 0,
    sm: 420,
    md: 992,
    lg: 1400,
    xl: 1920
};

jasmine.loadConfigFile("./spec/support/jasmine.json");
jasmine.execute();
