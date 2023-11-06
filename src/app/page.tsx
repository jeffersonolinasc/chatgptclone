'use client';

import ChatArea from "@/components/ChatArea";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar"
import SidebarChatButton from "@/components/SidebarChatButton";
import { Chat } from "@/types/Chat";
import { openai } from "@/utils/openai";
import { use, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const page = () => {

  // estado para saber se o sidebar vai estar fechado ou aberto
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [AiLoading, setAiLoading] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [chatActive, setChatActive] = useState<Chat>();
  const [deleteClick, setDeleteClick] = useState(false);
  const [chatActiveId, setChatActiveId] = useState<string>('');


  useEffect(() => {
    setChatActive(chatList.find(item => item.id === chatActiveId))
  }, [chatActiveId, chatList])

  useEffect(() => {
    if (!deleteClick) {
      closeSidebar();
    }


  }, [deleteClick])



  // monitorar o loading 
  useEffect(() => {
    if (AiLoading) getAIResponse();
  }, [AiLoading])

  // Funções para abrir e fechar a sidebar
  const openSidebar = () => setSidebarOpened(true);
  const closeSidebar = () => setSidebarOpened(false);

  const getAIResponse = async () => {
    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);

    if (chatIndex > -1) {

      const translated = openai.translateMessages(chatListClone[chatIndex].messages);
      const response = await openai.generate(translated);


      if(response){
        chatListClone[chatIndex].messages.push({
          id: uuidv4(),
          author: 'ai',
          body: response
        });
      }

    }


    setChatList(chatListClone);

    setAiLoading(false);
  }

  const handleDeleteOpenSidebar = () => {
    setDeleteClick(true);
  }

  const handleDeleteCloseSidebar = () => {
    closeSidebar();
  }

  const handleClearConversations = () => {
    if (AiLoading) return;
    setChatActiveId('');
    setChatList([]);
  }

  const handleNewChat = () => {
    if (AiLoading) return;
    setChatActiveId('');

    closeSidebar();

  }





  const handleSendMessage = (message: string) => {
    if (!chatActiveId) {
      // creating new chat
      let newChatId = uuidv4();
      setChatList([{
        id: newChatId,
        title: message,
        messages: [
          { id: uuidv4(), author: 'me', body: message }
        ]
      }, ...chatList]);




      setChatActiveId(newChatId);
    } else {
      // updating existing chat 

      let chatListClone = [...chatList];

      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
      chatListClone[chatIndex].messages.push({
        id: uuidv4(),
        author: 'me',
        body: message
      });

      setChatList(chatListClone);
    }

    setAiLoading(true);
  }


  const handleSelectChat = (id: string) => {
    if (AiLoading) return;
    let item = chatList.find(item => item.id === id);

    if (item) setChatActiveId(item.id);


    setDeleteClick(true);

  }

  const handleDeleteChat = (id: string) => {
    let chatListClone = [...chatList];

    let chatIndex = chatListClone.findIndex(item => item.id === id);

    chatListClone.splice(chatIndex, 1);

    setChatList(chatListClone);
    setChatActiveId('');


  }

  const handleEditChat = (id: string, newTitle: string) => {
    if (newTitle) {
      let chatListClone = [...chatList];

      let chatIndex = chatListClone.findIndex(item => item.id === id);
      chatListClone[chatIndex].title = newTitle;
      setChatList(chatListClone);
    }
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


        {/* CRIANDO O SIDEBAR DO APP */}

        {chatList.map(item => (
          <SidebarChatButton
            key={item.id}
            chatItem={item}
            active={item.id === chatActiveId}
            onClick={handleSelectChat}
            onDelete={handleDeleteChat}
            onEdit={handleEditChat}
            onDeleteClickOpen={handleDeleteOpenSidebar}
            onDeleteClickClose={handleDeleteCloseSidebar}
          />
        ))}


      </Sidebar>


      {/* area principal */}
      <section className="flex flex-col w-full border-solid border-sky-500">
        <Header
          openSidebarClick={openSidebar}
          title={chatActive ? chatActive.title : 'Nova conversa'}
          newChatClick={handleNewChat}
        />

        <ChatArea chat={chatActive} loading={AiLoading} />

      

        <Footer
          onSendMessage={handleSendMessage}
          disabled={AiLoading}
        />
      </section>
    </main>
  )
}

export default page
