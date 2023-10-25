import React from 'react'
import { Chat } from "@/types/Chat"
import ChatPlaceholder from './ChatPlaceholder';
import ChatMessageItem from './ChatMessageItem';

type Props = {
    chat: Chat | undefined;
}

const ChatArea = ({ chat }: Props) => {
    return (
        <section className='flex-auto h-0 overflow-y-scroll' >
            {!chat && <ChatPlaceholder />}
            {chat && chat.message.map((item) => (
                <ChatMessageItem
                    key={item.id}
                    item={item}
                />
            ))}
        </section>
    )
}

export default ChatArea