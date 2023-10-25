import { useState } from 'react'
import IconSendPlane2Fill from './icons/IconSendPlane2Fill';
import { arch } from 'os';

type Props = {
    onSend: (message: string) => void;
    disabled: boolean;
}

const ChatMessageInput = ({ onSend, disabled }: Props) => {

    const [text, setText] = useState('');
    const handleSendMessage = () => {
        if (!disabled && text.trim() !== '') {
            onSend(text);
            setText('');
        }
    }
    return (
        <div className={`flex  items-center border border-gray-800/50 bg-gpt-lighgray p-2 rounded-md ${disabled && 'opacity-50'}`}>
            <textarea
                className='w-full  h-12 my-auto max-h-48 border-0 overflow-y-auto  bg-transparent  resize-none outline-none'
                placeholder='Send a message'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={handleSendMessage}
            >

            </textarea>
            <div onClick={handleSendMessage} >
                <IconSendPlane2Fill width={14} height={14} />
            </div>
        </div>
    )
}

export default ChatMessageInput