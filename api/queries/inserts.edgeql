# Create the first chat with its messages
with
  # Messages for the first chat
  msg1 := (insert Message {
    llm_role := "user",
    content := "What am I looking at here?",
    created_at := <datetime>'2023-08-01T14:30:00Z'
  }),
  
  msg2 := (insert Message {
    llm_role := "assistant",
    content := "Welcome! I'm an agentic chat interface designed to showcase how Gel works with modern web technologies. I can maintain conversations and remember context between our interactions. What you're seeing is a full-stack application built with Gel, FastAPI, and Next.js that demonstrates these capabilities.",
    created_at := <datetime>'2023-08-01T14:30:15Z'
  }),
  
  msg3 := (insert Message {
    llm_role := "user",
    content := "What's this about exactly? What can you do?",
    created_at := <datetime>'2023-08-01T14:31:00Z'
  }),
  
  msg4 := (insert Message {
    llm_role := "assistant",
    content := "Unlike standard chatbots, I can remember your preferences and details across multiple sessions. This application demonstrates how Gel's data management enables sophisticated state tracking in real-time apps. I adapt to your communication style and maintain consistency even as you navigate between different conversations. To try this out, just click 'New Chat' to start a fresh thread. The interface lets you switch between active chats while I keep track of context across all of them.",
    created_at := <datetime>'2023-08-01T14:31:45Z'
  })

# Create the first chat with its messages
insert Chat {
  title := "Intro 1",
  archive := {msg1, msg2, msg3, msg4},
  created_at := <datetime>'2023-08-01T14:30:00Z'
};

# Create the second chat with its messages
with
  # Messages for the second chat
  msg5 := (insert Message {
    llm_role := "assistant",
    content := "I've started a new conversation thread. To personalize our interactions, what name would you like me to call you? This helps me tailor our future conversations.",
    created_at := <datetime>'2023-08-01T15:15:00Z'
  }),
  
  msg6 := (insert Message {
    llm_role := "user",
    content := "Morgan Freeman",
    created_at := <datetime>'2023-08-01T15:15:30Z'
  }),
  
  msg7 := (insert Message {
    llm_role := "assistant",
    content := "Morgan Freeman - got it! I've saved your name in my memory. While I can't match the iconic voice that made your namesake famous, I'll do my best to provide helpful information and assistance. Is there something specific you'd like to explore today?",
    created_at := <datetime>'2023-08-01T15:16:00Z'
  })

# Create the second chat with its messages
insert Chat {
  title := "Intro 2",
  archive := {msg5, msg6, msg7},
  created_at := <datetime>'2023-08-01T15:15:00Z'
};
