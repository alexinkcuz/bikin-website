'use babel';

import BuatWebsiteView from './buat-website-view';
import { CompositeDisposable } from 'atom';

export default {

  buatWebsiteView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.buatWebsiteView = new BuatWebsiteView(state.buatWebsiteViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.buatWebsiteView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'buat-website:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.buatWebsiteView.destroy();
  },

  serialize() {
    return {
      buatWebsiteViewState: this.buatWebsiteView.serialize()
    };
  },

  toggle() {
    console.log('BuatWebsite was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
