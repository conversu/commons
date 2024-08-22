import * as MODULES from '../src/index';

describe('index', () => { 


    it('should export AES module', () => {
        expect(() => MODULES.AES).toBeDefined();
    })

    it('should export FORMAT module', () => {
        expect(() => MODULES.FORMAT).toBeDefined();
    })

    it('should export MASK module', () => {
        expect(() => MODULES.MASK).toBeDefined();
    })

    it('should export SAFETY_JSON module', () => {
        expect(() => MODULES.SAFETY_JSON).toBeDefined();
    })


    it('should export VALIDATE module', () => {
        expect(() => MODULES.VALIDATE).toBeDefined();
    })

});