import create from 'zustand';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';
import ObjectID from 'bson-objectid';

export type FlowState = {
    nodes: Node[];
    edges: Edge[];
    initNodes: (nodes: Node[]) => void;
    initEdges: (edges: Edge[]) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addEmptyNode: () => void;
    updateNode: (nodeId: string, title: string, description: string) => void;
    deleteNode: (nodeId: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useFlowStore = create<FlowState>((set, get) => ({
    nodes: [],
    edges: [],
    initNodes: (nodes: Node[]) => {
        set({
            nodes: nodes,
        })
    },
    initEdges: (edges: Edge[]) => {
        set({
            edges: edges,
        })
    },
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    addEmptyNode: () => {
        const id = new ObjectID();
        set({
            nodes: [
                ...get().nodes,
                {
                    id: id.toString(),
                    data: {
                        label: 'New',
                        description: ''
                    },
                    type: "edit",
                    position: {
                        x: 0,
                        y: 0,
                    },
                }
            ]
        })
    },
    updateNode: (nodeId: string, title: string, description: string) => {
        console.log("Update node " + nodeId + " title " + title + " desc " + description);

        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    // it's important to create a new object here, to inform React Flow about the changes
                    node.data = {
                        ...node.data,
                        label: title,
                        description: description,
                    };
                }

                return node;
            })
        });
    },
    deleteNode: (nodeId: string) => {
        console.log("Delete node " + nodeId);
        const nodeIndex = get().nodes.findIndex(n => n.id === nodeId);
        if (nodeIndex !== -1) {
            set({
                nodes: [
                    ...get().nodes.slice(0, nodeIndex),
                    ...get().nodes.slice(nodeIndex+1)
                ]
            });
        } else {
            console.error(`can not delete node ${nodeId}`);
        }
    }
}));

export default useFlowStore;