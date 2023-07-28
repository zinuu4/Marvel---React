import { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/marvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss";

const CharSearchForm = () => {
  const [char, setChar] = useState<Char[] | null>(null);
  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  const onCharLoaded = (char: Char[]) => {
    setChar(char);
  };

  const updateChar = (name: string) => {
    clearError();

    getCharacterByName(name).then(onCharLoaded);
  };

  const errorMessage = error ? (
    <div className="char__search-critical-error">
      <ErrorMessage />
    </div>
  ) : null;
  const results = !char ? null : char.length > 0 ? (
    <div className="char__search-wrapper">
      <div className="char__search-success">
        There is! Visit {char[0].name} page?
      </div>
      <Link to={`/char/${char[0].id}`} className="button button__secondary">
        <div className="inner">To page</div>
      </Link>
    </div>
  ) : (
    <div className="char__search-error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          charName: "",
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required("This field is required"),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form>
          <label
            onClick={() => console.log(char)}
            className="char__search-label"
            htmlFor="charName"
          >
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Enter name"
            />
            <button
              type="submit"
              className="button button__main"
              disabled={loading}
              style={{
                filter: loading ? "grayscale(1)" : "grayscale(0)",
                opacity: loading ? 0.5 : 1,
                cursor: loading ? "not-allowed" : "pointer",
                pointerEvents: loading ? "none" : "all",
              }}
            >
              <div className="inner">find</div>
            </button>
          </div>
          <FormikErrorMessage
            component="div"
            className="char__search-error"
            name="charName"
          />
        </Form>
      </Formik>
      {results}
      {errorMessage}
    </div>
  );
};

export default CharSearchForm;
