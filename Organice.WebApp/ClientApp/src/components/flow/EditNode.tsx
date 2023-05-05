import { memo } from 'react';
import { Handle, Position, NodeToolbar, useNodeId } from 'reactflow';
import { Button, Icon } from 'semantic-ui-react';
import EditWorkflowModal from '../workflow/EditWorkflowModal';
import DeleteNodeModal from '../workflow/DeleteNodeModal';

interface DataProps {
    label: string;
    description: string;
}

const EditNode = (props: { data: DataProps }) => {
    const { data } = props;
    const nodeId = useNodeId();

    return (
        <>
            <NodeToolbar isVisible={true} position={Position.Right}>
                <EditWorkflowModal
                    id={nodeId || ""}
                    title={data.label}
                    description={data.description}
                    trigger={
                        <Button icon size='tiny'>
                            <Icon name='edit' />
                        </Button>
                    }                   
                />
                <DeleteNodeModal
                    id={nodeId || ""}
                    title={data.label}
                    trigger={
                        <Button icon size='tiny'>
                            <Icon name='trash' />
                        </Button>
                    }   
                />
            </NodeToolbar>
            <div className=".react-flow__node-default" style={{ padding: '10px 20px' }}>{data.label}</div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
};

export default memo(EditNode);