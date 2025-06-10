import { Dispatch, SetStateAction } from "react";
import { Descriptions, Modal } from "antd";
import { TLocation } from "../../types/TLocation";

type Props = {
  selectedStore: TLocation | null;
  setSelectedStore: Dispatch<SetStateAction<TLocation | null>>;
};

const StoreModal = ({ selectedStore, setSelectedStore }: Props) => {
  return (
    <Modal
      open={!!selectedStore}
      onCancel={() => setSelectedStore(null)}
      title={selectedStore?.name}
      footer={null}
      centered
      className="custom-modal"
    >
      {selectedStore && (
        <Descriptions
          bordered
          column={1}
          size="small"
          labelStyle={{ fontWeight: "bold" }}
        >
          <Descriptions.Item label="Street">
            {selectedStore.address?.street ?? "--"}
          </Descriptions.Item>
          <Descriptions.Item label="City">
            {selectedStore.address?.city ?? "--"}
          </Descriptions.Item>
          <Descriptions.Item label="Province">
            {selectedStore.address?.province ?? "--"}
          </Descriptions.Item>
          <Descriptions.Item label="Postal Code">
            {selectedStore.address?.postalCode ?? "--"}
          </Descriptions.Item>
          <Descriptions.Item label="Services">
            {selectedStore.services.slice(1, -1) ?? "--"}
          </Descriptions.Item>
          <Descriptions.Item label="Centrale">
            {selectedStore.centrale ?? "--"}
          </Descriptions.Item>
          <Descriptions.Item label="Orgcedi">
            {selectedStore.orgcedi ?? "--"}
          </Descriptions.Item>
          <Descriptions.Item label="Insegna">
            {selectedStore.insegna ?? "--"}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default StoreModal;
