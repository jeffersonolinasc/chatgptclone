import { ChatMessage } from '@/types/ChatMessage';
import { ClientOptions, OpenAI } from 'openai'
import { ChatCompletionMessageParam  } from 'openai/resources/index.mjs';
// import { CreateChatCompletionRequestMessage } from "openai/resources/chat";


const config:ClientOptions = {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
}

const api = new OpenAI(config);


export const openai = {
    generate: async (messages: ChatCompletionMessageParam[]) => {
        console.log(messages);
        try{
            const response = await api.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages
            });    
            return response.choices[0]?.message?.content;
          
        } catch(error){
            return undefined
        }
    },

    translateMessages: (messages: ChatMessage[])=> {
        let reqMessages: ChatCompletionMessageParam[] = [];

        for(let i in messages){
            reqMessages.push({
                role: messages[i].author === 'me' ? 'user' : 'assistant',
                content: messages[i].body
            })
        }

        return reqMessages;
    }
}