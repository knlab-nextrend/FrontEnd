import { useDispatch } from "react-redux";
import { setModal } from "../../Modules/modal";

export default function useModal() {

  const dispatch = useDispatch();

  const showModal = ({ modalType }) => {
    dispatch(setModal({ modalType }));
  };

  const hideModal = () => {
    dispatch(setModal(null));
  };

  return {
    showModal,
    hideModal,
  };
}

