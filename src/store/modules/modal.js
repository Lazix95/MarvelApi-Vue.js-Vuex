const state = {
  modalOpened: false,
  modalData: {},
};

const mutations = {

  // Turn on modal
  openModal(state) {
    state.modalOpened = true;
  },

  // Turn off modal
  closeModal(state) {
    if (event.target.className == "modal" || event.target.className == 'close') {
      state.modalOpened = false;
    }
  },

  // Set modal data and turn modal on
  setModalData(state, data) {
    state.modalData = data;
    state.modalOpened = true;
  }
};

const getters = {

  // Returns modal open status
  modalState: state => {
    return state.modalOpened;
  },

  // Return modal data
  getModalData: state => {
    return state.modalData;
  }
};

const actions = {

  // Go forward to next hero on the list
  nextHero(context) {
    var next = context.getters.getData.map(item => item.id).indexOf(context.getters.getModalData.id);
    if (context.getters.getData[next + 1]) {
      context.commit("setModalData", context.getters.getData[next + 1]);
    }
  },

  // Go back
  perviusHero(context) {
    var next = context.getters.getData.map(item => item.id).indexOf(context.getters.getModalData.id);
    if (context.getters.getData[next - 1]) {
      context.commit("setModalData", context.getters.getData[next - 1]);
    }
  },
};

export default {
  state,
  mutations,
  getters,
  actions
}
