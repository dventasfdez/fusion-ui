import React, { useState } from "react";
import Modal from "./modal";
import ModalBody from "./modalBody";
import ModalFooter from "./modalFooter";
import ModalHeader from "./modalHeader";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";

const ModalTest: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div id="root">
      <button data-testid="modal-show-btn" onClick={() => setModalOpen(true)}></button>
      <Modal data-testid="modal-test" className="stepone-ui" open={modalOpen} onClose={() => setModalOpen(false)} hasIconClose={true} renderAsPortal>
        <ModalHeader>My Title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam libero hic dolorum veritatis, necessitatibus, neque suscipit autem nostrum repellat corporis nihil, a saepe est. Autem
          beatae sunt debitis quasi!
        </ModalBody>
        <ModalFooter>
          <button>Close Button</button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
const ModalWithoutTestId = () => (
  <Modal>
    <ModalHeader>My Title</ModalHeader>
    <ModalBody>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam libero hic dolorum veritatis, necessitatibus, neque suscipit autem nostrum repellat corporis nihil, a saepe est. Autem
      beatae sunt debitis quasi!
    </ModalBody>
    <ModalFooter>
      <button>Close Button</button>
    </ModalFooter>
  </Modal>
);

it("render Modal match snap without test ids", () => {
  const component = renderer.create(<ModalWithoutTestId />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Modal render when click button and close when click icon close ", () => {
  const { container, getByTestId } = render(<ModalTest />);
  const modalBtn = getByTestId("modal-show-btn");
  if (modalBtn) fireEvent.click(modalBtn);
  expect(getByTestId("modal-test")).toBeDefined();
  const closeModalBtn = getByTestId("modal-test-icon-close");
  if (closeModalBtn) fireEvent.click(closeModalBtn);
  expect(container.getElementsByClassName("tooltip").length).toBe(0);
});
