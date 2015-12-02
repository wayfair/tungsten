'use strict';

var processProperties = require('../../../src/template/process_properties');
var Autofocus = require('../../../src/template/hooks/autofocus');

describe('process_properties.js public API', function() {
  describe('processProperties', function() {
    it('should be a function', function() {
      expect(processProperties).to.be.a('function');
    });
    it('should treat all properties of elements with namespaces (usually SVG) as attributes', function() {
      var result = processProperties({namespace: 'Test', label: 'label', class: 'js-test'});
      expect(result).to.be.a('object');
      expect(result.namespace).to.equal('Test');
      expect(result.attributes).to.deep.equal({namespace: undefined, label: 'label', class: 'js-test'});
    });
    it('should use hooks when enabled', function() {
      var result = processProperties({Autofocus: true}, {useHooks: true});
      expect(result.attributes.Autofocus).to.deep.equal(new Autofocus());
    });
    it('should transform attribute names to property names when appropriate', function() {
      var result = processProperties({class: 'js-test'});
      expect(result.className).to.equal('js-test');
      expect(result.class).to.equal(undefined);
    });
    it('should parse style tags into CSS rules', function() {
      var resultFromString = processProperties({style: 'color: orange; text-align: center;'});
      expect(resultFromString.style).to.deep.equal({cssText: 'color: orange; text-align: center;'});
      var resultFromObj = processProperties({style: {color: 'orange', 'text-align': 'center'}});
      expect(resultFromObj.style).to.deep.equal({color: 'orange', 'text-align': 'center'});
    });
  });
});
