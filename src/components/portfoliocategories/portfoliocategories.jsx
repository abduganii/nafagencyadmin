import { useEffect, useState } from "react";
import useToken from "../../Hooks/useToken";
import axios from "axios";
import { useAlert } from "react-alert";

import Header from "../header/header";
import SearchInput from "../SearchInput/SearchInput";

import deleteBtn from "../../assets/images/delete.svg";
import editBtn from "../../assets/images/edit.svg";

function Portfoliocategories({ lang, setLang }) {
    const alert = useAlert()
    const [data, setData] = useState()
    const [edit, setEdit] = useState(false)
    const [found, setFound] = useState()
    const [id, setId] = useState();
    const [token, setToken] = useToken()
    const [modal, setModal] = useState(false)


    useEffect(() => {
        fetch("https://nafadmin.onrender.com/portfoliocategories/")
            .then(res => res.json())
            .then(data => setData(data))
            .catch((e) => console.log(e))
    }, [lang])


    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://nafadmin.onrender.com/deletePortfoliocategories/', {
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
                <section className="portfoliocategories">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.title}</td>
                                            <td>
                                                <button>
                                                    <img
                                                        src={editBtn}
                                                        alt="edit"
                                                        onClick={() => {
                                                            setId(e._id);
                                                            setEdit(!edit)
                                                            setFound({
                                                                title: e.title
                                                            })
                                                        }}
                                                    />
                                                </button>
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


                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setModal(true)}>Add</button>
                        </div>

                        <div className={modal ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form
                                    onSubmit={
                                        (evt) => {
                                            evt.preventDefault();
                                            const formData = new FormData();
                                            const { title } = evt.target.elements

                                            formData.append("title", title.value);

                                            axios.post("https://nafadmin.onrender.com/newPortfoliocategories/", formData, {
                                                headers: {
                                                    'Content-Type': 'form-data',
                                                    'Accept': 'application/json',
                                                    "type": "formData",
                                                    "Access-Control-Allow-Origin": "*",
                                                    token: token
                                                }
                                            })
                                                .then((data) => {
                                                    if (data) {
                                                        if (data.data.status === 200) {
                                                            alert.success(data.data.message);
                                                        }
                                                        if (data.data.status === 401) {
                                                            setToken(false)
                                                        }
                                                        else {
                                                            alert.success(data.data.message);
                                                            console.log(data);
                                                        }
                                                    }
                                                });

                                            setModal(false)
                                        }
                                    }>

                                    <input
                                        className="input-heading"
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        required
                                    />

                                    <button
                                        className="btn"
                                        type="submit"
                                    >
                                        Add
                                    </button>

                                </form>
                            </div>
                        </div>

                        <div className={edit ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form
                                    onSubmit={
                                        (evt) => {
                                            evt.preventDefault();
                                            const formData = new FormData();
                                            const { title } = evt.target.elements

                                            formData.append("title", title.value);
                                            formData.append("id", id);

                                            axios.put("https://nafadmin.onrender.com/updatePortfoliocategories/", formData, {
                                                headers: {
                                                    'Content-Type': 'form-data',
                                                    'Accept': 'application/json',
                                                    "type": "formData",
                                                    "Access-Control-Allow-Origin": "*",
                                                    token: token
                                                }
                                            })
                                                .then((data) => {
                                                    if (data) {
                                                        if (data.data.status === 200) {
                                                            alert.success(data.data.message);
                                                        }
                                                        if (data.data.status === 401) {
                                                            setToken(false)
                                                        }
                                                        else {
                                                            alert.success(data.data.message);
                                                            console.log(data);
                                                        }
                                                    }
                                                });

                                            setEdit(false)
                                        }
                                    }>

                                    <input
                                        className="input-heading"
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        defaultValue={found?.title}
                                    />

                                    <button
                                        className="btn"
                                        type="submit"
                                    >
                                        Edit
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Portfoliocategories