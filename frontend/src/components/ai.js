 const API_KEY = "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";

        const submitButton = document.querySelector("#submit");
        const chatBox = document.querySelector("#chatBox");
        const userInput = document.querySelector("#userInput");
        const chatContainer = document.querySelector("#chatContainer");
        const clearChatButton = document.querySelector("#clearChat");

        submitButton.addEventListener("click", sendMessage);
        userInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                sendMessage();
            }
        });

        clearChatButton.addEventListener("click", clearChat);

        function sendMessage() {
            const userMessage = userInput.value.trim();
            if (userMessage !== "") {
                appendMessage("user", userMessage);
                userInput.value = "";

                fetchMessageFromBot(userMessage);
            }
        }
        localStoraged();
        async function fetchMessageFromBot(userMessage) {
            try {
                const response = await fetch(
                    "https://api.openai.com/v1/chat/completions",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${ API_KEY }`,
                    "Content-Type": "application/json",
              },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content:
                            "respond like a human in a casual way for: " +
                            userMessage,
                    },
                ],
                max_tokens: 300,
            }),
            }
          );

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        appendMessage("bot", botMessage);
        console.log(userMessage);
          //   saveMessageToStorage(userMessage, botMessage);
        } catch (error) {
            console.error(error);
        }
      }

        function appendMessage(sender, message) {
            const messageElement = document.createElement("div");
            messageElement.textContent = message;
            messageElement.classList.add(`${sender}-message`);
            chatBox.appendChild(messageElement);

            saveMessageToStorage(sender, message);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function saveMessageToStorage(sender, message) {
            let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
            messages.push({ sender, message });
            localStorage.setItem("chatMessages", JSON.stringify(messages));
        }

        function localStoraged() {
            if (!localStorage.getItem("messagesLoaded")) {
                localStorage.setItem("messagesLoaded", true);
                return;
            }

            let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
            // console.log(messages);
            messages.forEach((msg) => {
                console.log(msg);
                const messageElement = document.createElement("div");
                messageElement.textContent = msg.message;
                messageElement.classList.add(`${msg.sender}-message`);
                chatBox.appendChild(messageElement);
            });
        }
        //   window.addEventListener("load", () => {
        //     localStoraged();
        //   });
        function clearChat() {
            localStorage.removeItem("chatMessages");
            localStorage.removeItem("messagesLoaded");
            chatBox.innerHTML = "";
        }