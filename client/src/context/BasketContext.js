import React, { createContext, useContext, useEffect, useState } from 'react'

const BasketContext = createContext()

const defaultBasket = JSON.parse(localStorage.getItem('basket')) || []  // sepete eklenen uruneri localstorage da tutacagiz. o yuzden ege local=storage da bir basket keyine sahip eleman olusturulmamissa defaultBaskete bos bir array yukluyor

const BasketProvider = ({ children }) => {
    const [items, setItems] = useState(defaultBasket)

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(items))
    }, [items])

    const addToBasket = (data, findBasketItem) => {
        if (!findBasketItem) {
            return setItems((items) => [data, ...items])
        }
        const filteredItems = items.filter(item => item._id !== findBasketItem._id) // butona bastigimda bana eklemek istedigim urun sepette varsa onu bana donecektir. ve eger bana tekrar urune basarsam bu urunu sepetten kaldirmam gerekli 
        // bu kaldirma islemi icin ben sepetteki butun urunler arasindan bu urunun id sine uymayan diger tum urunleri filteredItems a yukluyorum. Ynai filteredItems da artik bu urun haricindeki tum urunler var(dizi halinde) 
        // yani bu urunu sepetten kaldirmak icin setItems(filteredItems) ile bu urun haric diger urunleri yukluyorum. 
        setItems(filteredItems)
    }

    const removeFromBasket = (item) => {
        const filteredItems = items.filter(basketItem => basketItem._id !== item._id)
        setItems(filteredItems)
    }

    const emptyBasket = () => setItems([])

    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        emptyBasket
    }

    return (
        <BasketContext.Provider value={values}>
            {children}
        </BasketContext.Provider>
    )
}

const useBasket = () => useContext(BasketContext)

export {
    BasketProvider,
    useBasket
}