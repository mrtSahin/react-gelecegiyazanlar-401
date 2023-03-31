import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Button, Text } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

function Profile() {

    const { user, logout } = useAuth() // çıkış ve giriş metodları AuthContext içerisinde yazıldı. Kodun kolay kontrolü açısından
    const navigate = useNavigate()  // derste hoca history kullanıyordu olmadı useNavigate kullanıldı. Aynı zamanda react-router dan useHistory kaldırılmış onun yerine useNavigate getirilmiş 

    const handleLogout = async () => { 
        logout(() => { 
            navigate("/")  // çıkış yaptığında ana sayfaya dönmesi için yönlendirme
        })
    }

    return (
        <div>
            <Text fontSize='3xl'>Profile</Text>
            <pre>
                {
                    JSON.stringify(user, null, 3)
                }
            </pre>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Profile