import { useEffect, useState } from "react";
import useToken from "../../Hooks/useToken";
import { useAlert } from "react-alert";

import Header from "../header/header";
import SearchInput from "../SearchInput/SearchInput";

import deleteBtn from "../../assets/images/delete.svg";


function Message({ lang, setLang }) {
    const alert = useAlert()
    const [data, setData] = useState()
    const [found, setFound] = useState()
    const [show, setShow] = useState()
    const [token, setToken] = useToken()


    useEffect(() => {
        fetch("https://nafadmin.onrender.com/allMessage/", {
            method: "GET",
            headers: {
                token: token
            }
        })
            .then(res => res.json())
            .then(data => setData(data))
            .catch((e) => console.log(e))
    }, [lang])

    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://nafadmin.onrender.com/deleteMessage/', {
            method: "Delete",
            body: JSON.stringify({
                id: id
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    if (data.status === 200) {
                        alert.success(data.message);
                        console.log(data);

                    }
                    if (data.status === 401) {
                        setToken(false)
                    }
                    else {
                        alert.success(data.message);
                        console.log(data);
                    }
                }
            });
    }

    return (
        <>
            <Header />
            <main>
                <SearchInput setLang={setLang} input={false} lang={lang} />
                <section className="message">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Text</th>
                                    <th>More</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.name}</td>
                                            <td>{e.phoneNumber}</td>
                                            <td>{e.text.split(' ').slice(0, 2).join(' ') + '...'}</td>
                                            <td>
                                                <button className='show' onClick={() => {
                                                    setFound(
                                                        {
                                                            text: e.text,
                                                        }
                                                    )
                                                    setShow(true)
                                                }}>
                                                    ko'proq
                                                </button>
                                            </td>
                                            <td>
                                                <button>
                                                    <img
                                                        src={deleteBtn}
                                                        alt="deleteBtn"
                                                        data-id={e._id}
                                                        onClick={HandleDelete}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className={show ? "modal" : "modal--close"}>
                            <div className='modal__item'>
                                <p className='more__text'>{found?.text}</p>
                                <button className='btn' onClick={() => setShow(false)}>
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Message