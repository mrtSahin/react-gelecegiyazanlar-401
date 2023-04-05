import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { Button } from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'
import { useBasket } from '../../context/BasketContext'


function Navbar() {
    const { user, loggedIn } = useAuth() // SignUp ya da SignIn componentinde sisteme kullanici giris yaptiginda AuthContext userinden loggedIn ile kulanicinin sisteme giris yapmis oldugunun bilgisi true yapilir.
    // useAuth ile de bu bilgiyi burada alip islemler yapabiliriz. 
    //console.log(user)

    const { items } = useBasket()


    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Link to="/">eCommerce</Link>
                </div>

                <ul className={styles.menu}>
                    <li>
                        <Link to='/'>Product</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.right}>
                {
                    loggedIn ? // eger kullanici giris yapmissa profile butonunu goster
                        <>
                            {// eger giris yapmissa sepetteki urunleri gosterebiliriz.
                                items.length > 0 &&
                                <Link to='/basket'>
                                    <Button colorScheme='pink' variant='outline'>
                                        Basket ({items.length})
                                    </Button>
                                </Link>
                            }

                            {
                                user?.role === 'admin' &&
                                (
                                    <Link to='/admin'>
                                        <Button colorScheme='pink' variant='ghost'>Admin</Button>
                                    </Link>
                                )
                            }

                            <Link to='/profile'>
                                <Button colorScheme='pink'>Profile</Button>
                            </Link>
                        </>
                        :// eger kullanici giris yapmamissa signin ve signup butonlarini goster
                        <>
                            <Link to='/signin'>
                                <Button colorScheme='pink'>Login</Button>
                            </Link>
                            <Link to='/signup'>
                                <Button colorScheme='pink'>Register</Button>
                            </Link>
                        </>
                }
            </div>
        </nav>
    )
}

export default Navbar