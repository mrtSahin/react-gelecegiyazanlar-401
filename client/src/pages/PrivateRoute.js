
import { Navigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PrivateRoute({children,admin}) { // profile icin undefined doner // admin icin true doner

    console.log(admin)

    const {user,loggedIn}=useAuth() 
    console.log(user?.role)

    // sayfayi yenileyince user bilgisinin farkli donmesini ve admin butonun sayfayi yenilediken sonra gelmesini login metodu icerisinde cozduk.
    // user bilgisinin dogru gecisini sagladik.
    if(!loggedIn){
        console.log('giris yapilmamis')
        return <Navigate to={{pathname:'/'}}/>
    }
    
    // sayfayi yenileyince yine yonlendiriyor. fetch gec geldigi icin ÇÖZÜMÜ && user?.role!==undefined EKLEMEK OLDU
    if(admin && user?.role !=="admin" && user?.role!==undefined){  // useAuth fetch attigidan dolayi veriler biraz gecikmeli geliyor. bu yuzden user i basta null donuyor, fetch degeri dondukten sonra user verisini donuyor.
        // burada null dondugunde undefined properties hatasi vermemesi icin once role propertie sinin varligini ? ile kontrol ediyoruz. bu ? ile eger role propertie si varsa o degere ulasmaya calisiyor. 
        console.log('kullanici user oildugu icin admin ekranina giris yapamaz')
        return <Navigate to={{pathname:'/'}}/>
    }
   

    return children
}

export default PrivateRoute