import {default as chai, expect} from 'chai';
import React from 'react';
import chaiLint from 'chai-lint';

import KBox from "sumo/js/kbox.js";

chai.use(chaiLint);

describe('kbox', () => {
  describe('declarative', () => {
    let $kbox, kbox;

    beforeEach(() => {
      let sandbox = (
        <div id="sandbox">
          <div className="kbox"
               data-title="ignored title"
               title="test kbox"
               data-target="#sandbox a.kbox-target"
               data-modal="true">
            <p>lorem ipsum dolor sit amet.</p>
          </div>
          <a href="#" className="kbox-target">click me</a>
        </div>
      );
      React.render(sandbox, document.body);

      $kbox = $('.kbox');
      kbox = new KBox($kbox);
    });

    afterEach(() => {
      React.unmountComponentAtNode(document.body);
    });

    it('should open when the target is clicked', () => {
      $('.kbox-target').click();
      expect($('.kbox-container').hasClass('kbox-open')).to.beTrue();
    });

    it('should open programmatically', () => {
      kbox.open();
      expect($('.kbox-container').hasClass('kbox-open')).to.beTrue();
    });

    it('should close programmatically', () => {
      kbox.close();
      expect($('.kbox-container').hasClass('kbox-open')).to.beFalse();
    });

    it('should have the right title', () => {
      kbox.open();
      expect($('.kbox-title').text()).to.equal('test kbox');
    });

    it('should have a modal overlay', () => {
      expect($('#kbox-overlay').length).to.equal(0);
      kbox.open();
      expect($('#kbox-overlay').length).to.equal(1);
    });

    it('destroy should clean up the container', () => {
      kbox.open();
      expect($('.kbox-container').length).to.equal(1);
      kbox.destroy();
      expect($('.kbox-container').length).to.equal(0);
    });
  });
});
