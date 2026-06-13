import { Handle, Position } from "reactflow";

function MessageNode({ data }) {
    return (
        <div className="message-card">

            <Handle
                type="target"
                position={Position.Top}
            />

            <div className="message-role">
                {data.role}
            </div>

            <div className="message-content">
                {data.content}
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
            />

        </div>
    );
}

export default MessageNode;