import Nav from '../components/nav'
import {PayPalButton} from "react-paypal-button-v2";
import Head from 'next/head'
import React, {useState} from "react";

export default function IndexPage() {
    const [price, setPrice] = useState("24.99")
    return (
        <div className="container mx-auto px-10">
            <Head>
                {/*<script src="https://www.paypal.com/sdk/js?client-id=sb"></script>*/}
                <title>Maram</title>
            </Head>
            <h1 className="mb-6 text-2xl text-black">Maram</h1>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">الاسم</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">حساب السنابت أو تويتر</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">نوع الاشتراك</label>
                    <input type="radio" checked onChange={() => {
                        setPrice("24.99")
                    }} id="cam" name="type" value="cam"/>
                    <label htmlFor="cam">عرض كام - 24.99$</label>
                    <br/>

                    <input type="radio" onChange={() => {
                        setPrice("14.99")
                    }} id="snapchat" name="type" value="snapchat"/>
                    <label htmlFor="snapchat">سنابي الخاص - 14.99$</label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">طريقة الدفع</label>
                    <PayPalButton
                        amount={price}
                        options={{
                            clientId: "AdL3qLDuw3D_KhWVVU8NGHOv9YwSaKGvpi0dtT_zpYEAB2mDBN3ncFWzTMKC8bX1kf2S2zejHW74ZgnY",
                            currency: "USD",
                            locale: "ar_AE"
                        }}
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={(details, data) => {

                            // OPTIONAL: Call your server to save the transaction
                            return fetch("/paypal-transaction-complete", {
                                method: "post",
                                body: JSON.stringify({
                                    orderID: data.orderID
                                })
                            });
                            alert("Transaction completed by " + details.payer.name.given_name);


                        }}
                    />

                </div>
            </form>
        </div>
    )
}
