import Modal from "react-modal";

Modal.setAppElement("#root");

function DynamicModal({ width, height, top, bottom, isOpen, onRequestClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          width: width ?? "100%",
          height: height ?? "40%",
          top: top ?? "20%",
          left: "50%",
          right: "auto",
          bottom: bottom ?? "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#170F28"
        },
        overlay: {
          backgroundColor: "rgba(23, 15, 40, 0.8)"
        }
      }}
    >
      {children}
    </Modal>
  );
}

export default DynamicModal;
