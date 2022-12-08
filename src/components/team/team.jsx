import { useEffect, useState } from "react";
import useToken from "../../Hooks/useToken";
import axios from "axios";
import { useAlert } from "react-alert";

import Header from "../header/header";
import SearchInput from "../SearchInput/SearchInput";

import deleteBtn from "../../assets/images/delete.svg";
import editBtn from "../../assets/images/edit.svg";

function Team({ lang, setLang }) {
    const alert = useAlert()
    const [data, setData] = useState()
    const [edit, setEdit] = useState(false)
    const [found, setFound] = useState()
    const [id, setId] = useState();
    const [token, setToken] = useToken()
    const [modal, setModal] = useState(false)

    useEffect(() => {
        fetch("https://nafadmin.onrender.com/ourTeam/")
            .then(res => res.json())
            .then(data => lang === 'uz' ? setData(data.data.uz) : setData(data.data.ru))
            .catch((e) => console.log(e))
    }, [lang])

    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://nafadmin.onrender.com/deleteTeamMember/' + lang, {
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
                <section className="team">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Profession</th>
                                    <th>image</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.name}</td>
                                            <td>{e.profession}</td>
                                            <td>
                                                <a href={e.img} target="_blank" rel="noopener noreferrer">Image</a>
                                            </td>
                                            <td>
                                                <button>
                                                    <img
                                                        src={editBtn}
                                                        alt="edit"
                                                        onClick={() => {
                                                            setId(e._id);
                                                            setEdit(!edit)
                                                            setFound({
                                                                name: e.name,
                                                                profession: e.profession
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
                                            const { photo, name, profession } = evt.target.elements

                                            for (let i = 0; i < photo.files.length; i++) {
                                                formData.append("images", photo.files[i]);
                                            }
                                            formData.append("name", name.value);
                                            formData.append("profession", profession.value);

                                            axios.post("https://nafadmin.onrender.com/newTeamMember/" + lang, formData, {
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
                                        name="name"
                                        placeholder="Name"
                                        required
                                    />

                                    <textarea
                                        cols="50"
                                        rows="10"
                                        className="input-info"
                                        type="text"
                                        name="profession"
                                        placeholder="Profession"
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
                                            const { photo, name, profession } = evt.target.elements

                                            for (let i = 0; i < photo.files.length; i++) {
                                                formData.append("images", photo.files[i]);
                                            }
                                            formData.append("name", name.value);
                                            formData.append("profession", profession.value);
                                            formData.append("id", id);

                                            axios.put("https://nafadmin.onrender.com/updateTeamMember/" + lang, formData, {
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
                                        name="name"
                                        placeholder="Name"
                                        defaultValue={found?.name}
                                    />

                                    <textarea
                                        cols="50"
                                        rows="10"
                                        className="input-info"
                                        type="text"
                                        name="profession"
                                        placeholder="Profession"
                                        defaultValue={found?.profession}
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

export default Team