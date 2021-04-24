document.querySelector("#start_chat").addEventListener("click", (event) => {
    const socket = io();

    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";

    const email = document.getElementById("email").value;
    const text = document.getElementById("txt_help").value;

    socket.on("connect", () => {
        const params = {
            email,
            text
        };

        socket.emit("client_first_access", params, (callback, error) => {
            if (error) {
                console.err(error);
            } else {
                console.log(callback);
            }
        });
    });

    socket.on("client_list_all_messages", messages => {
        let templateClient = document.getElementById("message-user-template").innerHTML;
        let templateAdmin = document.getElementById("admin-template").innerHTML;

        let rendered = null;
        messages.forEach(message => {

            if (message.admin_id === null) {
                rendered = Mustache.render(templateClient, {
                     message: message.text,
                     email
                });
            } else {
                rendered = Mustache.render(templateAdmin, {
                    message_admin: message.text
                });
            }

            document.getElementById("messages").innerHTML += rendered;
        });
    });

    
    socket.on("admin_send_to_client", message => {
        
    });
});