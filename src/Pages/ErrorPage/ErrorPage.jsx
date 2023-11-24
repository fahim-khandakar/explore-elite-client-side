/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useLottie } from "lottie-react";
import animation from "../../assets/Animation - 1699122041602.json";

const ErrorPage = () => {
  const options = {
    animationData: animation,
    loop: true,
  };

  const { View } = useLottie(options);
  return (
    <div>
      <div className="flex justify-center p-5 md:p-0  flex-col gap-5 items-center text-xl text-center h-screen">
        {View}
        <Link to="/">
          <button className="btn btn-error">Back To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
