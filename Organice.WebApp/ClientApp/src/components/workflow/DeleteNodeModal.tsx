import { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import useFlowStore from "../../stores/flowStore";

export interface DeleteNodeModalProps {
    id: string;
    title: string;
    trigger: React.ReactNode;
}

function DeleteNodeModal(props: DeleteNodeModalProps) {
    const [open, setOpen] = useState(false);

    const deleteNode = useFlowStore((s) => s.deleteNode);

    const handleOK = () => {
        setOpen(false);
        deleteNode(props.id);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={props.trigger}
        >
            <Modal.Header>Delete Node</Modal.Header>
            <Modal.Content>
                <p>
                    Do you really want to delte the Node {props.title}
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
                <Button
                    content="Delete"
                    labelPosition='right'
                    icon='trash'
                    onClick={handleOK}
                    negative
                />
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteNodeModal;