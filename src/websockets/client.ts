import { io } from "../http";
import { ConnectionService } from "../services/ConnectionService";
import { UserService } from "../services/UserService";

io.on("connect", (socket) => {
    const connectionService = new ConnectionService();
    const userService = new UserService();

    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params;

        const userExists = await userService.findByEmail(email);

        if (!userExists) {
            const user = await userService.create(email);

            await connectionService.create({
                socket_id,
                user_id: user.id
            });
        } else {
            await connectionService.create({
                socket_id,
                user_id: userExists.id
            });
        }
    });
});