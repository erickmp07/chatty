import { io } from "../http";
import { ConnectionService } from "../services/ConnectionService";
import { MessageService } from "../services/MessageService";
import { UserService } from "../services/UserService";

interface IParams {
    text: string;
    email: string;
}

io.on("connect", (socket) => {
    const connectionService = new ConnectionService();
    const messageService = new MessageService();
    const userService = new UserService();

    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params as IParams;
        let user_id = null;

        const userExists = await userService.findByEmail(email);

        if (!userExists) {
            const user = await userService.create(email);

            await connectionService.create({
                socket_id,
                user_id: user.id
            });

            user_id = user.id;
        } else {
            const connection = await connectionService.findByUserId(userExists.id);

            if (!connection) {
                await connectionService.create({
                    socket_id,
                    user_id: userExists.id
                });
            } else {
                connection.socket_id = socket_id;

                await connectionService.create(connection);
            }

            user_id = userExists.id;
        }

        await messageService.create({
            text,
            user_id
        });

        const allMessagesByUser = await messageService.listByUser(user_id);

        socket.emit("client_list_all_messages", allMessagesByUser);

        const allUsers = await connectionService.findAllWithoutAdmin();
        io.emit("admin_list_all_users", allUsers);
    });

    socket.on("client_send_to_admin", async (params) => {
        const { text, socket_admin_id } = params;

        const socket_id = socket.id;

        const { user_id } = await connectionService.findBySocketId(socket_id);

        const message = await messageService.create({
            text,
            user_id
        });

        io.to(socket_admin_id).emit("admin_receive_message", {
            message,
            socket_id
        });
    });
});