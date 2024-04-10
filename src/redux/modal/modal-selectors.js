const getIsModalAddTransaction = (state) =>
  state.global.isModalAddTransactionOpen;
const getIsModalLogout = (state) => state.global.isModalLogoutOpen;
const getIsLoading = (state) => state.global.isLoading;
const getIsEditModal = (state) =>
  state.global.isEditModalOpen;

const globalSelectors = {
  getIsModalAddTransaction,
  getIsModalLogout,
  getIsLoading,
  getIsEditModal,
};

export default globalSelectors;
