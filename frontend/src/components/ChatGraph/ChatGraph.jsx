import React from 'react'
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import './ChatGraph.css'
import MessageNode from "./MessageNode";
import { Position,MarkerType } from "reactflow";

const nodeTypes = {
    message: MessageNode,
};

const ChatGraph = ({messages}) => {

    const pairs = [];

    for(let i = 0; i < messages.length; i += 2){

        pairs.push({
            user:
                messages[i],

            assistant:
                messages[i + 1]
        });
    }

    const nodes = pairs.map((pair, index) => ({
    id: index.toString(),

    type: "message",

    position: {
        x: 0,
        y: index * 350,
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: {
        user:pair.user?.content,

        assistant:pair.assistant?.content,

    },
}));
    const edges =
    messages
        .slice(1)
        .map(
            (
                message,
                index
            ) => ({
                id:
                    `e${index}`,

                source:
                    
                        index.toString(),

                target:
                    (index+1).toString(),
            })
        );
  return (
    <ReactFlow
    nodes={nodes}
    edges={edges}
    nodeTypes={nodeTypes}
    fitView
    defaultEdgeOptions={{
    type: "smoothstep",

    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 40,
        height: 40,
    },
}}
/>
  )
}

export default ChatGraph