import './SearchInput.scss'

function SearchInput({ setLang, setSearch, lang, input }) {

    return (
        <>
            <section className="search">
                <div className='search__box'>
                    <select className=''
                        defaultValue={lang}
                        onChange={(evt) => {
                            setLang(evt.target.value);
                            window.localStorage.setItem('lang', JSON.stringify(evt.target.value))
                        }} >
                        <option value="uz">uz</option>
                        <option value="ru">ru</option>
                    </select>
                    <div className="">
                        <input className={ input ? "search-input" : "search-input--none"} onChange={(e) => setSearch(e.target.value.trim())} type="text" placeholder="Search" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default SearchInput