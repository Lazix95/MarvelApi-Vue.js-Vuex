const state = {
  modalOpened: false,
  modalData: {},
};

const mutations = {
  openModal(state) {
    state.modalOpened = true;
  },
  closeModal(state) {
    if (event.target.className == "modal" || event.target.className == 'close') {
      state.modalOpened = false;
    }
  },
  setModalData(state, data) {
    state.modalData = data;
    state.modalOpened = true;
  }
};

const getters = {
  modalState: state => {
    return state.modalOpened;
  },
  getModalData: state => {
    return state.modalData;
  }
};

const actions = {
  nextHero(context) {
    var next = context.getters.getData.map(item => item.id).indexOf(context.getters.getModalData.id);
    if (context.getters.getData[next + 1]) {
      context.commit("setModalData", context.getters.getData[next + 1]);
    }
  },
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
