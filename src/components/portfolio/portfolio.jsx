import { useEffect, useState } from "react";
import useToken from "../../Hooks/useToken";
import axios from "axios";
import { useAlert } from "react-alert";

import Header from "../header/header";
import SearchInput from "../SearchInput/SearchInput";

import deleteBtn from "../../assets/images/delete.svg";
import editBtn from "../../assets/images/edit.svg";

function Portfolio({ lang, setLang }) {
    const alert = useAlert()
    const [data, setData] = useState()
    const [categories, setCategories] = useState()
    const [edit, setEdit] = useState(false)
    const [found, setFound] = useState()
    const [id, setId] = useState();
    const [token, setToken] = useToken()
    const [modal, setModal] = useState(false)


    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/portfolio/")
            .then(res => res.json())
            .then(data => setData(data))
            .catch((e) => console.log(e))
    }, [lang])

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/portfoliocategories/")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch((e) => console.log(e))
    }, [lang])

    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch(process.env.REACT_APP_API_URL + '/deletePortfolio/', {
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
                <section className="portfolio">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Link</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.link}</td>
                                            <td>
                                                <button>
                                                    <img
                                                        src={editBtn}
                                                        alt="edit"
                                                        onClick={() => {
                                                            setId(e._id);
                                                            setEdit(!edit)
                                                            setFound({
                                                                link: e.link,
                                                                categorieId: e.categorieId
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
                                            const { photo, link, categorieId } = evt.target.elements

                                            for (let i = 0; i < photo.files.length; i++) {
                                                formData.append("images", photo.files[i]);
                                            }
                                            formData.append("link", link.value);
                                            formData.append("categorieId", categorieId.value);

                                            axios.post(process.env.REACT_APP_API_URL + "/newPortfolio/" + lang, formData, {
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

                                    <div className="">
                                        <label className="label-img">
                                            <div className="label-box">
                                                <p className="label-text">Rasim tanlang</p>
                                            </div>
                                            <input
                                                className="input-file"
                                                type="file"
                                                name="photo"
                                                placeholder="Imge"
                                                multiple={true}
                                                required
                                            />
                                        </label>
                                    </div>

                                    <input
                                        className="input-heading"
                                        type="text"
                                        name="link"
                                        placeholder="Link"
                                        required
                                    />

                                    <select name="categorieId">
                                        {
                                            categories && categories.map((e, i) => (
                                                <option key={i} value={e._id}>{e.title}</option>
                                            ))
                                        }
                                    </select>

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
                                            const { photo, link, categorieId } = evt.target.elements

                                            for (let i = 0; i < photo.files.length; i++) {
                                                formData.append("images", photo.files[i]);
                                            }
                                            formData.append("link", link.value);
                                            formData.append("categorieId", categorieId.value);
                                            formData.append("id", id);

                                            axios.put(process.env.REACT_APP_API_URL + "/updatePortfolio/" + lang, formData, {
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

                                    <div className="">
                                        <label className="label-img">
                                            <div className="label-box">
                                                <p className="label-text">Rasim tanlang</p>
                                            </div>
                                            <input
                                                className="input-file"
                                                type="file"
                                                name="photo"
                                                placeholder="Imge"
                                                multiple={true}
                                            />
                                        </label>
                                    </div>

                                    <input
                                        className="input-heading"
                                        type="text"
                                        name="link"
                                        placeholder="Link"
                                        defaultValue={found?.link}
                                    />

                                    <select name="categorieId" defaultValue={found?.categorieId}>
                                        {
                                            categories && categories.map((e, i) => (
                                                <option key={i} value={e._id}>{e.title}</option>
                                            ))
                                        }
                                    </select>

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

export default Portfolio