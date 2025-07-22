'use client';


import {useRx} from "../src/state";
import {snackbar} from "../src/snackbar";

export function SnackbarWrapper() {
    const messages = useRx(snackbar['_messages']);

    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`p-4 rounded shadow-lg ${
                        msg.type === 'success' ? 'bg-green-500' :
                            msg.type === 'error' ? 'bg-red-500' :
                                msg.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    } text-white`}
                    onClick={() => snackbar.removeMessage(msg.id)}
                >
                    {msg.message}
                </div>
            ))}
        </div>
    );
}

// Example usage
function SomeComponent() {
    const handleAction = () => {
        snackbar.show('Action completed successfully!', 'success');
    };

    return (
        <button onClick={handleAction}>
            Perform Action
        </button>
    );
}