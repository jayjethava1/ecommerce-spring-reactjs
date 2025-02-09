import React, {useState} from 'react';
import ShopService from "../../../services/ShopService"
import AccountNavbar from "../../parts/account-navbar/AccountNavbar";
import ToastShow from "../../parts/toasts/ToastShow";

function AddProduct(props) {
    const [perfumeTitle, setPerfumeTitle] = useState("");
    const [perfumer, setPerfumer] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");
    const [type, setType] = useState("");
    const [volume, setVolume] = useState("");
    const [perfumeGender, setPerfumeGender] = useState("");
    const [fragranceTopNotes, setFragranceTopNotes] = useState("");
    const [fragranceMiddleNotes, setFragranceMiddleNotes] = useState("");
    const [fragranceBaseNotes, setFragranceBaseNotes] = useState("");
    const [price, setPrice] = useState("");
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);

    const onFormSubmit = (event) => {
        event.preventDefault();

        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        bodyFormData.append("perfumeTitle", perfumeTitle);
        bodyFormData.append("perfumer", perfumer);
        bodyFormData.append("year", year);
        bodyFormData.append("country", country);
        bodyFormData.append("type", type);
        bodyFormData.append("volume", volume);
        bodyFormData.append("perfumeGender", perfumeGender);
        bodyFormData.append("fragranceTopNotes", fragranceTopNotes);
        bodyFormData.append("fragranceMiddleNotes", fragranceMiddleNotes);
        bodyFormData.append("fragranceBaseNotes", fragranceBaseNotes);
        bodyFormData.append("price", price);

        ShopService.addPerfume(bodyFormData)
            .then((response) => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 5000);
                setPerfumeTitle("");
                setPerfumer("");
                setYear("");
                setCountry("");
                setType("");
                setVolume("");
                setPerfumeGender("");
                setFragranceTopNotes("");
                setFragranceMiddleNotes("");
                setFragranceBaseNotes("");
                setPrice("");
                setFile(null);
                setErrors({});
                window.scrollTo(0, 0);
            })
            .catch((error) => {
                setErrors(error.response.data)
            });
    }

    const {
        perfumeTitleError, perfumerError, yearError, countryError, typeError, volumeError,
        perfumeGenderError, fragranceTopNotesError, fragranceMiddleNotesError, fragranceBaseNotesError,
        priceError
    } = errors;

    return (
        <div>
            <AccountNavbar/>
            <div className="container" style={{"display" : showToast ? "block" : "none"}}>
                <ToastShow showToast={showToast} message={"Товар успешно сохранен!"}/>
            </div>
            <div className="container mt-5 pb-5">
                <h5>Fill the form</h5>
                <br/>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Perfume name: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={perfumeTitleError ? "form-control is-invalid" : "form-control"}
                            name="perfumeTitle"
                            value={perfumeTitle}
                            onChange={(event) => setPerfumeTitle(event.target.value)}
                        />
                        <div className="invalid-feedback">{perfumeTitleError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Perfume Brand:</label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={perfumerError ? "form-control is-invalid" : "form-control"}
                            name="perfumer"
                            value={perfumer}
                            onChange={(event) => setPerfumer(event.target.value)}
                        />
                        <div className="invalid-feedback">{perfumerError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Year of issue: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={yearError ? "form-control is-invalid" : "form-control"}
                            name="year"
                            value={year}
                            onChange={(event) => setYear(event.target.value)}
                        />
                        <div className="invalid-feedback">{yearError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Country: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={countryError ? "form-control is-invalid" : "form-control"}
                            name="country"
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                        />
                        <div className="invalid-feedback">{countryError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">A type: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={typeError ? "form-control is-invalid" : "form-control"}
                            name="type"
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                        />
                        <div className="invalid-feedback">{typeError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Volume: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={volumeError ? "form-control is-invalid" : "form-control"}
                            name="volume"
                            value={volume}
                            onChange={(event) => setVolume(event.target.value)}
                        />
                        <div className="invalid-feedback">{volumeError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Gender: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={perfumeGenderError ? "form-control is-invalid" : "form-control"}
                            name="perfumeGender"
                            value={perfumeGender}
                            onChange={(event) => setPerfumeGender(event.target.value)}
                        />
                        <div className="invalid-feedback">{perfumeGenderError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Top notes: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={fragranceTopNotesError ? "form-control is-invalid" : "form-control"}
                            name="fragranceTopNotes"
                            value={fragranceTopNotes}
                            onChange={(event) => setFragranceTopNotes(event.target.value)}
                        />
                        <div className="invalid-feedback">{fragranceTopNotesError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Middle notes: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={fragranceMiddleNotesError ? "form-control is-invalid" : "form-control"}
                            name="fragranceMiddleNotes"
                            value={fragranceMiddleNotes}
                            onChange={(event) => setFragranceMiddleNotes(event.target.value)}
                        />
                        <div className="invalid-feedback">{fragranceMiddleNotesError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Base notes: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={fragranceBaseNotesError ? "form-control is-invalid" : "form-control"}
                            name="fragranceBaseNotes"
                            value={fragranceBaseNotes}
                            onChange={(event) => setFragranceBaseNotes(event.target.value)}
                        />
                        <div className="invalid-feedback">{fragranceBaseNotesError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Price:</label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={priceError ? "form-control is-invalid" : "form-control"}
                            name="price"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                        <div className="invalid-feedback">{priceError}</div>
                    </div>
                </div>

                <button className="btn btn-dark mr-5" onClick={onFormSubmit}>Submit</button>
                <input type="file" name="file" onChange={(event) => setFile(event.target.files[0])}/>
            </div>
        </div>
    );
}

export default AddProduct;