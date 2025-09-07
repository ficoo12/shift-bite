import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import Logo from "../../public/Logo.svg";

const LoginForm = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      method="post"
      className="card max-w-[500px] p-6 space-y-3 mx-auto mt-30"
    >
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <img src={Logo}></img>
      <div>
        <h1>Welcome back</h1>
        <p>Welcome back! Please enter your details</p>
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
          type="password"
          name="password"
          id="password"
          required
          placeholder="Enter your password"
        ></input>
      </div>
      <button className="btnPrimary" disabled={isSubmitting}>
        {isSubmitting ? "Log in in progress" : "Log in"}
      </button>
      <div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold emphasized">
            Sing up
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default LoginForm;
