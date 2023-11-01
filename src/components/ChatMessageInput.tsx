import { KeyboardEvent, use, useEffect, useRef, useState } from 'react'
import IconSendPlane2Fill from './icons/IconSendPlane2Fill';
import { arch } from 'os';

type Props = {
    onSend: (message: string) => void;
    disabled: boolean;
}

const ChatMessageInput = ({ onSend, disabled }: Props) => {

    const [text, setText] = useState('');

    const [altura, setAltura] = useState('');

    // MANIPULANDO A ALTURA DO ELEMENTO NA TELA 
    const textEl = useRef<HTMLTextAreaElement>(null);


    useEffect(() => {
        if (textEl.current) {
            textEl.current.style.height = '0px';
            let scrollHeight = textEl.current.scrollHeight + 'px';
            textEl.current.style.height = scrollHeight;
            setAltura(scrollHeight);
        }
    }, [text, textEl]);




    const handleSendMessage = () => {
        if (!disabled && text.trim() !== '') {
            onSend(text);
            setText('');
        }
    }

    const handleTextKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {

        if (event.code.toLowerCase() == 'enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }

    }
    return (
        <div className={`flex  items-center border border-gray-800/50 bg-gpt-lighgray p-2 rounded-md ${disabled && 'opacity-50'}`}>


            <textarea
                ref={textEl}
                className='w-full  h-12 my-auto max-h-48 border-0 overflow-y-auto  bg-transparent  resize-none outline-none'
                placeholder='Send a message'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={handleTextKeyUp}
                disabled={disabled}
            >

            </textarea>
            <div onClick={handleSendMessage} className={`self-end cursor-pointer ${text.length ? 'opacity-100 hover:bg-black/20' : 'opacity-5'}`} >
                <IconSendPlane2Fill width={14} height={14} />
            </div>
        </div>
    )
}

export default ChatMessageInput