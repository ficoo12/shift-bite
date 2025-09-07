import { Link, useActionData, useNavigation } from "react-router-dom";
import Logo from "../../public/Logo.svg";

import { Form } from "react-router-dom";

const SingUpFrom = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      className="card max-w-[500px] p-6 space-y-3 mx-auto mt-10"
      method="post"
    >
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <img src={Logo}></img>
      <div>
        <h1>Welcome to SiftBite</h1>
        <p>Please enter your details to create account</p>
      </div>
      <div>
        <label htmlFor="title">Enter your name:</label>
        <br></br>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Enter your name"
        ></input>
      </div>
      <div>
        <label htmlFor="title">Enter your surname:</label>
        <br></br>
        <input
          type="text"
          name="surname"
          id="surname"
          required
          placeholder="Enter your surname"
        ></input>
      </div>
      <div>
        <label htmlFor="title">Enter your email:</label>
        <br></br>
        <input
          type="text"
          name="email"
          id="email"
          required
          placeholder="Enter your email"
        ></input>
      </div>
      <div>
        <label htmlFor="decs">Enter your password:</label>
        <br></br>
        <input
          type="text"
          name="password"
          id="password1"
          required
          placeholder="Enter your password"
        ></input>
      </div>
      <button disabled={isSubmitting} className="btnPrimary">
        {isSubmitting ? "Signing up" : "Sign up"}
      </button>
      <p className="text-center">
        Already have account?{" "}
        <Link className="emphasized font-bold" to="/login">
          Log in
        </Link>
      </p>
    </Form>
  );
};

export default SingUpFrom;
