import { Link, useActionData, useNavigation } from "react-router-dom";
import Logo from "../../public/Logo.svg";

import { Form } from "react-router-dom";

import { motion } from "framer-motion";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { useState } from "react";

const SingUpFrom = () => {
  const [password, setPassword] = useState("");
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
        className="card max-w-[500px] p-6 space-y-3 fixed lg:min-w-xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
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
          <h1>
            Welcome to Sift<span className="text-red-500">Bite</span>
          </h1>
          <p className="text-gray-500">
            Please enter your details to create account
          </p>
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
            type="password"
            name="password"
            id="password1"
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          className="btnPrimary"
        >
          {isSubmitting ? "Signing up" : "Sign up"}
        </motion.button>
        <PasswordStrengthMeter password={password}></PasswordStrengthMeter>
        <p className="text-center text-gray-500">
          Already have account?{" "}
          <Link className="emphasized font-bold" to="/login">
            Log in
          </Link>
        </p>
      </Form>
    </motion.div>
  );
};

export default SingUpFrom;
