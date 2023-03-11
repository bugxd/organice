import { graphql } from "../gql";
import { useGraphQL } from "../hooks/useGraphql";
import ReactFlow, { useEdgesState, useNodesState, Node, Edge } from 'reactflow';

import 'reactflow/dist/style.css';
import { Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

function EditWorkflow() {
    let { workflowId } = useParams();

    const { data } = useGraphQL(GetWorkflow, { id: workflowId || "" })
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        console.log(data);
        if (data) {
            const mappedNodes: Node[] = data.workflow.nodes.map(node => ({
                id: node.id,
                type: node.nodeType.toLocaleLowerCase(),
                data: {
                    label: node.label,
                },
                deletable: node.deletable,
                position: {
                    x: node.position.x,
                    y: node.position.y,
                },
            }));
            setNodes(mappedNodes);

            const mappedEdges: Edge[] = data.workflow.edges.map(edge => ({
                id: edge.id,
                source: edge.sourceId,
                target: edge.targetId,
                label: edge.label,
                type: 'straight',
            }));
            setEdges(mappedEdges);
        } else {
            console.log("no workflow data: " + workflowId);
        }
    }, [data]);


    return (
        <Segment style={{ width: '50vw', height: '80vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
            />
        </Segment>
    );
}

export default EditWorkflow;