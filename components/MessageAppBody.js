import MessageTable from '../components/MessageTable'
import NewMessageForm from '../components/NewMessageForm'
import { useState, useRef } from 'react'
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import LoginForm from './LoginForm';

const MessageAppBody = ({ jsonData }) => {
    const [messages, setMessages] = useState(jsonData);
    const [authUser, setAuthUser] = useState(false);
    const usernameRef = useRef(null);


    const addNewMessage = async (values) => {
        // console.log(values);
        // values.id = messages.length;
        // messages.unshift(values);
        values.name = usernameRef.current;

        try {
            const axiosReqConfig = {
                url: `${process.env.NEXT_PUBLIC_HOST}/api/messages`,
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                data: values
            };
            const { data } = await axios(axiosReqConfig);
            setMessages([data, ...messages])
        } catch (error) {
            console.error(error);
        }
    }

    const logInUser = async (values) => {
        console.log(values);
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`, values);
            sessionStorage.setItem('token', data.token);

            const decodedToken = jwt_decode(data.token);
            usernameRef.current = decodedToken.username;
            
            setAuthUser(!authUser);
            
        } catch (error) {
            console.error(error);
        }
    };

    if (!authUser) {
        return (
            <>
                <LoginForm logInUser={logInUser} />
            </>
        );
    } else {
        return (
            <>
                { }
                <NewMessageForm addNewMessage={addNewMessage} />
                <MessageTable className="striped" messages={messages} />
            </>
        )
    }

};

export default MessageAppBody;