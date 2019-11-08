import { TypedServerSocket, SocketSchema } from "@kas/shared";

export function onConnection(socket: TypedServerSocket<SocketSchema>)
{
    let i = 0;
    const handle = setInterval(() => socket.emit("count", i++), 1000);

    socket.on("disconnect", () => {
        clearInterval(handle);
    });
}
