import React, { ChangeEvent, useState } from "react"
import { Button, Form, Input, Modal, TextArea } from "semantic-ui-react"
import useFlowStore from "../../stores/flowStore";

export interface EditWorkflowModalProps {
    id: string;
    title: string;
    description: string;
    trigger: React.ReactNode;
}

function EditWorkflowModal(props: EditWorkflowModalProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const updateNode = useFlowStore((s) => s.updateNode);

    const handleOK = () => {
        setOpen(false);
        updateNode(props.id, title, description);
        console.log("OK");
    }

    const handleCancel = () => {
        setOpen(false);
        console.log("Cancel");
    }

    const changedTitle = (event: ChangeEvent<HTMLInputElement>, data: object) => {
        console.log(event.currentTarget.value);
        setTitle(event.currentTarget.value);
    }

    const changedDescription = (event: ChangeEvent<HTMLTextAreaElement>, data: object) => {
        console.log(event.currentTarget.value);
        setDescription(event.currentTarget.value);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={props.trigger}
        >
            <Modal.Header>Edit Node</Modal.Header>
            <Modal.Content>
                <Form>
                    <Input
                        fluid
                        placeholder='Title'
                        value={title}
                        onChange={changedTitle}
                    />
                    <TextArea
                        placeholder='Description for the step using Markdown'
                        rows={5}
                        value={description}
                        onChange={changedDescription}
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={handleCancel}>
                    Cancel
                </Button>
                <Button
                    content="Save"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleOK}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default EditWorkflowModal;