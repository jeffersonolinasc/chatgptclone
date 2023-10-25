'use client';

import ChatArea from "@/components/ChatArea";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar"
import { Chat } from "@/types/Chat";
import { useState } from 'react';


const page = () => {

  // estado para saber se o sidebar vai estar fechado ou aberto
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [AiLoading, setAiLoading] = useState(false);
  const [chatActive, setChatActive] = useState<Chat>(
    {
      id: '123',
      title: 'blablablbalb',
      message: [
        { id: '1', author: 'me', body: 'ola essa é uma mensagem de teste da aplicação que eu estou desenvolvendo' },
        { id: '2', author: 'ai', body: 'Ola vamos testar essa aplicação jefferson de oliveira nascimento' }
      ]
    }
  );


  // Funções para abrir e fechar a sidebar
  const openSidebar = () => setSidebarOpened(true);
  const closeSidebar = () => setSidebarOpened(false);


  // função para quando fechar o sidebar



  const handleClearConversations = () => {

  }

  const handleNewChat = () => {

  }


  const handleSendMessage = () => {

  }


  return (
    <main className="flex min-h-screen bg-gpt-gray">
      {/* sidebar da minha aplicação */}
      <Sidebar
        open={sidebarOpened}
        onClose={closeSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        .....

      </Sidebar>


      {/* area principal */}
      <section className="flex flex-col w-full border-solid border-sky-500">
        <Header
          openSidebarClick={openSidebar}
          title={`Modificar esse titulo`}
          newChatClick={handleNewChat}
        />

        <ChatArea chat={chatActive} />

        <Footer
          onSendMessage={handleSendMessage}
          disabled={AiLoading}
        />
      </section>
    </main>
  )
}

export default page
