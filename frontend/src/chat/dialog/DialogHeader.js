import React from "react";

export function DialogHeader(props) {
    return <div className="py-2 px-4 border-bottom d-none d-lg-block">
        <div className="d-flex align-items-center py-1">
            <div className="position-relative">
                <img src={props.avatarSrc}
                     className="rounded-circle me-1" alt={props.name} width="40"
                     height="40"/>
            </div>
            <div className="flex-grow-1 ps-3">
                <strong>{props.name}</strong>
                <div className="text-muted small"><em>{props.typing && 'Пишет...'}</em></div>
            </div>
        </div>
    </div>;
}