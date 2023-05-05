import { graphql } from "../gql";
import { useGraphQL } from "../hooks/useGraphql";
import ReactFlow, { Node, Edge, Controls, ControlButton } from 'reactflow';

import 'reactflow/dist/style.css';
import '../styles/override_react_flow.scss'

import { Icon, Segment } from "semantic-ui-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditNode from "../components/flow/EditNode";
import { shallow } from 'zustand/shallow';

const GetWorkflow = graphql(`
    query GetWorkflow($id: String!) {
        workflow(id: $id) {
          id
          title
          nodes {
            id
            nodeType
            label
            description
            deletable
            position {
                x
                y
            }
          }
          edges {
            id
            label
            sourceId
            targetId
          }
        }
    }
`);

function CustomControls(props: { addNodeCallback: () => void }) {
    const handleAddNodeClick = () => {
        console.log("add new node handler");
        props.addNodeCallback();
    }

    return (
        <Controls
            showZoom={false}
        >
            <ControlButton onClick={handleAddNodeClick}>
                <Icon name='add square' />
            </ControlButton>
        </Controls>
    );
}

import useFlowStore, { FlowState } from '../stores/flowStore';

const selector = (state: FlowState) => ({
    nodes: state.nodes,
    edges: state.edges,
    initNodes: state.initNodes,
    initEdges: state.initEdges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    addEmptyNode: state.addEmptyNode,
    updateNode: state.updateNode,
});

const nodeTypes = { edit: EditNode };

function EditWorkflow() {
    let { workflowId } = useParams();

    const { data } = useGraphQL(GetWorkflow, { id: workflowId || "" });

    const {
        nodes,
        edges,
        initNodes,
        initEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addEmptyNode
    } = useFlowStore(selector, shallow);

    const mapNodeType = (nodeType: string) => {
        switch (nodeType) {
            case "INPUT": return "input"
            case "OUTPUT": return "output"
            default: return "edit"
        }
    }

    useEffect(() => {
        console.log(data);
        if (data) {
            const mappedNodes: Node[] = data.workflow.nodes.map(node => ({
                id: node.id,
                type: mapNodeType(node.nodeType),
                data: {
                    label: node.label,
                    description: node.description
                },
                deletable: node.deletable,
                position: {
                    x: node.position.x,
                    y: node.position.y,
                },
            }));
            initNodes(mappedNodes);

            const mappedEdges: Edge[] = data.workflow.edges.map(edge => ({
                id: edge.id,
                source: edge.sourceId,
                target: edge.targetId,
                label: edge.label,
                type: 'straight',
            }));
            initEdges(mappedEdges);
        } else {
            console.log("no workflow data: " + workflowId);
        }
    }, [data]);

    const handleAddNode = () => {
        addEmptyNode();
    }


    return (
        <Segment style={{ width: '50vw', height: '80vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
            >
                <CustomControls addNodeCallback={handleAddNode } />
            </ReactFlow>
        </Segment>
    );
}

export default EditWorkflow;