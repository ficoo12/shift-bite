import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import Logo from "../../public/Logo.svg";
import { motion } from "framer-motion";

const LoginForm = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Form
        method="post"
        className="card p-6 space-y-3 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] lg:min-w-xl"
        autoComplete="off"
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

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btnPrimary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Log in in progress" : "Log in"}
        </motion.button>
      </Form>
    </motion.div>
  );
};

export default LoginForm;
